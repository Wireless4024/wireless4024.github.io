export class FileReader {
	private cursor: number = 0
	private readonly end: number = 0

	constructor(private f: ArrayBuffer) {
		this.end = this.f.byteLength
	}

	read(n: number): ArrayBuffer {
		const head = this.cursor
		const have = this.end - head
		const provide = Math.min(have, n)
		this.cursor += provide
		return this.f.slice(head, this.cursor)
	}

	all(): ArrayBuffer {
		this.cursor = this.end
		return this.f.slice(this.cursor, this.end)
	}

	seek(n: number) {
		this.cursor = n
	}
}