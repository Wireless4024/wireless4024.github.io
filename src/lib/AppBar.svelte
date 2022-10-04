<script lang="ts">
	import {H6}                         from '@smui/common/elements'
	import Drawer, {
		AppContent,
		Content,
		Header,
		Scrim,
		Subtitle,
		Title,
	}                                   from '@smui/drawer'
	import IconButton                   from '@smui/icon-button'
	//Title,
	import List, {
		Separator,
		Subheader
	}                                   from '@smui/list'
	import type {TopAppBarComponentDev} from '@smui/top-app-bar'
	import TopAppBar, {
		AutoAdjust,
		Row,
		Section,
	}                                   from '@smui/top-app-bar'
	import {push}                       from "svelte-spa-router"
	import NavItem                      from "./NavItem.svelte";
	import StatusBar                    from "./StatusBar.svelte";

	let topAppBar: TopAppBarComponentDev

	let open: boolean = false
</script>
<Drawer variant="modal" fixed={false} bind:open>
	<Header>
		<Title>Wireless4024</Title>
		<Subtitle>wireless4024.github.io</Subtitle>
	</Header>
	<Content>
		<List>
			<NavItem href="/" icon="home">Home</NavItem>
			<NavItem href="/projects" icon="book">Projects</NavItem>
			<Separator/>
			<Subheader component={H6}>Utility</Subheader>
			<NavItem href="/utils/completor">Completor (WIP)</NavItem>
			<NavItem href="/utils/grpc-client" icon="call">GRPC Client (WIP)</NavItem>
		</List>
	</Content>
</Drawer>

<Scrim fixed={false}/>
<AppContent class="app-content">
	<TopAppBar bind:this={topAppBar} variant="standard">
		<Row>
			<Section>
				<IconButton class="material-icons" on:click={()=>open = true}>
					menu
				</IconButton>
				<!--<Title>Dense</Title>-->
			</Section>
			<Section align="end" toolbar>
				<IconButton class="material-icons" title="go home" aria-label="back to home page"
				            on:click={()=>push('/')}>
					home
				</IconButton>
			</Section>
		</Row>
	</TopAppBar>
	<AutoAdjust {topAppBar}>
		<slot></slot>
	</AutoAdjust>
</AppContent>
<StatusBar></StatusBar>