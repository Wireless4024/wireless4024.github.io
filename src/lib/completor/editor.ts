import {
	writable,
	type Writable
} from "svelte/store"
import {
	type ArgParseResult,
	ArgsParser
} from "./args_parser"

export class Editor {
	args: Writable<ArgParseResult[]> = writable([])
	hints: Writable<string[]> = writable([])

	constructor() {
		const self = this
		this.args.subscribe(it => {
			const word = it[it.length - 1]?.text || ""
			self.complete({word, offset: word.length})
		})
	}

	async set_args(args: string) {
		this.args.set(new ArgsParser(args).parse_detail())
	}

	complete(completion: Completion) {
		const words = ["apple", "application", "alligator", "orange"]
		this.hints.set(words.filter(it => it.startsWith(completion.word)))
	}
}

export type Completion = {
	word: string
	offset: number
}