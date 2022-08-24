<script lang="ts">
	import LinearProgress from '@smui/linear-progress'

	export let href: string
	export let src: string
	export let alt: string
	if (!alt) alt = href

	let loading: boolean = true

	function loadFinish() {loading = false}
</script>
{#if loading}
	<LinearProgress indeterminate/>
{/if}
<a {href} target="_blank" class:hidden={loading}>
	<img on:load|once={loadFinish} class="safe-width border mdc-elevation--z5" {src} {alt}>
</a>
<style>
	.safe-width {
		max-width: 91vw;
	}
</style>