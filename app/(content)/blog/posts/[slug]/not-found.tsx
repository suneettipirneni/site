import Link from "next/link";
import {
	EntranceItem,
	StaggeredEntrance,
} from "@/components/motion/StaggeredEntrance";
import { HiArrowLeft } from "react-icons/hi2";

export default function NotFound() {
	return (
		<div className="site-content-grid min-h-[calc(100dvh-var(--site-nav))] w-full">
			<StaggeredEntrance className="p-[var(--site-panel)]">
				<EntranceItem>
					<p className="type-page-title" aria-hidden="true">
						404
					</p>
				</EntranceItem>
			</StaggeredEntrance>
			<StaggeredEntrance className="flex flex-col justify-center gap-3 p-[var(--site-panel)]">
				<EntranceItem>
					<h1 className="type-page-title">Post not found</h1>
				</EntranceItem>
				<EntranceItem>
					<p className="type-body max-w-[55ch] text-muted-foreground">
						The requested post does not exist or is no longer available.
					</p>
				</EntranceItem>
				<EntranceItem className="max-w-xs pt-3">
					<Link
						href="/blog"
						transitionTypes={["nav-back"]}
						className="type-body-small flex min-h-[var(--site-row-sm)] items-center justify-between text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
					>
						<span>Back to blog</span>
						<HiArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
					</Link>
				</EntranceItem>
			</StaggeredEntrance>
		</div>
	);
}
