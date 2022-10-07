import {writable} from "svelte/store"
import type {
	WritableFileStream,
	WritableFileSystemHandle
}                 from "./wrapper"
import {
	showOpenFilePicker,
	showSaveFilePicker
}                 from "./wrapper"

type FsOpenOption = {
	types?: FileType[]
}

type FileType = {
	description?: string
	accept?: Record<string, string[]>
}

export class FsApiWrapper {
	private handle: WritableFileSystemHandle | undefined
	private file_handle: File | undefined

	available = writable(false)

	constructor(private cfg?: FsOpenOption, available?: boolean) {
		if (available) this.available.set(available)
	}

	private async get_handle(): Promise<WritableFileSystemHandle> {
		let handle = this.handle
		if (!handle) {
			this.handle = handle = await showSaveFilePicker(this.cfg)
		}
		this.available.set(true)
		return handle
	}

	async get_file(): Promise<File> {
		let file_handle = this.file_handle
		if (!file_handle) {
			const write_handle = this.handle
			if (write_handle) {
				this.file_handle = file_handle = await write_handle.getFile()
			} else {
				let [h] = await showOpenFilePicker(this.cfg)
				file_handle = this.file_handle = await h.getFile()

			}
		}
		this.available.set(true)
		return file_handle!
	}

	async read_string(): Promise<string> {
		const file = await this.get_file()
		return file.text()
	}

	write_object(value: any, replacer?: (this: any, key: string, value: any) => any,
	             space?: string | number): Promise<void> {
		return this.write(JSON.stringify(value, replacer, space))
	}

	async write(data: Parameters<WritableFileStream["write"]>[0]): Promise<void> {
		const handle = await this.get_handle()
		const writable = await handle.createWritable()
		await writable.write(data)
		await writable.close()
	}

	async close(): Promise<void> {

	}
}