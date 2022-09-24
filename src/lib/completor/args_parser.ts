export class ArgsParser {
	private off = 0

	constructor(private token: string) {}

	private end(offset: number) {
		this.off = offset
	}

	private next_token(): string | null {
		let off = this.off
		const token = this.token
		const len = token.length
		// skip whitespace
		while (off < len) {
			if (!is_whitespace(token[off]))
				break
			++off
			if (off == len) return null // EOF
		}

		const head = token[off]
		const quoted = head == '"' || head == "'"

		const marker = off + ((quoted || head == "\\") as unknown as number) // number + boolean is fine here
		this.end(off)
		return normalize_text_token(this.token.substring(marker, off))
	}

	parse(): string[] {
		return []
	}
}

export function is_whitespace(ch: string) {
	return ch == ' ' || ch == '\t' || ch == '\n' || ch == '\r' || ch == '\x0C'
}

export function normalize_text_token(token: string): string {
	return token
}