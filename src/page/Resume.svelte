<script lang="ts">
	import Button, {Label} from "@smui/button";
	import List, {
		Item,
		Text
	}                      from "@smui/list";
	import {push}          from "svelte-spa-router";
	import AnimatedDiv     from "../lib/AnimatedDiv.svelte";
	import Container       from "../lib/Container.svelte"
	import Section         from "../lib/Section.svelte"
	import {EN_GB}         from "../util/datetime.js";

	const birth_date = new Date("22 Sep 2002")
	const skills: string[] = ["Kotlin", "Java", "Rust", "Go", "Python", "JavaScript", "TypeScript", "Bash"]
	const linux: { name: string, url: string }[] = [
		{
			name: "Arch Linux",
			url : "https://archlinux.org/"
		}, {
			name: "Ubuntu",
			url : "https://ubuntu.com/"
		}, {
			name: "Rockey Linux",
			url : "https://rockylinux.org/"
		},
	]
</script>
<Container>
	<h1>Resume</h1>
	<Section style="padding: 12px">
		<h3 style="margin: 0 auto">About me</h3>
		<div>
			<List nonInteractive>
				<Item>
					<Text>Wittawat Manha</Text>
				</Item>
				<Item>
					<Text>I'm working as backend developer.</Text>
				</Item>
				<Item>
					<Text>{EN_GB.format(birth_date)} ({new Date().getFullYear() - birth_date.getFullYear()}y)</Text>
				</Item>
				<Item>
					<Text>Bangkok, Thailand</Text>
				</Item>
			</List>
		</div>
	</Section>
	<Section style="padding: 12px" order={1}>
		<h3 style="margin-top: auto">Skills</h3>
		<AnimatedDiv order={2}>
			<div>
				<span class="bold">Programming Languages : </span>
				<div>
					<ol>
						{#each skills as skill}
							<li>
								{skill}
							</li>
						{/each}
					</ol>
				</div>
			</div>
		</AnimatedDiv>
		<AnimatedDiv order={3}>
			<div>
				<span class="bold">Linux : </span>
				<div>
					<ol>
						{#each linux as l}
							<li>
								<a href={l.url}>{l.name}</a>
							</li>
						{/each}
					</ol>
				</div>
			</div>
		</AnimatedDiv>
		<AnimatedDiv order={4}>
			<div>
				<Button on:click={()=>push(("/projects"))} variant="outlined">
					<Label>Projects</Label>
				</Button>
			</div>
		</AnimatedDiv>
	</Section>
</Container>
<style>
	.bold {
		font-weight: 500;
	}
</style>