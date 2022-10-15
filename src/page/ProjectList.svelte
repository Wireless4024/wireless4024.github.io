<script lang="ts">
	import LayoutGrid  from "@smui/layout-grid"
	import projects    from "../lib/constant/projects.js"
	import Container   from "../lib/Container.svelte";
	import GridCard    from "../lib/GridCard.svelte"
	import ProjectCard from "../lib/ProjectCard.svelte"
</script>
<Container>
	<h1 class="center">My projects</h1>
	<LayoutGrid>
		{#each projects as project}
			<GridCard>
				<ProjectCard {project}></ProjectCard>
			</GridCard>
		{/each}
	</LayoutGrid>
</Container>