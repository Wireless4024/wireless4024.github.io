import wrap from "svelte-spa-router/wrap"

export default {
	'/': wrap({
		asyncComponent: () => import("../lib/Home.svelte")
	})
}