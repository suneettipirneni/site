import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";

export default function NotFound() {
	return (
		<div className="blog-index blog-not-found">
			<p className="type-caption text-muted-foreground">404</p>
			<h1 className="post-title">Post not found</h1>
			<p className="post-description">
				The requested post does not exist or is no longer available.
			</p>
			<Link href="/blog" className="post-back mt-8">
				<HiArrowLeft className="size-4" aria-hidden="true" />
				Back to blog
			</Link>
		</div>
	);
}
