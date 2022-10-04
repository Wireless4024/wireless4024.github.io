<script lang="ts">
	import type {KitchenComponentDev} from '@smui/snackbar/kitchen';
	import Kitchen                    from "@smui/snackbar/kitchen";
	import {
		onDestroy,
		onMount
	}                                 from "svelte"
	import {status_list}              from "../util/base"

	let kitchen: KitchenComponentDev;

	function push_status(status: string) {
		if (status)
			kitchen.push({
				props        : {
					variant: 'stacked',
				},
				label        : status,
				dismissButton: true,
			});
	}

	let unsub: () => void
	onMount(function () {
		let consumed = false
		unsub = status_list.subscribe(it => {
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

	onDestroy(function () {
		unsub && unsub()
	})
</script>
<Kitchen bind:this={kitchen} dismiss$class="material-icons"></Kitchen>
