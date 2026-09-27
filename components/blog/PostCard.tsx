import Link from "next/link";
import { Tags } from "./Tag";
import { DateTime } from "./DateTime";
import { Post } from "@/lib/post";
import {
	EntranceItem,
	StaggeredEntrance,
} from "@/components/motion/StaggeredEntrance";
import { HiArrowRight } from "react-icons/hi2";

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
	return (
		<StaggeredEntrance delay={Math.min(index * 0.04, 0.24)}>
			<EntranceItem>
				<article className="blog-post-card">
					<div className="flex flex-wrap items-center justify-between gap-3 text-muted-foreground">
						<DateTime datetime={post.datetime} timeToRead={post.timeToRead} />
					</div>
					<h3>
						<Link href={post.url} className="post-card-link">
							<span className="min-w-0">{post.title}</span>
							<HiArrowRight
								className="h-[1lh] w-4 shrink-0"
								aria-hidden="true"
							/>
						</Link>
					</h3>
					<p>{post.description}</p>
					<div className="post-card-tags">
						<Tags tags={post.tags} />
					</div>
				</article>
			</EntranceItem>
		</StaggeredEntrance>
	);
}
