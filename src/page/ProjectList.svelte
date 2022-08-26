<script lang="ts">
	import {H1}        from '@smui/common/elements'
	import LayoutGrid  from "@smui/layout-grid"
	import projects    from "../lib/constant/projects.js"
	import Container   from "../lib/Container.svelte";
	import GridCard    from "../lib/GridCard.svelte"
	import ProjectCard from "../lib/ProjectCard.svelte"
</script>
<Container>
	<H1 class="center">My projects</H1>
	<LayoutGrid>
		{#each projects as project}
			<GridCard>
				<ProjectCard {project}></ProjectCard>
			</GridCard>
		{/each}
	</LayoutGrid>
</Container>