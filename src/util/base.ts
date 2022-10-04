import {writable} from "svelte/store"

export const status_list = writable<string[]>([])

export function push_status(message: string) {
	status_list.update(it => {
		it.push(message)
		return it
	})
}