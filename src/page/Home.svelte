<script lang="ts">
	import LayoutGrid  from "@smui/layout-grid"
	import projects    from "../lib/constant/projects.js";
	import Container   from "../lib/Container.svelte";
	import GridCard    from "../lib/GridCard.svelte";
	import ProjectCard from "../lib/ProjectCard.svelte";
</script>
<Container>
	<h1 class="mdc-typography--headline1">Hello? looking for something?</h1>
	<hr>
	<h2 class="mdc-typography--headline6">My Stats</h2>
	<div>
		<div>
			<h3>
				Github
			</h3>
			<a href="https://wakatime.com/@wireless4024" target="_blank">
				<img src="https://github-readme-stats.vercel.app/api?username=wireless4024&show_icons=true&hide_border=true&hide_title=true"
				     alt="Wakatime">
			</a>
		</div>
		<div>
			<h3>
				Wakatime (Since 28 Jul 2022)
			</h3>
			<a href="https://wakatime.com/@wireless4024" target="_blank">
				<img src="https://github-readme-stats.vercel.app/api/wakatime?username=wireless4024&show_icons=true&locale=en&layout=compact&hide_border=true&hide_title=true"
				     alt="Wakatime">
			</a>
		</div>
	</div>

	<hr>
	<h2 class="mdc-typography--headline6">My projects</h2>
	<LayoutGrid>
		{#each projects as project}
			<GridCard>
				<ProjectCard {project}></ProjectCard>
			</GridCard>
		{/each}
	</LayoutGrid>
</Container>