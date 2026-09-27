import GithubSlugger from "github-slugger";
import { toString } from "mdast-util-to-string";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { HeadingData } from "../../util/HeaderTree";

export const remarkHeadings: Plugin<[HeadingData[]?], Root> = (headings) => {
	return (tree) => {
		const slugger = new GithubSlugger();

		visit(tree, "heading", (node) => {
			const text = toString(node, { includeImageAlt: false });
			const slug = slugger.slug(text);
			node.depth = Math.min(node.depth + 1, 6) as typeof node.depth;
			node.data = {
				...node.data,
				hProperties: { id: slug },
			};
			headings?.push({ level: node.depth, text, slug });
		});
	};
};
