<script lang="ts">
	import IconButton                   from '@smui/icon-button'
	import type {TopAppBarComponentDev} from '@smui/top-app-bar'
	import TopAppBar, {
		AutoAdjust,
		Row,
		Section,
	}                                   from '@smui/top-app-bar'
	import {push}                       from "svelte-spa-router";
	//Title,

	let topAppBar: TopAppBarComponentDev

	function rick_roll() {
		if (window.confirm("Do you want to open menu")) {
			window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank').focus();
		}
	}
</script>
<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
		<Section>
			<IconButton class="material-icons" on:click={rick_roll}>
				menu
			</IconButton>
			<!--<Title>Dense</Title>-->
		</Section>
		<Section align="end" toolbar>
			<IconButton class="material-icons" title="go home" aria-label="back to home page" on:click={()=>push('/')}>
				home
			</IconButton>
			<!--<IconButton class="material-icons" aria-label="Print this page">print</IconButton>
			<IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton>-->
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
	<slot></slot>
</AutoAdjust>