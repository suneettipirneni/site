import type { Element, Root } from "hast";
import { toText } from "hast-util-to-text";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

export const rehypeTaskListLabels: Plugin<[], Root> = () => (tree) => {
	visit(tree, "element", (node) => {
		if (
			node.tagName !== "li" ||
			!Array.isArray(node.properties.className) ||
			!node.properties.className.includes("task-list-item")
		)
			return;
		const content = node.children.filter(
			(child) =>
				child.type !== "element" || !["ul", "ol"].includes(child.tagName),
		);
		const label = toText({ ...node, children: content }).trim();
		for (const child of content) {
			if (child.type !== "element") continue;
			const inputs: Element[] =
				child.tagName === "p"
					? child.children.filter(
							(item): item is Element => item.type === "element",
						)
					: [child];
			for (const input of inputs) {
				if (input.tagName === "input" && input.properties.type === "checkbox") {
					input.properties.ariaLabel = label || "Task";
				}
			}
		}
	});
};
