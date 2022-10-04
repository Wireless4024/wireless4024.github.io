import {tick} from "svelte"
import {
	get,
	writable,
	type Writable
}             from "svelte/store"
import {
	ArgsParser,
	escaped_html_len
}             from "./args_parser"

export class Editor {
	raw_args: string[] = []
	args_len: number[] = []
	args: Writable<string[]> = writable(this.raw_args)
	hints: Writable<string[]> = writable([])
	hint: Writable<string> = writable("")
	hint_idx: Writable<number> = writable(0)
	selected_arg: Writable<number> = writable(0)

	private root?: HTMLDivElement
	private content_len: number = 0

	editable: Writable<boolean> = writable(true)

	constructor(...args: string[]) {
		(window as any).editor = this
		const self = this
		this.set_raw_args(args.flatMap(it => [it, "&nbsp;"]))

		this.hints.subscribe(function () {
			self.update_hint_idx(0)
		})
	}

	set_root(root: HTMLDivElement) {
		this.root = root
	}

	private update_hint_idx(idx: number) {
		const hints = get(this.hints)
		const old_idx = get(this.hint_idx)
		const next_idx = old_idx + idx
		let i = idx < 0
			? next_idx < 0
				? hints.length - 1
				: next_idx
			: ((next_idx) % hints.length)
		this.hint_idx.set(i)
		this.hint.set(hints[i])
	}

	private set_raw_args(args: string[]) {
		this.raw_args = args
		this.args.set(args)
		let content_len = 0
		for (let i = 0, len = args.length; i < len; ++i) {
			content_len += (this.args_len[i] = escaped_html_len(args[i]))
		}
		this.content_len = content_len
	}

	set_args(args: string) {
		this.set_raw_args(new ArgsParser(args).parse())
	}

	delete_node(idx: number) {
		this.focus(idx - 1)
		this.raw_args.splice(idx, 1)
		this.left()
	}

	update(result: string, idx: number, off?: number) {
		// argument update at args[idx] and cursor placed at off
		this.raw_args[idx] = result
		this.args_len[idx] = escaped_html_len(result)
		this.content_len = this.args_len.reduce((a, b) => a + b)
		console.log("args update at:", idx, "off:", off, "now:", this.raw_args, "cursor:", this.get_cursor())
	}

	insert_space(after: number) {
		this.raw_args.splice(after, 0, "&nbsp;")
		this.set_raw_args(this.raw_args)
		const self = this
		tick().then(function () {
			self.focus(after + 1)
		})
	}

	complete(completion: Completion) {
		const words = ["apple", "application", "alligator", "orange"]
		this.hints.set(words.filter(it => it.startsWith(completion.word)))
	}

	private focus(idx: number, off?: number) {
		const nodes = this.get_nodes()
		const node = nodes[idx]
		if (node) getSelection()?.collapse(node, off || 0)
	}

	private focus_offset(offset: number) {
		const nodes = this.get_nodes()
		if (!nodes.length && this.root) getSelection()?.collapse(this.root, 0)
		let cursor = 0
		for (let node of nodes) {
			const node_text = node.innerText
			const len = node_text.length
			if (cursor + len >= offset) {
				return getSelection()?.collapse(node.childNodes[0], offset - cursor)
			}
			cursor += len
		}
		const last = nodes[nodes.length - 1]
		last && getSelection()?.setPosition(last.childNodes[0], last.innerText.length)
	}

	private get_nodes(): HTMLSpanElement[] {
		const elems: HTMLSpanElement[] = []
		const root = this.root
		if (root) {
			const nodes = root.childNodes
			for (let node of nodes) {
				if (node.nodeName == 'SPAN') {
					elems.push(node as HTMLSpanElement)
				}
			}
		}
		return elems
	}

	get_cursor() {
		const nodes = this.get_nodes()
		if (!nodes.length) return 0
		const s = getSelection()
		if (!s) return 0
		const selection = s.focusNode
		let len = 0
		for (let node of nodes) {
			const current = node.innerText
			for (let text of node.childNodes) {
				if (text != selection) continue
				if (text == selection) {
					return len + s.focusOffset
				}
			}
			len += current.length
		}
		return len
	}

	left() {
		const cursor = this.get_cursor()
		cursor > 0 && this.focus_offset(cursor - 1)
	}

	right() {
		this.focus_offset(this.get_cursor() + 1)
	}

	nextHint() {
		this.update_hint_idx(1)
	}

	prevHint() {
		this.update_hint_idx(-1)
	}
}

export type Completion = {
	word: string
	offset: number
}