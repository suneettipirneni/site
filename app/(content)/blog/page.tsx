import { PostCard } from "@/components/blog/PostCard";
import { getPosts } from "@/lib/post";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
	title: "Blog — Suneet Tipirneni",
	description: "Notes on software, systems, and things I’m learning.",
};

interface BlogPostsSearchParams {
	tags?: string | string[];
}

export default function BlogPostsPage({
	searchParams,
}: {
	searchParams: Promise<BlogPostsSearchParams>;
}) {
	return (
		<div className="blog-index">
			<header className="blog-index-header">
				<h1 className="post-title">Blog</h1>
				<p className="post-description">
					Notes on software, systems, and things I’m learning.
				</p>
			</header>
			<Suspense fallback={<BlogFiltersSkeleton />}>
				<BlogFilters searchParams={searchParams} />
			</Suspense>
			<section aria-label="Posts" className="blog-post-list">
				<header className="blog-list-heading">
					<h2>Latest posts</h2>
					<Suspense fallback={<PostCountSkeleton />}>
						<PostCount searchParams={searchParams} />
					</Suspense>
				</header>
				<Suspense fallback={<BlogPostsSkeleton />}>
					<BlogPostList searchParams={searchParams} />
				</Suspense>
			</section>
		</div>
	);
}

function getSelectedTags(params: BlogPostsSearchParams) {
	return Array.isArray(params.tags)
		? params.tags
		: params.tags
			? [params.tags]
			: [];
}

async function getPublishedPosts() {
	return (await getPosts())
		.filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
		.toSorted(
			(a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
		);
}

async function getBlogView(searchParams: Promise<BlogPostsSearchParams>) {
	const [publishedPosts, params] = await Promise.all([
		getPublishedPosts(),
		searchParams,
	]);
	const selectedTags = getSelectedTags(params);
	const visiblePosts = selectedTags.length
		? publishedPosts.filter((post) =>
				selectedTags.every((tag) => post.tags.includes(tag)),
			)
		: publishedPosts;

	return { publishedPosts, selectedTags, visiblePosts };
}

async function BlogFilters({
	searchParams,
}: {
	searchParams: Promise<BlogPostsSearchParams>;
}) {
	const { publishedPosts, selectedTags } = await getBlogView(searchParams);
	const tags = [
		...new Set(publishedPosts.flatMap((post) => post.tags)),
	].toSorted();

	const links = (
		<nav aria-label="Filter posts" className="blog-filters">
			<Link
				href="/blog"
				scroll={false}
				aria-current={selectedTags.length === 0 ? "page" : undefined}
				className="blog-filter"
			>
				<span>All posts</span>
				<span className="blog-topic-count">{publishedPosts.length}</span>
			</Link>
			{tags.map((tag) => {
				const active = selectedTags.includes(tag);
				const href = active
					? "/blog"
					: `/blog?${new URLSearchParams({ tags: tag })}`;
				return (
					<Link
						key={tag}
						href={href}
						scroll={false}
						aria-current={active ? "page" : undefined}
						className="blog-filter"
					>
						<span>{tag}</span>
						<span className="blog-topic-count">
							{publishedPosts.filter((post) => post.tags.includes(tag)).length}
						</span>
					</Link>
				);
			})}
		</nav>
	);
	return (
		<>
			<details className="blog-topics-mobile">
				<summary>
					<span>Topics</span>
					<span className="blog-selected-topic">
						{selectedTags.join(", ") || "All posts"}
					</span>
					<span aria-hidden="true" className="blog-topics-chevron">
						⌄
					</span>
				</summary>
				{links}
			</details>
			<aside className="blog-topics-rail">
				<h2>Topics</h2>
				{links}
			</aside>
		</>
	);
}

async function PostCount({
	searchParams,
}: {
	searchParams: Promise<BlogPostsSearchParams>;
}) {
	const { visiblePosts } = await getBlogView(searchParams);

	return (
		<span className="type-caption text-muted-foreground tabular-nums">
			{visiblePosts.length} {visiblePosts.length === 1 ? "post" : "posts"}
		</span>
	);
}

async function BlogPostList({
	searchParams,
}: {
	searchParams: Promise<BlogPostsSearchParams>;
}) {
	const { visiblePosts } = await getBlogView(searchParams);

	return visiblePosts.length ? (
		visiblePosts.map((post, index) => (
			<PostCard key={post.slug} post={post} index={index} />
		))
	) : (
		<div className="p-[var(--site-panel)]">
			<h2 className="type-section-title">No posts in this category yet.</h2>
			<Link
				href="/blog"
				className="type-body-small mt-3 inline-flex h-11 items-center underline underline-offset-4"
			>
				View all posts
			</Link>
		</div>
	);
}

function BlogFiltersSkeleton() {
	return (
		<div className="blog-topics-loading" aria-label="Loading filters">
			{Array.from({ length: 5 }).map((_, index) => (
				<div
					key={index}
					className="flex min-h-[var(--site-row-sm)] items-center"
					aria-hidden="true"
				>
					<div className="h-3 w-24 bg-muted" />
				</div>
			))}
		</div>
	);
}

function PostCountSkeleton() {
	return (
		<span
			className="type-caption h-3 w-12 bg-muted"
			aria-label="Loading post count"
		/>
	);
}

function BlogPostsSkeleton() {
	return (
		<div aria-label="Loading posts">
			{Array.from({ length: 5 }).map((_, index) => (
				<div key={index} className="blog-post-card min-h-36" aria-hidden="true">
					<div className="h-5 w-1/3 bg-muted" />
					<div className="mt-3 h-4 w-2/3 bg-muted" />
				</div>
			))}
		</div>
	);
}
