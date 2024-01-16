import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";
import { BASE_URL } from "@/util/constants";

export default function sitemap(): MetadataRoute.Sitemap {
	const blogs = allPosts.map((post) => ({
		url: `${BASE_URL}/blog/posts/${post.slug}`,
		lastModified: post.datetime.split("T")[0],
	}));

	const routes = ["", "/projects", "/blog"].map((route) => ({
		url: `${BASE_URL}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...blogs, ...routes];
}
