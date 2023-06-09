import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";
import { BASE_URL } from "@/util/constants";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: BASE_URL,
			lastModified: new Date(),
		},
		{
			url: `${BASE_URL}/projects`,
			lastModified: new Date(),
		},
		{
			url: `${BASE_URL}/blog`,
			lastModified: new Date(),
		},
		...allPosts.map((post) => ({
			url: `${BASE_URL}/blog/posts/${post.slug}`,
			lastModified: new Date(),
		})),
	];
}
