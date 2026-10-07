import Link from "next/link";
import Image from "next/image";
import { Tags } from "./Tag";
import { DateTime } from "./DateTime";
import { getPostTransitionStyle } from "@/lib/blog-transition";
import type { Post } from "@/lib/post";
import { HiArrowRight } from "react-icons/hi2";

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
	return (
		<article className="blog-post-card">
			<div className="flex flex-wrap items-center justify-between gap-3 text-muted-foreground">
				<DateTime datetime={post.datetime} timeToRead={post.timeToRead} />
			</div>
			<div className="post-card-preview">
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
				<Link href={post.url} prefetch={true} aria-label={`Read ${post.title}`}>
					<Image
						src={post.headingImage}
						alt=""
						width={320}
						height={160}
						className="post-card-image"
						style={getPostTransitionStyle(post.slug, "image")}
						preload={index === 0}
						sizes="(min-width: 640px) 160px, (min-width: 360px) 112px, 88px"
					/>
				</Link>
			</div>
			<p style={getPostTransitionStyle(post.slug, "description")}>
				{post.description}
			</p>
			<div className="post-card-tags">
				<Tags tags={post.tags} />
			</div>
		</article>
	);
}
