import wrap    from "svelte-spa-router/wrap"
import Loading from "../page/Loading.svelte"

function component(path: string) {
	return wrap({
		asyncComponent  : () => import(path),
		loadingComponent: Loading
	})
}

export default {
	'/'             : component("../page/Home.svelte"),
	'/project/:name': component("../page/Project.svelte")
}