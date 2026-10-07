import Link from "next/link";
import { Tags } from "./Tag";
import { DateTime } from "./DateTime";
import { getPostTransitionStyle } from "@/lib/blog-transition";
import type { Post } from "@/lib/post";
import { HiArrowRight } from "react-icons/hi2";

export function PostCard({ post }: { post: Post }) {
	return (
		<article className="blog-post-card">
			<div className="flex flex-wrap items-center justify-between gap-3 text-muted-foreground">
				<DateTime
					datetime={post.datetime}
					timeToRead={post.timeToRead}
					transitionSlug={post.slug}
				/>
			</div>
			<h3>
				<Link href={post.url} prefetch={true} className="post-card-link">
					<span
						className="block min-w-0"
						style={getPostTransitionStyle(post.slug, "title")}
					>
						{post.title}
					</span>
					<HiArrowRight className="h-[1lh] w-4 shrink-0" aria-hidden="true" />
				</Link>
			</h3>
			<p style={getPostTransitionStyle(post.slug, "description")}>
				{post.description}
			</p>
			<div className="post-card-tags">
				<Tags tags={post.tags} transitionSlug={post.slug} />
			</div>
		</article>
	);
}
