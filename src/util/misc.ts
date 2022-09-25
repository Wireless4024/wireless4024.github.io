function error(err: any) {
	console.error(err)
}

/**
 * safety consume promise
 * @param promise
 */
export function consume<T>(promise: Promise<T>) {
	promise.then().catch(error)
}