// This file created to wrap general js function due efficiency during code generation
// like `document.getElementById` if I wrap it here it can be just `aa`

/**
 * @inheritDoc
 */
export const fromCharCode = String.fromCharCode
export const showOpenFilePicker: () => Promise<FileSystemFileHandle[]> = (window as any).showOpenFilePicker

type SaveFilePickerOption = {
	excludeAcceptAllOption?: boolean
	suggestedName?: string
	types: {
		description?: string,
		accept?: Record<string, string[]>
	}[]
}

type WritableFileHandle = {
	createWritable(): Promise<WritableFile>
}

export type WritableFile = {
	write(blob: any): Promise<number>
	close(): Promise<void>
}
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker
 */
export const showSaveFilePicker: (options?: SaveFilePickerOption) => Promise<FileSystemFileHandle & WritableFileHandle> = (window as any).showSaveFilePicker
