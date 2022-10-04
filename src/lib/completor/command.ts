import type {Writable} from "svelte/store"

export type Command = {
	name: string
	args: Writable<CommandArg>[]
}

export type CommandArg = {
	name: string
	value?: string
}