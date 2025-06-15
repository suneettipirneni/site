import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center py-20">
			<h2 className="mb-4 text-2xl font-bold">Post not found</h2>
			<p className="mb-4 text-gray-600 dark:text-gray-300">
				We couldn't find the blog post you're looking for.
			</p>
			<Link href="/blog" className="text-blue-600 underline">
				Return to blog
			</Link>
		</div>
	);
}
