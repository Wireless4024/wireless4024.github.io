import type {Project} from "../types/project"
import {
	language_as_technology,
	ProjectTechnologyCategory
}                     from "../types/project"

const AXUM: Project["technology"][number] = {
	name    : "Axum",
	language: "Rust",
	category: ProjectTechnologyCategory.HTTPFramework,
	url     : "https://github.com/tokio-rs/axum"
}
const SPRING: Project["technology"][number] = {
	name    : "Spring Boot",
	language: "Kotlin",
	category: ProjectTechnologyCategory.HTTPFramework,
	url     : "https://spring.io/"
}
const POSTGRES: Project["technology"][number] = {
	name    : "PostgreSQL",
	category: ProjectTechnologyCategory.Database,
	url     : "https://www.postgresql.org/"
}

const KOTLIN = language_as_technology("Kotlin", "https://kotlinlang.org/")

export default [
	{
		name       : "lnshm",
		description: "A utility help to create folder in ramdisk and link it to anywhere",
		features   : [
			"Customizable ramdisk folder",
			"Automatic ensure target folder is linked correctly",
			"Copy data from some directory during creation",
		],
		technology : [
			language_as_technology("Rust", "https://www.rust-lang.org/")
		],
		since      : new Date("24 Aug 2022"),
		repo       : "https://github.com/Wireless4024/lnshm"
	},
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
		name       : "Voting",
		description: "Simple voting software for small team",
		features   : [
			"Fetch issues from jira",
			"Blind vote (known result after vote session end)",
			"Realtime vote result",
			"Save vote result into json",
			"Save story point into jira",
		],
		technology : [
			SPRING
		],
		since      : new Date("7 Apr 2022"),
		repo       : "https://github.com/Wireless4024/voting"
	},
	{
		name       : "Trashcan",
		description: "Temporary file storage, but you can choose when to expire (delete) like your trashcan!",
		features   : [
			"Stored file are encrypted",
			"Download limit",
			"Delete after expired",
			"Retain formatting and color if paste from IDE",
		],
		technology : [
			SPRING, POSTGRES
		],
		since      : new Date("22 Mar 2022"),
		repo       : "https://github.com/Wireless4024/trashcan"
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
				category: ProjectTechnologyCategory.HTTPClient,
				url     : "https://ktor.io/"
			},
		],
		since      : new Date("19 Feb 2022"),
		repo       : "https://github.com/Wireless4024/mmcupdater-server"
	},
	{
		name       : "Launchpad Util",
		description: "Program your launchpad with kotlin",
		features   : [
			"Emulate human input w/ java.util.Robot",
			"Drawing word on launchpad",
			"Drawing gif on launchpad",
		],
		technology : [
			KOTLIN
		],
		since      : new Date("Nov 2021"),
		repo       : "https://github.com/Wireless4024/launchpad-util"
	},
	{
		name       : "DiscordBot",
		description: "Basic discord bot with basic feature",
		features   : [
			"Calculator that support number beyond 2**(2**32) bit",
			"Music player with adjustable equalizer (very new in 2019)",
			"Sandbox javascript evaluator (by Rhino)",
			"Temporary sqlite session (in memory)",
			"String manipulation",
		],
		technology : [
			KOTLIN,
			{
				name    : "JDA",
				language: "Java",
				category: "Discord API",
				url     : "https://github.com/DV8FromTheWorld/JDA"
			},
			{
				name    : "Rhino",
				language: "Java",
				category: "Javascript Engine",
				url     : "https://github.com/mozilla/rhino"
			},
		],
		since      : new Date("11 Aug 2019"),
		repo       : "https://github.com/Wireless4024/DiscordBot"
	},
] as Project[]