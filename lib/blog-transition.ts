import type { CSSProperties } from "react";

export function getPostTransitionStyle(
	slug: string,
	part: "title" | "description" | "date" | "read-time" | `tag-${string}`,
): CSSProperties {
	return {
		viewTransitionName: `post-${slug}-${part}`,
		viewTransitionClass: "blog-text",
	};
}

export function getPostTagTransitionStyle(slug: string, tag: string) {
	// Encode tag labels into unique CSS identifiers, including spaces and symbols.
	const identifier = Array.from(tag, (character) =>
		character.codePointAt(0)!.toString(16),
	).join("-");
	return getPostTransitionStyle(slug, `tag-${identifier}`);
}
