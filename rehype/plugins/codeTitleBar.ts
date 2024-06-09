import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Element } from "hast";
import { toText } from "hast-util-to-text";
import { Node } from "unified/lib";

const languageMap: Record<string, string> = {
	cpp: "c++",
	"c#": "C-Sharp",
	rs: "Rust",
	py: "Python",
	js: "JavaScript",
	javascript: "JavaScript",
	ts: "TypeScript",
	typescript: "TypeScript",
	tsx: "TSX",
	jsx: "JSX",
	html: "HTML",
	css: "CSS",
};

function transformLanguage(language: string) {
	const titleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

	if (language in languageMap) {
		return titleCase(languageMap[language]);
	}

	return titleCase(language);
}

// This plugin adds a title bar and a copy button to code blocks.
export const codeTitleBarPlugin: Plugin = () => {
	// This function is a predicate that checks if a given node is a code block that should have a title bar.
	const codeTitleBarPredicate = (node: Node) => {
		// If the node is not an element, it cannot be a code block with a title bar.
		if (node.type !== "element") {
			return false;
		}

		const element = node as Element;

		// Check if the element is a div with the "data-rehype-pretty-code-fragment" property.
		// If it is, then it is a code block that should have a title bar.
		return Boolean(
			element.tagName === "figure" &&
				"data-rehype-pretty-code-figure" in (element.properties ?? {})
		);
	};

	return (tree) => {
		visit(tree, codeTitleBarPredicate, (node) => {
			const element = node as Element;

			const codeTitleBars = element.children.filter(
				(node) =>
					node.type === "element" &&
					node.tagName === "figcaption" &&
					"data-rehype-pretty-code-title" in node.properties!
			) as Element[];

			// Find the code element
			const codeElement = element.children.find((node) => {
				return node.type === "element" && node.tagName === "pre";
			});

			if (!codeElement) {
				return;
			}

			// Extract the raw code text
			const code = toText(codeElement);

			// A function to add the copy button to the title bar.
			const modifyTitleBar = (titleBar: Element) => {
				titleBar.properties!.className =
					"flex flex-row justify-between items-center w-full";
				titleBar.children.push({
					type: "element",
					tagName: "CopyButton",
					properties: {
						text: code,
					},
					children: [],
				});
			};

			// Title already set, append the copy button.
			if (codeTitleBars.length > 0) {
				codeTitleBars.forEach(modifyTitleBar);
				return;
			}

			// Resolve the language
			const preElement = element.children.find(
				(node) =>
					node.type === "element" &&
					node.tagName === "pre" &&
					"data-language" in node.properties!
			) as Element | undefined;

			if (!preElement) {
				return;
			}

			const language = preElement.properties?.["data-language"] as string;

			if (!language || language.length === 0) {
				return;
			}

			// Create a new title bar for the code block.
			const newTitleBar: Element = {
				type: "element",
				tagName: "figcaption",
				properties: {
					"data-rehype-pretty-code-title": "",
				},
				children: [
					{
						type: "text",
						value: transformLanguage(language),
					},
				],
			};

			modifyTitleBar(newTitleBar);
			element.children.unshift(newTitleBar);
		});
	};
};
