<script lang="ts">
	import IconButton                   from '@smui/icon-button'
	import type {TopAppBarComponentDev} from '@smui/top-app-bar'
	import TopAppBar, {
		AutoAdjust,
		Row,
		Section,
	}                                   from '@smui/top-app-bar'
	//Title,

	let topAppBar: TopAppBarComponentDev
</script>
<TopAppBar bind:this={topAppBar} variant="standard">
	<Row>
		<Section>
			<IconButton class="material-icons">menu</IconButton>
			<!--<Title>Dense</Title>-->
		</Section>
		<Section align="end" toolbar>
			<IconButton class="material-icons" aria-label="Download"
			            on:click={()=>alert("I'm a decorator no functional")}>check_box
			</IconButton>
			<!--<IconButton class="material-icons" aria-label="Print this page">print</IconButton>
			<IconButton class="material-icons" aria-label="Bookmark this page">bookmark</IconButton>-->
		</Section>
	</Row>
</TopAppBar>
<AutoAdjust {topAppBar}>
	<slot></slot>
</AutoAdjust>