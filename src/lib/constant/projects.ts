import type {Project}              from "../types/project"
import {ProjectTechnologyCategory} from "../types/project"

const AXUM = {
	name    : "Axum",
	language: "Rust",
	category: ProjectTechnologyCategory.HTTPFramework
}

export default [
	{
		name       : "Github Hooker",
		description: "A http server to handle github webhook and execute command",
		features   : [
			"Execute command based on branch (wildcard support) and repo"
		],
		technology : [
			AXUM
		],
		since      : new Date("19 May 2022"),
		repo       : "https://github.com/Wireless4024/github-hooker"
	},
	{
		name       : "MMCUpdater",
		description: "MultiMC (Minecraft) pack updater (sync with server)",
		features   : [
			"Sync game version with server",
			"Sync forge version with server",
			"Download mods as zip without pre-compress",
			"Low memory footprint",
		],
		technology : [
			AXUM,
			{
				name    : "Ktor",
				language: "Kotlin",
				category: ProjectTechnologyCategory.HTTPClient
			},
		],
		since      : new Date("19 Feb 2022"),
		repo       : "https://github.com/Wireless4024/mmcupdater-server"
	},
] as Project[]