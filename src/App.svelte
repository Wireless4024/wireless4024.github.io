<script lang="ts">
	import Router from "svelte-spa-router"
	import AppBar from "./lib/AppBar.svelte";
	import routes from "./util/routes.js";
</script>
<AppBar>
	<main>
		<Router {routes}/>
	</main>
</AppBar>