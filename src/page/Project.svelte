<script lang="ts">
	import Button         from "@smui/button";
	import List, {
		Item,
		PrimaryText,
		SecondaryText,
		Text
	}                     from '@smui/list'
	import Paper, {
		Content,
		Subtitle,
		Title
	}                     from '@smui/paper';
	import {push}         from "svelte-spa-router";
	import projects       from "../lib/constant/projects"
	import Container      from "../lib/Container.svelte"
	import type {Project} from "../lib/types/project"

	export let params: { name?: string } = {}

	let project_name: string | undefined = params.name
	let project: Project = projects.find(it => it.name == project_name)
</script>
<Container>
	{#if project}
		<div class="border">
			<Paper>
				<Title>{project.name}</Title>
				{#if project.repo}
					<Subtitle>
						<a href={project.repo}>{project.repo}</a>
					</Subtitle>
				{/if}
				<Content>{project.description}</Content>
			</Paper>
		</div>
		<div class="border" style="margin-top: 8px">
			<Paper>
				<Title>Features</Title>
				<Content>
					<!--threeLine-->
					<ul>
						{#each project.features as feature}
							<li>{feature}</li>
						{/each}
					</ul>
				</Content>
			</Paper>
		</div>
		<div class="border" style="margin-top: 8px">
			<Paper>
				<Title>Technology</Title>
				<Content>
					<List nonInteractive>
						{#each project.technology as technology}
							<Item>
								<Text>
									{#if technology.language}
										<PrimaryText>
											<a href={technology.url}>{technology.name} ({technology.category})</a>
										</PrimaryText>
										<SecondaryText>{technology.language}</SecondaryText>
									{:else}
										<a href={technology.url}>{technology.name} ({technology.category})</a>
									{/if}
									<!--<SecondaryText></SecondaryText>-->
								</Text>
							</Item>
						{/each}
					</List>
				</Content>
			</Paper>
		</div>
		<div class="center">
			<div style="margin-bottom: 32px">
				<Button class="border-out" style="background: white;margin: 16px" on:click={()=>push('/projects')}>view
					all {projects.length} projects
				</Button>
			</div>
		</div>
	{:else}
		<h1>Project '{project_name}' was not found</h1>
	{/if}
</Container>