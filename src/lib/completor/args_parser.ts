export class ArgsParser {
	private off = 0

	constructor(private token: string) {}

	private end(offset: number) {
		this.off = offset
	}

	private next_token(): ArgParseResult | null {
		let off = this.off
		const token = this.token
		const len = token.length
		if (off >= len) return null
		// skip whitespace
		while (off < len) {
			let cursor = token[off]
			if (cursor == '&') {
				let marker = off
				while (off < len) {
					++off
					if (token[off] == ';') {
						cursor = token.substring(marker, off + 1)
						marker = off
						break
					}
				}
				off = marker
			}
			if (!is_whitespace(cursor))
				break
			++off
			if (off == len) return null // EOF
		}

		const head = token[off]
		const quoted = head == '"' || head == "'"

		const marker: number = off + ((quoted || head == '\\') as any) // number + boolean is fine here
		off = marker
		while (off < len) {
			let cursor = token[off]
			if (cursor == '&') {
				let marker = off
				while (off < len) {
					++off
					if (token[off] == ';') {
						cursor = token.substring(marker, off + 1)
						marker = off
						break
					}
				}
				off = marker
			}
			if (quoted && cursor == head) break
			if (is_whitespace(cursor)) {
				if (!quoted) break
			}
			if (cursor == '\\') ++off

			++off
			if (off >= len) break // EOF
		}
		this.end(off)
		return {text: normalize_text_token(this.token.substring(marker, off)), start: marker}
	}

	parse(): string[] {
		let args: string[] = []
		let arg: ArgParseResult | null = null
		while (arg = this.next_token()) {
			args.push(arg.text)
		}
		return args
	}

	parse_detail(): ArgParseResult[] {
		let args: ArgParseResult[] = []
		let arg: ArgParseResult | null = null
		while (arg = this.next_token()) {
			args.push(arg)
		}
		return args
	}
}

export type ArgParseResult = {
	text: string
	start: number
}

function is_whitespace(ch: string) {
	return ch == ' ' || ch == '\t' || ch == '\n' || ch == '\r' || ch == '\x0C' || ch == '&nbsp;'
}

function normalize_text_token(token: string): string {
	let res = ""
	const quote = token[0] == '"' || token[0] == "'"
	let off: number = 0 + (quote as any)
	const len = token.length - off
	while (off < len) {
		let cursor = token[off]
		if (cursor == '\\') {
			const next = ++off
			if (next == len) break
			cursor = token[next]
		}
		res += cursor
		++off
	}
	return res
}

function peek_eq(text: string, offset: number, expected: string): boolean {
	const ex_len = expected.length
	if ((text.length + offset) < ex_len) {
		return text.substring(offset, offset + ex_len) == expected
	}
	return false
}

/**
 * export for testing only
 */
export const __private__ = {
	is_whitespace,
	normalize_text_token,
	peek_eq
}

class HtmlEscapeTokenParer implements Iterator<string, string> {
	private offset = 0

	constructor(private tokens: string) {}

	private end(offset: number) {
		const old = this.offset
		this.offset = offset
		return this.tokens.substring(old, offset)
	}

	next(): IteratorResult<string, string> {
		const tokens = this.tokens
		const len = tokens.length
		let offset = this.offset

		let char = this.tokens[offset]
		if (char == '&') {
			let marker = offset
			while (offset < len) {
				if (tokens[offset] == ';') {
					marker = offset
					break
				}
				++offset
			}
			offset = marker
		}
		++offset

		if (offset == len)
			return {done: true, value: this.end(offset)}
		else
			return {done: false, value: this.end(offset)}
	}

	return(): IteratorResult<string, string> {
		return {done: true} as any
	}

	collect(): string[] {
		const arr: string[] = []
		let item
		while (item = this.next()) {
			arr.push(item.value)
			if (item.done) break
		}
		return arr
	}
}

export function parse_html_token(tokens: string): Iterator<string, string> & { collect: () => string[] } {
	return new HtmlEscapeTokenParer(tokens)
}