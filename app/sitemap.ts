import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";
import { BASE_URL } from "@/util/constants";

export default function sitemap(): MetadataRoute.Sitemap {
	const blogs = allPosts.map((post) => ({
		url: `${BASE_URL}/blog/posts/${post.slug}`,
		lastModified: post.datetime,
	}));

	const routes = ["", "/projects", "/blog"].map((route) => ({
		url: `${BASE_URL}${route}`,
		lastModified: new Date().toISOString(),
	}));

	return [...blogs, ...routes];
}
