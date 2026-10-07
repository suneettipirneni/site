import { BlogPostBrowser } from "@/components/blog/BlogPostBrowser";
import { PostCard } from "@/components/blog/PostCard";
import { getPosts } from "@/lib/post";

export const ensureStatic = "navigation";

export const metadata = {
	title: "Blog — Suneet Tipirneni",
	description: "Notes on software, systems, and things I’m learning.",
};

export default function BlogPostsPage() {
	const posts = getPosts()
		.filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
		.toSorted((a, b) => b.datetime.getTime() - a.datetime.getTime())
		.map((post) => ({
			slug: post.slug,
			tags: post.tags,
			card: <PostCard post={post} />,
		}));

	return (
		<div className="blog-index">
			<header className="blog-index-header">
				<h1 className="post-title">Blog</h1>
				<p className="post-description">
					Notes on software, systems, and things I’m learning.
				</p>
			</header>
			<BlogPostBrowser posts={posts} />
		</div>
	);
}
