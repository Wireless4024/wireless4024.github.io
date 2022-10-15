import type {
	AsyncSvelteComponent,
	WrappedComponent
}                     from "svelte-spa-router"
import wrap           from "svelte-spa-router/wrap"
import Loading        from "../page/Loading.svelte"
import {fromCharCode} from "./wrapper"

function component(asyncComponent: AsyncSvelteComponent) {
	return wrap({
		asyncComponent,
		loadingComponent: Loading
	})
}

const routes: Record<string, WrappedComponent> = {
	'/'                 : component(() => import("../page/Home.svelte")),
	'/projects'         : component(() => import("../page/ProjectList.svelte")),
	'/project/:name'    : component(() => import("../page/Project.svelte")),
	'/utils/completor'  : component(() => import("../page/Completor.svelte")),
	'/utils/word-finder': component(() => import("../page/WordFinder.svelte")),
}

// ctrl f can't find this route
routes[fromCharCode(0x2f, 0x72, 0x65, 0x73, 0x75, 0x6d, 0x65)] = component(() => import("../page/Resume.svelte"))

export default routes