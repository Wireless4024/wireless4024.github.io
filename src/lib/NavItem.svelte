<script lang="ts">
	import {
		Graphic,
		Item,
		Text
	} from "@smui/list"
	import {
		location,
		push
	} from "svelte-spa-router"

	export let icon: string
	export let href: string

	let activated
	$:{
		const loc = $location
		activated = href.endsWith('s') ? loc.startsWith(href.substring(0, href.length - 1)) : href === loc
	}
</script>
<Item href="javascript:void(0)" on:click={()=>push(href)} {activated}>
	{#if icon}
		<Graphic class="material-icons" aria-hidden="true">{icon}</Graphic>
	{:else}
		<Graphic class="material-icons" aria-hidden="true">more_horiz</Graphic>
	{/if}
	<Text>
		<slot></slot>
	</Text>
</Item>