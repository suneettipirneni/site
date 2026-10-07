import { flushSync } from "react-dom";

function hasVisiblePage(selector: string) {
	return Array.from(document.querySelectorAll(selector)).some(
		(element) => element.getClientRects().length > 0,
	);
}

// Register before the router so the outgoing cached page is still visible
// when the browser captures it. Link navigations use React's ViewTransition.
window.addEventListener("popstate", (event) => {
	if (
		!event.isTrusted ||
		!document.startViewTransition ||
		window.matchMedia("(prefers-reduced-motion: reduce)").matches
	) {
		return;
	}

	const destination = window.location.pathname;
	const betweenPostAndIndex =
		(destination === "/blog" && hasVisiblePage(".site-post-grid")) ||
		(destination.startsWith("/blog/posts/") && hasVisiblePage(".blog-index"));
	if (!betweenPostAndIndex) return;

	event.stopImmediatePropagation();
	const transition = document.startViewTransition(() => {
		// Let Next restore its own history entry and scroll position, then commit
		// the cached page before the browser captures the destination elements.
		flushSync(() => {
			window.dispatchEvent(
				new PopStateEvent("popstate", { state: event.state }),
			);
		});
	});
	// The browser can skip a transition if another navigation interrupts it.
	void transition.ready.catch(() => {});
});
