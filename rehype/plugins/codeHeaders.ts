import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const rehypeCodeHeaders: Plugin<[], Root> = () => (tree) => {
	visit(tree, "element", (node) => {
		if (
			node.tagName !== "figure" ||
			!("data-rehype-pretty-code-figure" in node.properties)
		)
			return;
		const pre = node.children.find(
			(child): child is Element =>
				child.type === "element" && child.tagName === "pre",
		);
		if (!pre) return;
		const title = node.children.find(
			(child): child is Element =>
				child.type === "element" &&
				child.tagName === "figcaption" &&
				"data-rehype-pretty-code-title" in child.properties,
		);
		const language = String(pre.properties["data-language"] || "text");
		const header: Element = {
			type: "element",
			tagName: "figcaption",
			properties: { className: ["code-header"], "data-not-typeset": true },
			children: [
				...(title
					? [
							{
								type: "element" as const,
								tagName: "span",
								properties: { className: ["code-filename"] },
								children: title.children,
							},
						]
					: []),
				{
					type: "element",
					tagName: "span",
					properties: { className: ["code-language"] },
					children: [{ type: "text", value: language }],
				},
			],
		};
		node.children = [
			header,
			...node.children.filter((child) => child !== title),
		];
	});
};
