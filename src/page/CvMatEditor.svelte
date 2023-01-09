<script lang="ts">
	import Button    from "@smui/button"
	import Slider    from "@smui/slider"
	import {
		onDestroy,
		onMount,
		tick
	}                from "svelte"
	import Container from "../lib/Container.svelte"
	import {
		read_mat,
		render_mat,
		save_as
	}                from "../lib/mat-editor/mat"
	import {
		showOpenFilePicker,
		showSaveFilePicker
	}                from "../util/wrapper"

	let canvas: HTMLCanvasElement
	let crop_canvas: HTMLCanvasElement

	let format: number = 0
	let width: number = 32
	let height: number = 32

	let x1 = 0
	let y1 = 0
	let x2 = 32
	let y2 = 32
	let cwidth = 32
	let cheight = 32

	let mX = 0
	let mY = 0
	let r = 0
	let g = 0
	let b = 0
	let a = 0

	let zoom = 1

	let elem1: HTMLDivElement
	let elem2: HTMLDivElement
	let canvas_container: HTMLDivElement

	function mousemove(ev: MouseEvent) {
		mX = Math.max(0, Math.min(width, ev.pageX - canvas_container.offsetLeft))
		mY = Math.max(0, Math.min(height, ev.pageY - canvas_container.offsetTop))
		const ctx = canvas.getContext("2d")
		const im = ctx.getImageData(mX, mY, 1, 1);
		r = im.data[0]
		g = im.data[1]
		b = im.data[2]
		a = im.data[3] / 255
	}

	onMount(function () {
		fill()
		canvas_container.addEventListener("mousemove", mousemove)
	})
	onDestroy(function () {
		canvas_container.removeEventListener("mousemove", mousemove)
	})

	function fill() {
		let ctx = canvas.getContext("2d")!
		ctx.fillStyle = "#555"
		ctx?.fillRect(0, 0, width, height)
	}

	async function load() {
		const [file_handle] = await showOpenFilePicker()
		const file = await file_handle.getFile()
		const mat = await read_mat(file)
		width = mat.header.width
		height = mat.header.height
		format = mat.header.mat_format
		await tick()
		render_mat(mat, canvas)
		x1 = y1 = 0
		cwidth = x2 = width
		cheight = y2 = height
	}

	async function render_crop(..._) {
		if (!crop_canvas) return
		cwidth = x2 - x1
		cheight = y2 - y1
		if (x2 <= x1) return x2 = x1
		if (y2 <= y1) return y2 = y1
		await tick()
		crop_canvas.getContext("2d")!.drawImage(canvas, x1, y1, cwidth, cheight, 0, 0, cwidth, cheight)
	}

	async function save() {
		const handle = await showSaveFilePicker({
			types        : [],
			suggestedName: "image.mat"
		})
		await save_as(await handle.createWritable(), {
			height    : cheight,
			mat_format: format,
			ver       : 1,
			width     : cwidth
		}, crop_canvas)
	}

	$:render_crop(x1, y1, x2, y2)
</script>
<Container>
	<h1>Matrix editor</h1>
	<details>
		<summary>how this work?</summary>
		<p>
			This editor designed to use with output from
			<a href="https://github.com/Wireless4024/pedestal-rs/blob/85ba65637867ca8eb1aa04647afcb7b647abb269/src/cv_mat.rs#L115">
				<code>cv_mat</code>
			</a>
			(<a href="https://github.com/Wireless4024/pedestal-rs/blob/85ba65637867ca8eb1aa04647afcb7b647abb269/examples/cv/src/main.rs">example</a>).
			basically <code>cv_mat</code> designed to serialize <code>Mat</code> from opencv and convert it back to
			<code>Mat</code> without having to known about image format at low performance cost,
			so this tool is used to manipulate <code>cv_mat</code> in browser.
		</p>
	</details>
	<div>
		<Button on:click={load} title="It may crash if you didn't load a valid file">Load</Button>
		<Button on:click={render_crop}>Render</Button>
		<Button on:click={save}>Save</Button>
	</div>
	<div>x: {mX} y: {mY}: RGBA({r}, {g}, {b}, {a})</div>
	<div bind:this={canvas_container} style="display: inline-block;margin-top: 16pt">

		<div style="position:absolute;z-index: 1;border: gray solid 1px;transform:scale({zoom});width:{cwidth}px;height:{cheight}px;margin-top:{y1}px;margin-left:{x1}px"></div>
		<canvas style="position:relative;transform:scale({zoom});border: gray solid 1px" bind:this={canvas} {width}
		        {height}></canvas>
	</div>
	<hr>
	<div>crop</div>
	<div>
		X1: {x1} Y1: {y1} | X2:{x2} Y2:{y2}
	</div>
	<div>
		<Slider discrete range bind:end={x2} bind:start={x1} max={width}/>
		<Slider discrete range bind:end={y2} bind:start={y1} max={height}/>
	</div>
	<div style="padding-left:{x1}px;padding-top:{y1}px;padding-bottom:{height-y2}px">
		<canvas style="border: gray solid 1px" bind:this={crop_canvas} width={cwidth}
		        height={cheight}></canvas>
	</div>
</Container>