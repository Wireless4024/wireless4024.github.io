<script lang="ts">
	import {fly} from "svelte/transition"

	export let order: number = 0
	export let style: string = ""
</script>
<div in:fly={{delay:(300-(order*order*10))*(order)}} class="border" style="margin-bottom: 8px">
	<div style="background-color: white;{style}">
		<slot></slot>
	</div>
</div>