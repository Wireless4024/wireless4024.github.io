<script lang="ts">
	import type {KitchenComponentDev} from '@smui/snackbar/kitchen';
	import Kitchen                    from "@smui/snackbar/kitchen";
	import {onMount}                  from "svelte"
	import {status_list}              from "../util/base"

	let kitchen: KitchenComponentDev;

	function push_status(status: string) {
		console.log(status)
		if (status)
			kitchen.push({
				props        : {
					variant: 'stacked',
				},
				label        : status,
				dismissButton: true,
			});
	}

	onMount(function () {
		let consumed = false
		status_list.subscribe(it => {
			if (consumed) {
				consumed = false
				return
			}
			consumed = true
			const elem = it.shift()
			push_status(elem)
			status_list.set(it)
		})
	})
</script>
<Kitchen bind:this={kitchen} dismiss$class="material-icons"></Kitchen>
