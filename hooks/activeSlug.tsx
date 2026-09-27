import type { HeadingNode } from "@/util/HeaderTree";
import { useEffect, useState } from "react";

// Hook adapted from https://nickymeuleman.netlify.app/blog/table-of-contents
export function useActiveSlug(headers: HeadingNode[]) {
	const [activeSlug, setActiveSlug] = useState("");

	useEffect(() => {
		const elements: HTMLElement[] = [];
		const collect = (nodes: HeadingNode[]) => {
			for (const node of nodes) {
				const element = document.getElementById(node.slug);
				if (element) elements.push(element);
				collect(node.children);
			}
		};
		collect(headers);

		const visible = new Set<Element>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) visible.add(entry.target);
					else visible.delete(entry.target);
				}
				const current = elements.findLast(
					(element) =>
						visible.has(element) && element.getClientRects().length > 0,
				);
				if (current) setActiveSlug(current.id);
			},
			{ rootMargin: "0px 0px -80% 0px" },
		);

		for (const element of elements) observer.observe(element);
		return () => observer.disconnect();
	}, [headers]);

	return activeSlug;
}
