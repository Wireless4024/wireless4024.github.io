<script lang="ts">
	import Router from "svelte-spa-router"
	import wrap   from "svelte-spa-router/wrap"

	const routes = {
		'/': wrap({
			asyncComponent: () => import("./lib/Home.svelte")
		})
	}
</script>

<main>
	<Router {routes}/>
</main>