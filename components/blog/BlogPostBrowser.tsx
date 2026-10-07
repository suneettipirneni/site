"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
	Fragment,
	Suspense,
	useLayoutEffect,
	useState,
	type ReactNode,
} from "react";

export interface BlogPostEntry {
	slug: string;
	tags: string[];
	card: ReactNode;
}

export function BlogPostBrowser({ posts }: { posts: BlogPostEntry[] }) {
	const [query, setQuery] = useState("");
	const selectedTags = new URLSearchParams(query)
		.getAll("tags")
		.filter(Boolean);

	return (
		<>
			<Suspense fallback={null}>
				<BlogQuerySync onChange={setQuery} />
			</Suspense>
			<BlogPostView posts={posts} selectedTags={selectedTags} />
		</>
	);
}

function BlogQuerySync({ onChange }: { onChange: (query: string) => void }) {
	const query = useSearchParams().toString();
	// Keep URL-dependent hydration isolated so the static cards are never remounted.
	useLayoutEffect(() => onChange(query), [query, onChange]);
	return null;
}

function BlogPostView({
	posts,
	selectedTags,
}: {
	posts: BlogPostEntry[];
	selectedTags: string[];
}) {
	const visiblePosts = selectedTags.length
		? posts.filter((post) =>
				selectedTags.every((tag) => post.tags.includes(tag)),
			)
		: posts;

	return (
		<>
			<BlogFilters posts={posts} selectedTags={selectedTags} />
			<section aria-label="Posts" className="blog-post-list">
				<header className="blog-list-heading">
					<h2>Latest posts</h2>
					<span
						className="type-caption text-muted-foreground tabular-nums"
						aria-live="polite"
					>
						{visiblePosts.length} {visiblePosts.length === 1 ? "post" : "posts"}
					</span>
				</header>
				{visiblePosts.length ? (
					visiblePosts.map((post) => (
						<Fragment key={post.slug}>{post.card}</Fragment>
					))
				) : (
					<div className="p-[var(--site-panel)]">
						<h2 className="type-section-title">
							No posts in this category yet.
						</h2>
						<Link
							href="/blog"
							scroll={false}
							className="type-body-small mt-3 inline-flex h-11 items-center underline underline-offset-4"
						>
							View all posts
						</Link>
					</div>
				)}
			</section>
		</>
	);
}

function BlogFilters({
	posts,
	selectedTags,
}: {
	posts: BlogPostEntry[];
	selectedTags: string[];
}) {
	const tags = [...new Set(posts.flatMap((post) => post.tags))].toSorted();

	const links = (
		<nav aria-label="Filter posts" className="blog-filters">
			<Link
				href="/blog"
				scroll={false}
				aria-current={selectedTags.length === 0 ? "page" : undefined}
				className="blog-filter"
			>
				<span>All posts</span>
				<span className="blog-topic-count">{posts.length}</span>
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
							{posts.filter((post) => post.tags.includes(tag)).length}
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
