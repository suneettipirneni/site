import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import { remarkHeadings } from "../rehype/plugins/remarkHeadings.ts";

async function renderedHeadings(source, modern) {
	const outline = [];
	const rendered = [];
	await serialize(source, {
		mdxOptions: {
			remarkPlugins: [
				remarkGfm,
				remarkMath,
				...(modern ? [[remarkHeadings, outline]] : []),
			],
			rehypePlugins: [
				...(modern ? [] : [rehypeSlug]),
				() => (tree) => {
					visit(tree, "element", (node) => {
						if (
							/^h[1-6]$/.test(node.tagName) &&
							node.properties.id !== "footnote-label"
						) {
							rendered.push({
								slug: node.properties.id,
								level: Number(node.tagName[1]),
							});
						}
					});
				},
			],
		},
	});
	return { outline, rendered };
}

const fixture =
	"# **First** `code` ~~old~~\n\n# **First** `code` ~~old~~\n\n```md\n# Not a heading\n```\n\n## A <em>JSX title</em>\n\n###### Deepest\n";
const sample = await renderedHeadings(fixture, true);
assert.deepEqual(sample.outline, [
	{ level: 2, text: "First code old", slug: "first-code-old" },
	{ level: 2, text: "First code old", slug: "first-code-old-1" },
	{ level: 3, text: "A JSX title", slug: "a-jsx-title" },
	{ level: 6, text: "Deepest", slug: "deepest" },
]);
assert.deepEqual(
	sample.rendered,
	sample.outline.map(({ slug, level }) => ({ slug, level })),
);

let count = 0;
for (const filename of await readdir(new URL("../posts/", import.meta.url))) {
	if (!filename.endsWith(".mdx")) continue;
	const { content } = matter(
		await readFile(new URL(`../posts/${filename}`, import.meta.url), "utf8"),
	);
	const previous = await renderedHeadings(content, false);
	const current = await renderedHeadings(content, true);
	assert.deepEqual(
		current.rendered.map(({ slug }) => slug),
		previous.rendered.map(({ slug }) => slug),
		`${filename} preserves anchors`,
	);
	assert.deepEqual(
		current.rendered,
		current.outline.map(({ slug, level }) => ({ slug, level })),
		`${filename} outline matches rendered headings`,
	);
	assert.ok(
		current.rendered.every(({ level }) => level >= 2 && level <= 6),
		`${filename} has body heading hierarchy`,
	);
	count += current.rendered.length;
}
console.log(
	`Verified formatted, repeated, fenced, JSX, and deepest headings plus ${count} headings across all posts.`,
);
