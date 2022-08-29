<script lang="ts">
	import {fly} from "svelte/transition"

	export let order: number = 0
</script>
<div in:fly={{delay:(300-(order*order*10))*(order)}} {...$$props}>
	<slot></slot>
</div>