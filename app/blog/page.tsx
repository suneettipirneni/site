"use client";

import { BinarySpinnerIcon } from "@/components/BinarySpinner";
import { FilterBar } from "@/components/FilterBar";
import { HeroText } from "@/components/HeroText";
import { BlogEntry } from "@/components/post/Card";
import { useFilteredTags } from "@/hooks/useSelectedTags";
import { ALL_TAGS } from "@/util/constants";
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
	const [selectedTags] = useFilteredTags();

	const isFiltered = selectedTags.length > 0;

	const sortedPosts = allPosts
		.filter(
			(post) =>
				(process.env.NODE_ENV !== "production" || !post.draft) &&
				(!selectedTags.length ||
					post.tags.some((tag) => selectedTags.includes(tag)))
		)
		.sort((a, b) => {
			return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
		});

	const featuredPosts = isFiltered
		? []
		: sortedPosts.filter((post) => post.featured);
	const regularPosts = sortedPosts.filter(
		(post) => !post.featured || isFiltered
	);

	return (
		<div
			className={`mx-auto flex w-full max-w-postcontent flex-col space-y-4 overflow-y-auto px-3 py-3 md:px-0 md:py-7 md:pb-10`}
		>
			<div className="mb-14 flex flex-col items-start gap-y-3 ">
				<HeroText className="mb-5 flex shrink items-center gap-x-4">
					<BinarySpinnerIcon className="slow-spin" /> Thunk Tank
				</HeroText>
				<p className="text-gray-500 dark:text-white/50 md:text-lg">
					A set of written entries with varying amounts of quality, and ranging
					topics. I write about things I find useful, interesting, or just want
					to share (usually in the domain of software).
				</p>
			</div>
			<FilterBar className="!mb-5 w-full" tags={ALL_TAGS} />

			{featuredPosts.length > 0 && (
				<>
					<div className="h-[1px] w-auto border-b border-gray-200 dark:border-gray-200/20 md:hidden" />
					<PostSection className="grid grid-cols-1 md:grid-cols-2">
						{featuredPosts.map((entry) => (
							<BlogEntry key={entry.title} post={entry} />
						))}
					</PostSection>
				</>
			)}

			{regularPosts.length > 0 && (
				<>
					<div className="left-0 h-[1px] w-auto border-b border-gray-200 dark:border-gray-200/20 md:hidden" />
					<PostSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{regularPosts.map((entry) => (
							<BlogEntry key={entry.title} post={entry} />
						))}
					</PostSection>{" "}
				</>
			)}
		</div>
	);
}
