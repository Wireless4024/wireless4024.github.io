<script type="ts">
	import Button, {Label} from "@smui/button"
	import Card, {
		Actions,
		Content
	}                      from "@smui/card"
	import {push}          from "svelte-spa-router";
	import type {Project}  from "./types/project"

	export let project: Project
</script>
<Card>
	<Content class="mdc-typography--body2">
		<h2 class="mdc-typography--headline6" style="margin: 0;">{project.name}</h2>
		{#if project.technology?.length}
			<h3 class="mdc-typography--subtitle2"
			    style="margin: 0 0 10px; color: #888;">{(
              project
                .technology
                .map(({name, language}) => `${name} (${language})`)
                .join(", "))}</h3>
		{/if}
		<div class="project-description" title={project.description}>
			{project.description}
		</div>
	</Content>
	<Actions fullBleed>
		<Button target="_blank" on:click={()=>push("/project/"+encodeURIComponent(project.name))}>
			<Label>read more</Label>
			<i class="material-icons" aria-hidden="true">arrow_forward</i>
		</Button>
	</Actions>
</Card>
<style>
	.project-description {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>