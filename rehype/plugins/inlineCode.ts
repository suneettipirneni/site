import { visit } from "unist-util-visit";
import { Element } from "hast";
import { Plugin } from "unified";
import { Node } from "unist-util-visit/lib";

// This plugin adds a `data-inline-code` attribute to inline code elements.

// This logic was used from https://github.com/delbaoliveira/website/blob/187ed8ea3cd4b78122148227cd060666227be555/lib/rehyePrettyCode.ts
export const inlineCodePlugin: Plugin = () => {
	// This check can disambiguate inline code against code within a codeblock
	// by checking the presence of data on the element. If the element contains data
	// it is in a codeblock, otherwise it is inline. Finally we check if the element
	// in question has a direct text child.

	const inlineCodePredicate = (node: Node) => {
		if (node.type !== "element") {
			return false;
		}

		const element = node as Element;

		return Boolean(
			element.tagName === "code" &&
				Object.keys(element.properties ?? []).length === 0 &&
				element.children.some((n: any) => n.type === "text")
		);
	};

	return (tree: Node) => {
		visit(tree, inlineCodePredicate, (node: Node) => {
			const element = node as Element;

			const textNode = element.children.find(
				(node) => node.type === "text"
			) as Element;

			if (!textNode) {
				return;
			}

			textNode.type = "element";
			textNode.tagName = "code";
			textNode.properties = {
				// Add a data attribute for styling.
				"data-inline-code": true,
			};
			// @ts-expect-error
			textNode.children = [{ type: "text", value: textNode.value }];
			element.tagName = "span";
		});
	};
};
