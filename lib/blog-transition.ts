import type { CSSProperties } from "react";

export function getPostTransitionStyle(
	slug: string,
	part: "image" | "title" | "description",
): CSSProperties {
	return {
		viewTransitionName: `post-${slug}-${part}`,
		viewTransitionClass: part === "image" ? "blog-image" : "blog-text",
	};
}
