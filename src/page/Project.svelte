<script lang="ts">
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
	import projects       from "../lib/constant/projects"
	import Container      from "../lib/Container.svelte"
	import type {Project} from "../lib/types/project"

	export let params: { name?: string } = {}

	let project_name: string | undefined = params.name
	let project: Project = projects.find(it => it.name == project_name)
</script>
<Container>
	{#if project}
		<Paper>
			<Title>{project.name}</Title>
			{#if project.repo}
				<Subtitle>
					<a href={project.repo}>{project.repo}</a>
				</Subtitle>
			{/if}
			<Content>{project.description}</Content>
		</Paper>
		<Paper style="margin-top: 12px;">
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
		<Paper style="margin-top: 12px;">
			<Title>Technology</Title>
			<Content>
				<List nonInteractive>
					{#each project.technology as technology}
						<Item>
							<Text>
								<PrimaryText>
									<a href={technology.url}>{technology.name} ({technology.category})</a>
								</PrimaryText>
								<SecondaryText>{technology.language}</SecondaryText>
								<!--<SecondaryText></SecondaryText>-->
							</Text>
						</Item>
					{/each}
				</List>
			</Content>
		</Paper>
	{:else}
		<h1>Project '{project_name}' was not found</h1>
	{/if}
</Container>