<script lang="ts">
	import Button    from "@smui/button";
	import FormField from '@smui/form-field';

	import Select, {Option} from '@smui/select';
	import Slider           from '@smui/slider';
	import Textfield        from '@smui/textfield';
	import Container        from "../lib/Container.svelte";

	let words: string[] = []
	let filtered_words: string[] = []

	let selected_file: FileList | null = null

	async function load_text(file: File) {
		words = (await file.text()).split("\n")
		let _max_len = 0
		for (let word of words) {
			_max_len = Math.max(word.length, _max_len)
		}
		max_len = max_word_len = _max_len
	}

	let max_word_len: number = 999
	let max_len: number = 15
	let max_match: number = 50
	let filter: string = ""
	let filter_type: 'includes' | 'startsWith' | 'endsWith' = 'includes'

	function _filter(filter: string, ...any) {
		if (filter?.length > 0) {
			let res: string[] = []
			let _max_word_len = 0
			for (let word of words) {
				if (word.length < max_len && word?.[filter_type]?.(filter)) {
					res.push(word)
					_max_word_len = Math.max(word.length, _max_word_len)
				}
				if (res.length > max_match) {
					break
				}
			}
			filtered_words = res
		}
	}

	$:_filter(filter, max_len, filter_type)

	$:{
		if (selected_file != null) {
			const files: FileList = selected_file!
			const file = files.item(0)
			load_text(file)
		}
	}
</script>
<Container>
	<div>
		Find
		<Textfield bind:value={filter} label="Filter"></Textfield>
		<Select bind:value={filter_type} label="Select Menu">
			<Option value="includes">includes</Option>
			<Option value="startsWith">startsWith</Option>
			<Option value="endsWith">endsWith</Option>
		</Select>
	</div>
	<FormField align="end" style="display: flex;">
		<Slider style="flex-grow: 1;" bind:value={max_len} min="3" max={max_word_len} step="1"/>
		<span slot="label" style="padding-right: 12px; width: max-content; display: block;">
    Max word length
  </span>
	</FormField>
	<div>
		<Textfield bind:files={selected_file} label="" type="file"/>
		(word per line)
		<Button href="https://github.com/dwyl/english-words" target="_blank">finding word list?</Button>
	</div>
	{#if filter}
		<ul>
			{#each filtered_words as w}
				<li>{w}</li>
			{/each}
		</ul>
	{/if}
</Container>