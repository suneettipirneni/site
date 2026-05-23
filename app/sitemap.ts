import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";
import { getPosts } from "@/lib/post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getPosts();
	const latestPostDate = posts
		.map((post) => post.datetime)
		.sort((a, b) => b.getTime() - a.getTime())[0];

	const blogs = posts.map((post) => ({
		url: `${BASE_URL}/blog/posts/${post.slug}`,
		lastModified: post.datetime.toISOString().split("T")[0],
	}));

	const routes = ["", "/work", "/blog"].map((route) => ({
		url: `${BASE_URL}${route}`,
		lastModified: latestPostDate?.toISOString().split("T")[0],
	}));

	return [...routes, ...blogs];
}
