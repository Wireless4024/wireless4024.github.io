import wrap from "svelte-spa-router/wrap"

export default {
	'/'             : wrap({
		asyncComponent: () => import("../page/Home.svelte")
	}),
	'/project/:name': wrap({
		asyncComponent: () => import("../page/Project.svelte")
	})
}