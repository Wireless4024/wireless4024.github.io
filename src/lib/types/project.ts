export type Project = {
	name: string
	description: string
	technology: ProjectTechnology[]
	features: string[]
	since: Date
	repo?: string
}

export enum ProjectTechnologyCategory {
	HTTPFramework,
	HTTPClient
}

type ProjectTechnology = {
	name: string
	language?: string
	category: ProjectTechnologyCategory
}