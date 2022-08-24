<script lang="ts">
	import LayoutGrid  from "@smui/layout-grid"
	import projects    from "../lib/constant/projects.js";
	import Container   from "../lib/Container.svelte";
	import GridCard    from "../lib/GridCard.svelte";
	import LinkedImage from "../lib/LinkedImage.svelte";
	import ProjectCard from "../lib/ProjectCard.svelte";
</script>
<Container>
	<h1 class="center mdc-typography--headline1">Hello? looking for something?</h1>
	<hr>
	<h2 class="center mdc-typography--headline6">My Stats</h2>
	<div class="center">
		<div>
			<h3>
				Github
			</h3>
			<LinkedImage href="https://github.com/Wireless4024"
			             src="https://github-readme-streak-stats.herokuapp.com?user=Wireless4024&hide_border=false&hide_title=true"
			             alt="Github"></LinkedImage>
		</div>
		<div>
			<h3>
				Wakatime (Since 28 Jul 2022)
			</h3>
			<LinkedImage href="https://wakatime.com/@wireless4024"
			             src="https://github-readme-stats.vercel.app/api/wakatime?username=wireless4024&show_icons=true&locale=en&layout=compact&hide_border=false&hide_title=true"
			             alt="Wakatime"></LinkedImage>
		</div>
	</div>

	<hr>
	<h2 class="mdc-typography--headline6 center">My projects</h2>
	<LayoutGrid>
		{#each projects as project}
			<GridCard>
				<ProjectCard {project}></ProjectCard>
			</GridCard>
		{/each}
	</LayoutGrid>
</Container>
<style>
	.center {
		text-align: center;
	}
</style>