export type Project = {
	name: string
	description: string
	technology: ProjectTechnology[]
	features: string[]
	since: Date
	repo?: string
}

export enum ProjectTechnologyCategory {
	HTTPFramework = "HTTP Framework",
	HTTPClient    = "HTTP Client",
}

type ProjectTechnology = {
	name: string
	language?: string
	category: ProjectTechnologyCategory
	url: string
}