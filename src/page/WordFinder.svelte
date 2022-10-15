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
		compute_max_len()
	}

	async function load_http(url: string) {
		words = (await fetch(url).then(it => it.text())).split("\n")
		compute_max_len()
	}

	function compute_max_len() {
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
	let filter_type: 'includes' | 'startsWith' | 'endsWith' | 'regex' = 'includes'

	function _filter(filter: string, ...any) {
		if (filter?.length > 0) {
			const ftype = filter_type
			let res: string[] = []
			let _max_word_len = 0
			if (ftype == "regex") {
				let regex: RegExp
				try {
					regex = new RegExp(filter)
				} catch (e) {
					return
				}
				for (let word of words) {
					if (word.length <= max_len && regex.test(word)) {
						res.push(word)
						_max_word_len = Math.max(word.length, _max_word_len)
					}
					if (res.length > max_match) {
						break
					}
				}
			} else {
				for (let word of words) {
					if (word.length <= max_len && word?.[ftype]?.(filter)) {
						res.push(word)
						_max_word_len = Math.max(word.length, _max_word_len)
					}
					if (res.length > max_match) {
						break
					}
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
		<Select bind:value={filter_type} label="Filter type">
			<Option value="includes">includes</Option>
			<Option value="startsWith">startsWith</Option>
			<Option value="endsWith">endsWith</Option>
			<Option value="regex">regex</Option>
		</Select>
	</div>
	<FormField align="end" style="display: flex;">
		<Slider style="flex-grow: 1;" bind:value={max_len} min="3" max={max_word_len} step="1"/>
		<span slot="label" style="padding-right: 12px; width: max-content; display: block;">Max word length ({max_len}
			)</span>
	</FormField>
	<FormField align="end" style="display: flex;">
		<Slider style="flex-grow: 1;" bind:value={max_match} min="50" max="5000" step="50"/>
		<span slot="label" style="padding-right: 12px; width: max-content; display: block;">Max result ({max_match}
			)</span>
	</FormField>
	<div>
		<Textfield bind:files={selected_file} label="" type="file"/>
		{#if words.length}
			{words.length} words
		{:else}
			(word per line)
		{/if}
	</div>
	<div>
		<Button on:click={()=>load_http("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt")}>
			Load from
			github.com/dwyl/english-words
		</Button>
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