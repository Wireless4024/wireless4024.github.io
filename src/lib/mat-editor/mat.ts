import type {WritableFile} from "../../util/wrapper"

/**
 * 64 bytes header
 * Note:
 * + u64 used here should be less than max i32 because we can't allocate memory in js more than 2GiB (by default)
 */
export type MatHeader = {
	ver: number
	_reserved1?: number
	_reserved2?: number
	_reserved3?: number
	width: number
	height: number
	mat_format: number
	_reserved4?: number
	_reserved5?: number
}
export type CvMat = {
	header: MatHeader
	data: Uint8Array
}

/**
 * + U for unsigned
 * + S for signed
 * + F for float
 */
export namespace cv_const {
	export const CV_8U = 0;
	export const CV_8S = 1;
	export const CV_16U = 2;
	export const CV_16S = 3;
	export const CV_32S = 4;
	export const CV_32F = 5;
	export const CV_64F = 6;
	export const CV_16F = 7;
}

export function parse_le(arr: Uint8Array): number {
	const octet = arr.length
	let shift = (octet - 1) * 8
	let no = 0
	for (let i = 0; i < octet; i++) {
		no |= (arr[i] << shift)
		shift -= 8
	}
	return no
}

function parse_header(buf: Uint8Array): MatHeader {
	if (buf.byteLength < 64) throw Error("Invalid header")
	const view = new DataView(buf.buffer, buf.byteOffset, buf.length)
	return {
		ver       : buf[0],
		width     : view.getInt32(8, true),
		height    : view.getInt32(12, true),
		mat_format: view.getInt32(16, true),
	}
}

function put_header(buf: Uint8Array, header: MatHeader) {
	const buf32 = new DataView(buf.buffer, buf.byteOffset, 32)
	buf32.setInt32(8, header.width, true)
	buf32.setInt32(12, header.height, true)
	buf32.setInt32(16, header.mat_format, true)
}

function alloc_row_data(header: MatHeader): Uint8Array {
	return new Uint8Array(header.width * cv_mat_depth_size(header.mat_format) * cv_mat_cn(header.mat_format))
}

export async function read_mat(f: File): Promise<CvMat> {
	const buf = new Uint8Array(await f.arrayBuffer())
	const header = parse_header(buf)
	return {
		header,
		data: buf.slice(32)
	}
}

function get_row(row: number, ch: number, width: number, buf: Uint8Array, ctx: CanvasRenderingContext2D) {
	const r = ctx.getImageData(0, row, width, 1)
	const data = r.data
	switch (ch) {
		case 1:
			for (let i = 0; i < width; i++) {
				const off = i << 2
				buf[i] = ~~((data[off] + data[off + 1] + data[off + 2]) / 3)
			}
			break
		case 3:
			let buf_ptr = 0
			for (let i = 0; i < width; i++) {
				const off = i << 2
				// data is RGB but buf should be BGR order
				buf[buf_ptr++] = data[off + 2]
				buf[buf_ptr++] = data[off + 1]
				buf[buf_ptr++] = data[off]
			}
			break
		case 4:
			for (let i = 0; i < width; i++) {
				const off = i << 2
				// data is RGBA but buf should be BGRA order
				buf[off] = data[off + 2] // b
				buf[off + 1] = data[off + 1] // g
				buf[off + 2] = data[off] // r
				buf[off + 3] = data[off + 3] // a
			}
			break
	}
}

export async function save_as(file: WritableFile, header: MatHeader, canvas: RenderTarget) {
	const head = new Uint8Array(32)
	put_header(head, header)
	await file.write(head)
	const row_buf = alloc_row_data(header)
	const ch = cv_mat_cn(header.mat_format)
	const width = header.width
	const ctx = canvas.getContext("2d")!
	for (let i = 0, len = header.height; i < len; i++) {
		get_row(i, ch, width, row_buf, ctx)
		await file.write(row_buf)
	}
	await file.close()
}

type RenderTarget = {
	getContext: (id: "2d") => CanvasRenderingContext2D | null,
	width: number
	height: number
}

export function render_mat(mat: CvMat, target: RenderTarget) {
	const fm = cv_mat_depth(mat.header.mat_format)
	switch (fm) {
		case cv_const.CV_8U:
		case cv_const.CV_8S:
			render_8u(mat, target)
			break
		default:
			throw Error("Unsupported")
	}
}

function g2c(g: number): number {
	return g << 16 | g << 8 | g
}

function bgra(buf: Uint8Array, off: number, channel: number): string {
	if (channel == 4) {
		let color = "rgba("
		color += buf[off + 2] + ","
		color += buf[off + 1] + ","
		color += buf[off] + ","
		if (channel == 4) {
			color += buf[off + 3] / 255
		} else {
			color += "1"
		}
		return color + ")"
	}
	return "#" + ((buf[off]) | (buf[off + 1] << 8) | (buf[off + 2] << 16))
}

function render_8u(mat: CvMat, target: RenderTarget) {
	const ctx = target.getContext("2d")
	if (!ctx) throw Error("Can't create context")
	const channel = cv_mat_cn(mat.header.mat_format)
	if (channel != 1 && channel != 3 && channel != 4) throw Error(`Channel ${channel} is not supported`)
	let {width, height} = mat.header
	const data = mat.data
	width = Math.min(width, target.width)
	height = Math.min(height, target.height)
	const row_width = width * channel
	// optimize for channel instead of inline condition
	if (channel === 1) {
		for (let y = 0; y < height; ++y) {
			const row_px = y * width
			const row = data.slice(row_px, row_px + width)
			for (let x = 0; x < width; ++x) {
				ctx.fillStyle = "#" + g2c(row[x]).toString(16)
				ctx.fillRect(x, y, 1, 1)
			}
		}
	} else {
		for (let y = 0; y < height; ++y) {
			const row_px = y * row_width
			const row = data.slice(row_px, row_px + row_width)
			for (let x = 0; x < width; ++x) {
				ctx.fillStyle = bgra(row, x * channel, channel)
				ctx.fillRect(x, y, 1, 1)
			}
		}
	}
}


export function cv_mat_depth(flag: number) {
	return flag & 7
}

export function cv_mat_depth_size(flag: number) {
	switch (cv_mat_depth(flag)) {
		case cv_const.CV_8U:
		case cv_const.CV_8S:
			return 1
		case cv_const.CV_16U:
		case cv_const.CV_16S:
		case cv_const.CV_16F:
			return 2
		case cv_const.CV_32S:
		case cv_const.CV_32F:
			return 4
		case cv_const.CV_64F:
			return 8
		default:
			return 1
	}
}

export function cv_mat_cn(flag: number) {
	return ((flag >>> 3) & 7) + 1
}