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
				<article className="p-[var(--site-panel)]">
					<div className="flex flex-wrap items-center justify-between gap-3 text-muted-foreground">
						<DateTime datetime={post.datetime} timeToRead={post.timeToRead} />
						<Tags tags={post.tags} />
					</div>
					<h3 className="type-card-title mt-3">
						<Link
							href={post.url}
							transitionTypes={["nav-forward"]}
							className="inline-flex items-start gap-2 underline decoration-transparent underline-offset-4 hover:decoration-current"
						>
							<span>{post.title}</span>
							<HiArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
						</Link>
					</h3>
					<p className="type-body-small mt-2 line-clamp-2 max-w-[65ch] text-muted-foreground">
						{post.description}
					</p>
				</article>
			</EntranceItem>
		</StaggeredEntrance>
	);
}
