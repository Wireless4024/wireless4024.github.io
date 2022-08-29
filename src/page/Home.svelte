<script lang="ts">
	import Button      from "@smui/button";
	import LayoutGrid  from "@smui/layout-grid"
	import {push}      from "svelte-spa-router";
	import AnimatedDiv from "../lib/AnimatedDiv.svelte";
	import projects    from "../lib/constant/projects.js";
	import Container   from "../lib/Container.svelte";
	import GridCard    from "../lib/GridCard.svelte";
	import LinkedImage from "../lib/LinkedImage.svelte";
	import ProjectCard from "../lib/ProjectCard.svelte";
</script>
<Container>
	<h1 class="center mdc-typography--headline1">Hello? looking for something?</h1>
	<h2 class="center mdc-typography--headline1">
		here is
		<a href="https://github.com/Wireless4024">My Github</a>
	</h2>
	<hr>
	<h2 class="center mdc-typography--headline6">My Stats</h2>
	<div class="center">
		<AnimatedDiv>
			<h3>
				Github
			</h3>
			<LinkedImage href="https://github.com/Wireless4024"
			             src="https://github-readme-streak-stats.herokuapp.com?user=Wireless4024&hide_border=false&hide_title=true"
			             alt="Github"></LinkedImage>
		</AnimatedDiv>
		<AnimatedDiv order={1}>
			<h3>
				Wakatime (Since 28 Jul 2022)
			</h3>
			<LinkedImage href="https://wakatime.com/@wireless4024"
			             src="https://github-readme-stats.vercel.app/api/wakatime?username=wireless4024&show_icons=true&locale=en&layout=compact&hide_border=false&hide_title=true"
			             alt="Wakatime"></LinkedImage>
		</AnimatedDiv>
	</div>

	<hr>
	<AnimatedDiv order={2}>
		<h2 class="mdc-typography--headline6 center">My projects</h2>
		<LayoutGrid>
			{#each projects.slice(0, 4) as project,idx}
				<GridCard>
					<ProjectCard {project}></ProjectCard>
				</GridCard>
			{/each}
		</LayoutGrid>
		{#if projects.length > 4}
			<AnimatedDiv order={3} class="center">
				<div style="margin-bottom: 32px">
					<Button class="border-out" style="background: white" on:click={()=>push('/projects')}>view
						all {projects.length} projects
					</Button>
				</div>
			</AnimatedDiv>
		{/if}
	</AnimatedDiv>
</Container>