<script lang="ts">
	import {
		onDestroy,
		onMount,
		tick
	}               from "svelte"
	import {Editor} from "./editor"

	export let editor: Editor
	export let idx: number
	export let arg: string

	function handle_key(ev: KeyboardEvent) {
		const {key} = ev
		console.log(key)
		switch (key) {
			case "ArrowLeft":
				ev.preventDefault()
				editor.left()
				break;
			case "ArrowRight":
				ev.preventDefault()
				editor.right()
				break;
			case " ":
				ev.preventDefault()
				editor.insert_space(idx)
				break;
		}
	}

	function notify(ev: KeyboardEvent) {
		//	console.log(ev.target, ev.key, editor.get_cursor(), getSelection().focusNode)
		const key = ev.key
		if (key.length == 1 || key == "Backspace")
			if (arg.length == 0 && key == "Backspace")
				editor.delete_node(idx)
			else
				editor.update(arg, idx)
	}

	let elem: HTMLSpanElement
	let unsub: () => void

	onMount(async function () {
		await tick()
		unsub = editor.editable.subscribe(it => elem.contentEditable = "" + it)
	})

	onDestroy(function () {
		if (unsub) unsub()
	})
</script>
<span class="no-outline"
      contenteditable="true"
      on:keyup={notify}
      on:keydown={handle_key}
      bind:this={elem}
      bind:innerHTML={arg}></span>
<style>
	.no-outline {
		display: inline-block;
		outline: none;
	}
</style>