export function was_child_of(element: Element, node: HTMLElement | null): boolean {
	return find_parent(node, it => it == element) != null
}

export function find_parent<T extends Element>(element: Element | null,
                                               cond: (elem: Element) => boolean): T | null {
	let ptr: Element | null = element
	while (ptr) {
		if (cond(ptr)) return ptr as T
		ptr = ptr.parentElement
	}
	return null
}