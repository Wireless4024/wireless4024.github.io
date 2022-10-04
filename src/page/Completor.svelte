<script lang="ts">
	import {
		onMount,
		tick
	}                     from "svelte"
	import CommandToken   from "../lib/completor/CommandToken.svelte";
	import {Editor}       from "../lib/completor/editor"
	import Container      from "../lib/Container.svelte";
	import {was_child_of} from '../util/dom_helper'

	let text = ""
	let ghost = ""

	let editor_elem: HTMLDivElement

	function attach_body(ev: Event) {
		if (was_child_of(editor_elem, ev.target as HTMLElement)) {
			console.log("INTERACT")
		} else {
			console.log("focus")
			focus()
		}
	}

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
		if (ev.key.length == 1) {
			hint_idx = 0
		}
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
					const cli = editor_elem.innerText
					text = ghost = ""
					submit(cli)
				} else {
					isTab && ev.preventDefault()
				}
			} else {
				isTab && ev.preventDefault()
			}
			tick().then(type)
		}
		if (ev.key == "ArrowDown") {
			if (hint_idx + 1 < hint_arr.length)
				hint_idx = hint_idx + 1
			else hint_idx = 0
			ev.preventDefault()
		}
		if (ev.key == "ArrowUp") {
			if (hint_idx > 0)
				hint_idx = hint_idx - 1
			else hint_idx = (hint_arr.length) - 1
			ev.preventDefault()
		}
	}

	function type() {
		editor.set_args(editor_elem.innerText)
	}

	function is_last() {
		const selection = getSelection()
		const node = selection.focusNode
		if (node.TEXT_NODE) {
			const text_node = node as Text
			if (node == editor_elem) return true
			return text_node?.wholeText?.length == get_cursor()
		}
	}

	function get_cursor() {
		return getSelection().focusOffset
	}

	function focus_offset(offset?: number) {
		const selection = getSelection()
		selection.collapse(editor_elem.lastChild || editor_elem, offset || (editor_elem.lastChild as Text)?.wholeText?.length)
	}

	function focus() {
		editor_elem.focus()
		focus_offset()
	}

	function submit(cli: string) {
		cli && list.splice(0, 0, cli) && (list = list)
	}

	function set_hint(text: string) {
		tick().then(function () {
			ghost = text?.substring(args_str?.[args_str?.length - 1]?.length) || ""
		})
	}

	const editor = new Editor("cat", "/dev/sda1")
	const hints = editor.hints
	const args = editor.args
	$: args_str = $args.map(it => it)
	$:hint_arr = $hints
	let hint_idx = 0
	hints.subscribe(it => set_hint(it[hint_idx]))
	let list = []
	/*
		onMount(function () {
			document.addEventListener("click", attach_body)
			ghost = hint_arr[0]
		})
	
		onDestroy(function () {
			document.removeEventListener("click", attach_body)
		})*/
	onMount(function () {
		editor.set_root(editor_elem)
	})
</script>
<Container>
	<div class="editor-container" bind:this={editor_elem}>
		{#each $args as arg, idx}
			<CommandToken {editor} {arg} {idx}></CommandToken>
		{/each}
		<!--<div bind:this={editor_elem} contenteditable="true" class="editor" on:keydown={complete}
			 on:input={type}
			 bind:innerHTML={text}></div>
		<span class="helper" on:click={focus}>{ghost}</span>-->
	</div>
	<div>
		<h2>DEBUG</h2>
		<div>RAW: `{text}`</div>
		<div>ARGS: `{args_str}`</div>
		<div>HINT: `{ghost}`</div>
		<div>HINTS: `{hint_arr}`</div>
		<div>len: {compute_len(text)}</div>
	</div>
	<div>
		<h2>Usage</h2>
		<div><code>&lt;TAB&gt;</code> - Insert hint</div>
		<div><code>&lt;ArrowUp&gt;</code> - Previous hint</div>
		<div><code>&lt;ArrowDown&gt;</code> - Next hint</div>
		<div><code>\</code> - To prevent split on whitespace</div>
		<div><code>"</code> or <code>'</code> - To group word</div>
	</div>
	<div>
		<h2>Submitted</h2>
		<ul>
			{#each list as li}
				<li>{li}</li>
			{/each}
		</ul>
	</div>
</Container>
<style>
	.editor-container {
		background-color: white;
		padding: 8px;
		border-radius: 8px;
		margin: 16px;
		font-family: monospace;
		font-size: 2em;
	}

	/*	.helper, .editor {
			font-size: 2em;
			display: inline-block;
			font-family: monospace;
		}
	
		.helper {
			color: #888888;
			margin: auto 0 auto -0.15em;
		}
	
		.editor {
			outline: none;
		}*/
</style>