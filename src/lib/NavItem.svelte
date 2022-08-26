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
</script>
<Item href="javascript:void(0)" on:click={()=>push(href)} activated={href===$location}>
	{#if icon}
		<Graphic class="material-icons" aria-hidden="true">{icon}</Graphic>
	{/if}
	<Text>
		<slot></slot>
	</Text>
</Item>