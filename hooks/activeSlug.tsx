import type { HeadingNode } from "@/util/HeaderTree";
import { useEffect, useMemo, useState } from "react";

// Hook adapted from https://nickymeuleman.netlify.app/blog/table-of-contents
export function useActiveSlug(headers: HeadingNode[]) {
	const [activeSlug, setActiveSlug] = useState(``);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSlug(entry.target.id);
					}
				});
			},
			{ rootMargin: `0% 0% -80% 0%` }
		);

		const idCallback = (nodes: HeadingNode[]) => {
			const elements: HTMLElement[] = [];

			nodes.forEach((node) => {
				if (node.children.length > 0) {
					elements.push(...idCallback(node.children));
				}

				const { slug: id } = node;
				const element = document.getElementById(id);

				if (!element) {
					throw new Error(`Cannot find heading with id: ${id}`);
				}

				elements.push(element);
			});

			return elements;
		};

		const elements = idCallback(headers);

		elements.forEach((element) => {
			observer.observe(element);
		});

		return () => {
			elements.forEach((element) => {
				observer.unobserve(element);
			});
		};
	}, [headers]);

	return useMemo(() => activeSlug, [activeSlug]);
}
