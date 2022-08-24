<script lang="ts">
	import projects       from "../lib/constant/projects"
	import Container      from "../lib/Container.svelte";
	import type {Project} from "../lib/types/project"

	export let params: { name?: string } = {}

	let project_name: string | undefined = params.name
	let project: Project = projects.find(it => it.name == project_name)
</script>
<Container>
	{#if project}
		<div>
			<h2>{project.name}</h2>
		</div>
	{:else}
		<h1>Project '{project_name}' was not found</h1>
	{/if}
</Container>