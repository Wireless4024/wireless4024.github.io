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
	Database      = "Database",
	Language      = "Language",
}

type ProjectTechnology = {
	name: string
	language?: string
	category: ProjectTechnologyCategory | string
	url: string
}

export function language_as_technology(language: string, url: string): ProjectTechnology {
	return {
		category: ProjectTechnologyCategory.Language,
		name    : language,
		url
	}
}