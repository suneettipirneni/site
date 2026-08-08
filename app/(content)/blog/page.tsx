import { PostCard } from "@/components/blog/PostCard";
import {
	EntranceItem,
	StaggeredEntrance,
} from "@/components/motion/StaggeredEntrance";
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
		<div className="site-content-grid min-h-[calc(100dvh-var(--site-nav))] w-full">
			<aside className="p-[var(--site-panel)] lg:sticky lg:top-[var(--site-nav)] lg:self-start">
				<StaggeredEntrance className="flex flex-col gap-5">
					<EntranceItem>
						<h1 className="type-page-title">Blog</h1>
					</EntranceItem>
					<EntranceItem>
						<p className="type-body text-muted-foreground">
							Notes on software, systems, and things I’m learning.
						</p>
					</EntranceItem>
					<EntranceItem>
						<section aria-labelledby="filters-heading">
							<h2 id="filters-heading" className="type-label">
								Filters
							</h2>
							<Suspense fallback={<BlogFiltersSkeleton />}>
								<BlogFilters searchParams={searchParams} />
							</Suspense>
						</section>
					</EntranceItem>
				</StaggeredEntrance>
			</aside>

			<section
				aria-label="Posts"
				className="mx-auto w-full min-w-0 max-w-[760px]"
			>
				<header className="flex min-h-[var(--site-row-lg)] items-center justify-between gap-4 px-[var(--site-panel)]">
					<h2 className="type-section-title">Writing</h2>
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
			(a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
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
				selectedTags.every((tag) => post.tags.includes(tag))
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

	return (
		<nav aria-label="Filter posts" className="mt-2 flex flex-col">
			<Link
				href="/blog"
				scroll={false}
				aria-current={selectedTags.length === 0 ? "page" : undefined}
				className="type-body-small flex min-h-[var(--site-row-sm)] items-center text-muted-foreground underline-offset-4 hover:text-foreground hover:underline aria-[current=page]:text-foreground aria-[current=page]:underline"
			>
				All posts
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
						className="type-body-small flex min-h-[var(--site-row-sm)] items-center capitalize text-muted-foreground underline-offset-4 hover:text-foreground hover:underline aria-[current=page]:text-foreground aria-[current=page]:underline"
					>
						{tag}
					</Link>
				);
			})}
		</nav>
	);
}

async function PostCount({
	searchParams,
}: {
	searchParams: Promise<BlogPostsSearchParams>;
}) {
	const { visiblePosts } = await getBlogView(searchParams);

	return (
		<span className="type-caption tabular-nums text-muted-foreground">
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
		<div className="mt-2 flex flex-col" aria-label="Loading filters">
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
				<div
					key={index}
					className="min-h-36 p-[var(--site-panel)]"
					aria-hidden="true"
				>
					<div className="h-5 w-1/3 bg-muted" />
					<div className="mt-3 h-4 w-2/3 bg-muted" />
				</div>
			))}
		</div>
	);
}
