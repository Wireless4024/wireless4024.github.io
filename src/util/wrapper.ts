// This file created to wrap general js function due efficiency during code generation
// like `document.getElementById` if I wrap it here it can be just `aa`

/**
 * @inheritDoc
 */
export const fromCharCode = String.fromCharCode

export const showOpenFilePicker: ((opt?: any) => Promise<[FileSystemFileHandle]>) = (window as any).showOpenFilePicker
export type WritableFileSystemHandle = FileSystemFileHandle & {
	createWritable(): WritableFileStream
}
export type WritableFileStream = {
	write(data: WritableData | WriteOption): Promise<void>
	close(): Promise<void>
}
export type WriteOption =
	| { type: "write", position: number, data: WritableData }
	| { type: "seek", position: number }
	| { type: "truncate", size: number }
type WritableData = string | Blob

export const showSaveFilePicker: ((opt?: any) => Promise<WritableFileSystemHandle>) = (window as any).showSaveFilePicker