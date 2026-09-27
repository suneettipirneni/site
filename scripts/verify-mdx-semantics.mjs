import assert from "node:assert/strict";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { visit } from "unist-util-visit";
import { toText } from "hast-util-to-text";
import { rehypeTaskListLabels } from "../rehype/plugins/taskListLabels.ts";
import { rehypeCodeHeaders } from "../rehype/plugins/codeHeaders.ts";

const tasks = [];
const headers = [];
await serialize(
	'- [x] **Read** the `guide`\n  - [ ] Nested task\n\n- [ ] Loose task\n\n  Extra description\n\n```ts title="example.ts"\nconst x = 1;\n```\n\n```css\na { color: red; }\n```',
	{
		mdxOptions: {
			remarkPlugins: [remarkGfm],
			rehypePlugins: [
				rehypePrettyCode,
				rehypeCodeHeaders,
				rehypeTaskListLabels,
				() => (tree) => {
					visit(tree, "element", (node) => {
						if (node.tagName === "input") tasks.push(node.properties.ariaLabel);
						if (node.tagName === "figure")
							headers.push(
								node.children
									.filter(
										(child) =>
											child.type === "element" &&
											child.tagName === "figcaption",
									)
									.map((caption) => caption.children.map(toText)),
							);
					});
				},
			],
		},
	},
);
assert.deepEqual(tasks, [
	"Read the guide",
	"Nested task",
	"Loose task\n\nExtra description",
]);
assert.deepEqual(headers, [[["example.ts", "ts"]], [["css"]]]);
console.log(
	"Verified task checkbox names, nested and loose lists, and single code headers with and without filenames.",
);
