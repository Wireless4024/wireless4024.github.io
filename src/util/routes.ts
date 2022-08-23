import wrap from "svelte-spa-router/wrap"

export default {
	'/': wrap({
		asyncComponent: () => import("../page/Home.svelte")
	})
}