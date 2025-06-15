import GithubSlugger from "github-slugger";
import { cache } from "react";
import fs from "fs/promises";
import { POSTS_DIR } from "./postsDir.js";
import matter from "gray-matter";
import path from "path";
import { z } from "zod";
import { calculateReadingTime } from "./calculateReadingTime";
import { HeadingData } from "@/util/HeaderTree";

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
	const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
	const slugger = new GithubSlugger();
	const headings = Array.from(body.matchAll(regXHeader)).map(({ groups }) => {
		const flag = groups?.flag;
		const content = groups?.content!;
		return {
			level: flag?.length!,
			text: content,
			slug: slugger.slug(content),
		};
	});

	return headings;
}

// Based on https://maxleiter.com/blog/build-a-blog-with-nextjs-13#fetching-your-posts
export const getPosts = cache(async (): Promise<Post[]> => {
	const postFiles = await fs.readdir(POSTS_DIR);

	return await Promise.all(
		postFiles
			.filter((post) => post.endsWith(".mdx"))
			.map(async (post) => {
				const postFile = path.join(POSTS_DIR, post);
				const postContents = await fs.readFile(postFile, "utf-8");
				const { content, data } = matter(postContents);

				const meta: PostMeta = postMetaValidator.parse(data);

				const slug = post.replace(/\.mdx$/, "");

				return {
					...meta,
					slug,
					body: content,
					headings: resolveHeadings(content),
					timeToRead: calculateReadingTime(content),
					url: `/blog/posts/${slug}`,
				};
			})
	);
});

export async function getPost(slug: string): Promise<Post | undefined> {
	const postFile = path.join(POSTS_DIR, `${slug}.mdx`);

	try {
	       const postContents = await fs.readFile(postFile, "utf-8");
	       const { content, data } = matter(postContents);

	       const meta: PostMeta = postMetaValidator.parse(data);

	       return {
	               ...meta,
	               slug,
	               body: content,
	               headings: resolveHeadings(content),
	               timeToRead: calculateReadingTime(content),
	               url: `/blog/posts/${slug}`,
	       };
	} catch (err: any) {
	       if (err && err.code === "ENOENT") {
	               return undefined;
	       }
	       throw err;
	}
}
