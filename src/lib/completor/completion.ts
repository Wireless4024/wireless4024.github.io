import {
	type    Writable,
	writable
} from "svelte/store"

export const COMMANDS: Writable<Record<string, CompletionSpec>> = writable({})
export type CompletionSpec = Array<CompletionArg>
export type CompletionArg = {
	name: string
	// null: if it doesn't need completion
	type?: CompletionType
	custom_completion?: (token: string) => string[]
}
export const CompletionTypes = Object.freeze([
	"UNKNOWN",
	"PATH",
	"PATH/DIRECTORY",
	"PATH/FILE",
	"COMMAND",
	"URL",
	"CUSTOM",
] as const)
export type CompletionType = typeof CompletionTypes[number]

/// simulate `cat` command

COMMANDS.update(it => {
	it["cat"] = [
		{name: "-A"}, {name: "--show-all"},
		{name: "-b"}, {name: "--number-nonblank"},
		{name: "-e"},
		{name: "-E"}, {name: "--show-ends"},
		{name: "-n"}, {name: "--number"},
		{name: "-s"}, {name: "--squeeze-blank"},
		{name: "-t"},
		{name: "-T"}, {name: "--show-tabs"},
		{name: "-v"}, {name: "--show-nonprinting"},
		{name: "--help"},
		{name: "--version"},
	]
	return it
})