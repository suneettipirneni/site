import { visit } from "unist-util-visit";
import { Element } from "hast";
import { Plugin } from "unified";
import { Node } from "unified/lib";
import { Text } from "hast-util-to-text/lib";

/**
 * This plugin adds a `data-inline-code` attribute to inline code elements.
 * It checks if the element is inline code by verifying that it is an element with the tag name "code",
 * has no properties, and has a direct text child. If it is inline code, it converts the text node to an element with the tag name "code",
 * adds a `data-inline-code` attribute for styling, and wraps the element in a span tag.
 *
 * This logic was used from https://github.com/delbaoliveira/website/blob/187ed8ea3cd4b78122148227cd060666227be555/lib/rehyePrettyCode.ts
 */
export const inlineCodePlugin: Plugin = () => {
	// This check can disambiguate inline code against code within a codeblock
	// by checking the presence of data on the element. If the element contains data
	// it is in a codeblock, otherwise it is inline. Finally we check if the element
	// in question has a direct text child.

	/**
	 * This function is a predicate that checks if a given node is an inline code element.
	 * It returns true if the node is an element with the tag name "code", has no properties,
	 * and has a direct text child. Otherwise, it returns false.
	 *
	 * @param node The node to check.
	 * @returns True if the node is an inline code element, false otherwise.
	 */
	const inlineCodePredicate = (node: Node): node is Element => {
		if (node.type !== "element") {
			return false;
		}

		const element = node as Element;

		return Boolean(
			element.tagName === "code" &&
				Object.keys(element.properties ?? []).length === 0 &&
				element.children.some((n: Node) => n.type === "text")
		);
	};

	return (tree: Node) => {
		visit(tree, inlineCodePredicate, (element, index, parent: Element) => {
			const textNode = element.children.find(
				(node) => node.type === "text"
			) as Text;

			if (!textNode) {
				return;
			}

			const wrappedNode: Element = {
				type: "element",
				tagName: "code",
				properties: {
					"data-inline-code": true,
				},
				children: [textNode],
			};

			parent?.children.splice(index!, 1, wrappedNode);
		});
	};
};
