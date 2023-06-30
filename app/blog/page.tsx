import { BlogEntry } from "@/components/post/Card";
import { Title } from "@/components/Title";
import { allPosts } from "contentlayer/generated";

function PostSection({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={`gap-x-5 gap-y-7 md:gap-y-10 ${className}`}>{children}</div>
	);
}

export default function BlogPostsPage() {
	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
	});

	const featuredPosts = sortedPosts.filter((post) => post.featured);

	return (
		<div
			className={`mx-auto flex w-full max-w-postcontent flex-col space-y-4 overflow-y-auto px-3 py-3 md:px-0 md:py-7 md:pb-10`}
		>
			<Title>Featured</Title>
			<div className="h-[1px] w-auto border-b border-gray-200 dark:border-gray-200/20" />
			<PostSection className="grid grid-cols-1 md:grid-cols-2">
				{featuredPosts.map((entry) => (
					<BlogEntry key={entry.title} post={entry} />
				))}
			</PostSection>

			<Title>Other Posts</Title>
			<div className="left-0 h-[1px] w-auto border-b border-gray-200 dark:border-gray-200/20" />
			<PostSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
				{sortedPosts
					.filter((entry) => !entry.featured)
					.map((entry) => (
						<BlogEntry key={entry.title} post={entry} />
					))}
			</PostSection>
		</div>
	);
}
