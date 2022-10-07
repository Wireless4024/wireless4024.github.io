<script lang="ts">
	import Button         from "@smui/button"
	import {FsApiWrapper} from "../util/fs_api"
	import type {
		WritableFileStream,
		WritableFileSystemHandle
	}                     from "../util/wrapper"

	let file: File
	let writable: WritableFileSystemHandle

	const fs = new FsApiWrapper({
		types: [{
			description: "GRPC client config",
			accept     : {'application/json': ['.json']}
		}]
	})

	async function choose_config_file() {
		/*let [fileHandle] = await showOpenFilePicker({
			types: [{
				description: "GRPC client config",
				accept     : {'application/json': ['.json']}
			}]
		})
		file = await fileHandle.getFile()
*/
		await fs.get_file()
	}

	function replace_content(data: Parameters<WritableFileStream["write"]>[0]) {
		return fs.write(data)
	}

	const available = fs.available
</script>
{#if $available}
	hello
{:else}
	<div class="center file-chooser">
		<Button on:click={choose_config_file}>Choose a configuration file</Button>
	</div>
{/if}

<style>
	.file-chooser {
		margin-top: 32px;
	}
</style>