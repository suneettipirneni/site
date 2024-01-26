import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";
import { getPosts } from "@/lib/post";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const blogs = (await getPosts()).map((post) => ({
		url: `${BASE_URL}/blog/posts/${post.slug}`,
		lastModified: post.datetime.toISOString().split("T")[0],
	}));

	const routes = ["", "/projects", "/blog"].map((route) => ({
		url: `${BASE_URL}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes, ...blogs];
}
