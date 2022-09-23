<script lang="ts">
	import {
		onDestroy,
		onMount,
		tick
	}                     from "svelte"
	import {was_child_of} from '../util/dom_helper'

	let text = "aaaaaa"
	let ghost = "sss"

	let editor: HTMLDivElement

	function attach_body(ev: Event) {
		if (was_child_of(editor, ev.target as HTMLElement)) {
			console.log("INTERACT")
		} else {
			console.log("focus")
			focus()
		}
	}

	onMount(function () {
		document.addEventListener("click", attach_body)
	})

	onDestroy(function () {
		document.removeEventListener("click", attach_body)
	})

	function compute_len(text: string): number {
		let len = 0
		let off = 0
		const tlen = text.length
		while (off < tlen) {
			let marker = off
			if (text[off] == '&') {
				while (off < tlen) {
					++off
					if (text[off] == ';') {
						marker = off
						break
					}
				}
				if (marker != off)
					off = marker
			}
			++len
			++off
		}
		return len
	}

	function complete(ev: KeyboardEvent) {
		let isTab: boolean
		if ((isTab = (ev.key == "Tab")) || ev.key == "Enter") {
			if (is_last()) {
				if (ghost && isTab) {
					ev.preventDefault()
					text += ghost
					ghost = ""
					if (isTab) {
						text += "&nbsp;"
					}

					tick().then(() => focus_offset())
				} else if (!isTab && !ev.shiftKey) {
					ev.preventDefault()
					const cli = editor.innerText
					text = ghost = ""
					submit(cli)
				}
			}
		}
	}

	function is_last() {
		const selection = getSelection()
		const node = selection.focusNode
		if (node.TEXT_NODE) {
			const text_node = node as Text
			if (node == editor) return true
			return text_node?.wholeText?.length == get_cursor()
		}
	}

	function get_cursor() {
		return getSelection().focusOffset
	}

	function focus_offset(offset?: number) {
		const selection = getSelection()
		selection.collapse(editor.lastChild, offset || (editor.lastChild as Text).wholeText.length)
	}

	function focus() {
		editor.focus()
		focus_offset()
	}

	function submit(cli: string) {
		cli && console.log("RUNNING", cli)
	}
</script>
<div>
	<div bind:this={editor} contenteditable="true" class="editor" on:keydown={complete}
	     bind:innerHTML={text}></div>
	<span class="helper" on:click={focus}>{ghost}</span>
</div>
<div>
	<h2>DEBUG</h2>
	<div>RAW: `{text}`</div>
	<div>HINT: `{ghost}`</div>
	<div>len: {compute_len(text)}</div>
</div>
<div>
	<h2>Usage</h2>
	<div>&lt;TAB&gt; - Insert hint</div>
</div>
<style>

	.helper, .editor {
		display: inline-block;
	}

	.helper {
		color: #888888;
		margin: auto 0 auto -0.25em;
	}
</style>