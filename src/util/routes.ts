import type {AsyncSvelteComponent} from "svelte-spa-router"
import wrap                        from "svelte-spa-router/wrap"
import Loading                     from "../page/Loading.svelte"

function component(asyncComponent: AsyncSvelteComponent) {
	return wrap({
		asyncComponent,
		loadingComponent: Loading
	})
}

export default {
	'/'             : component(() => import("../page/Home.svelte")),
	'/projects'     : component(() => import("../page/ProjectList.svelte")),
	'/project/:name': component(() => import("../page/Project.svelte"))
}