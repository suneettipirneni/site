import { HeroText } from "@/components/HeroText";
import { BlogEntry } from "@/components/post/Card";
import { Title } from "@/components/Title";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { FiLoader } from "react-icons/fi";

export const metadata: Metadata = {
	title: "Thunk - A Blog",
	description:
		"A set of written entries with varying amounts of quality, and ranging topics. I write about things I find useful, interesting, or just want to share (usually in the domain of software). If you find anything that seems off or incorrect, I'm open to PRs.",
};

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
	const sortedPosts = allPosts
		.filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
		.sort((a, b) => {
			return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
		});

	const featuredPosts = sortedPosts.filter((post) => post.featured);

	return (
		<div
			className={`mx-auto flex w-full max-w-postcontent flex-col space-y-4 overflow-y-auto px-3 py-3 md:px-0 md:py-7 md:pb-10`}
		>
			<div className="mb-7 flex flex-col gap-y-3">
				<HeroText className="flex items-center gap-x-2">
					<FiLoader className="slow-spin" /> Thunk
				</HeroText>
				<div className="mb-3 h-[4px] w-[25%] min-w-[130px] bg-black dark:bg-white md:mb-4" />
				<p className="text-gray-500 dark:text-white/50 md:text-lg">
					A set of written entries with varying amounts of quality, and ranging
					topics. I write about things I find useful, interesting, or just want
					to share (usually in the domain of software). If you find anything
					that seems off or incorrect, feel free to open a PR/issue on github or
					DM me.
				</p>
			</div>

			<Title className="font-bold">Featured</Title>
			<div className="h-[1px] w-auto border-b border-gray-200 dark:border-gray-200/20 md:hidden" />
			<PostSection className="grid grid-cols-1 md:grid-cols-2">
				{featuredPosts.map((entry) => (
					<BlogEntry key={entry.title} post={entry} />
				))}
			</PostSection>

			<Title className="font-bold">Other Posts</Title>
			<div className="left-0 h-[1px] w-auto border-b border-gray-200 dark:border-gray-200/20 md:hidden" />
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
