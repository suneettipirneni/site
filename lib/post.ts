import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkHeadings } from "../rehype/plugins/remarkHeadings";
import matter from "gray-matter";
import { z } from "zod";
import { calculateReadingTime } from "./calculateReadingTime";
import { HeadingData } from "@/util/HeaderTree";
import { postSources } from "@/post-sources";

export interface PostMeta {
	author: string;
	datetime: Date;
	title: string;
	featured: boolean;
	draft: boolean;
	tags: string[];
	headingImage: string;
	description: string;
}

const postMetaValidator = z.object({
	author: z.string(),
	datetime: z.date(),
	title: z.string(),
	featured: z.boolean(),
	draft: z.boolean(),
	tags: z.array(z.string()),
	headingImage: z.string(),
	description: z.string(),
});

export interface Post extends PostMeta {
	slug: string;
	body: string;
	headings: HeadingData[];
	timeToRead: number;
	url: string;
}

function resolveHeadings(body: string): HeadingData[] {
	const headings: HeadingData[] = [];
	const processor = unified()
		.use(remarkParse)
		.use(remarkMdx)
		.use(remarkGfm)
		.use(remarkMath)
		.use(remarkHeadings, headings);
	processor.runSync(processor.parse(body));
	return headings;
}

function parsePost(slug: string, source: string): Post {
	const { content, data } = matter(source);
	const meta: PostMeta = postMetaValidator.parse(data);

	return {
		...meta,
		slug,
		body: content,
		headings: resolveHeadings(content),
		timeToRead: calculateReadingTime(content),
		url: `/blog/posts/${slug}`,
	};
}

export function getPosts(): Post[] {
	return Object.entries(postSources).map(([postPath, source]) => {
		const filename = postPath.slice(postPath.lastIndexOf("/") + 1);
		return parsePost(filename.replace(/\.mdx$/, ""), source);
	});
}

export function getPost(slug: string): Post | undefined {
	const source = postSources[`./posts/${slug}.mdx`];
	return source === undefined ? undefined : parsePost(slug, source);
}
