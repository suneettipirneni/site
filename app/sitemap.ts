import type { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";
import { BASE_URL } from "@/util/constants";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: BASE_URL,
		},
		{
			url: `${BASE_URL}/projects`,
		},
		{
			url: `${BASE_URL}/blog`,
		},
		...allPosts.map((post) => ({
			url: `${BASE_URL}/blog/posts/${post.slug}`,
		})),
	];
}
