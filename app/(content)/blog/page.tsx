import { BinarySpinnerIcon } from "@/components/BinarySpinner";
import { FilterBar } from "@/components/blog/FilterBar";
import { HeroText } from "@/components/HeroText";
import { PostCard } from "@/components/blog/PostCard";
import { ALL_TAGS } from "@/util/constants";
import { allPosts } from "contentlayer/generated";

export const metadata = {
	title: "Thunk Tank - A Blog",
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
		<div className={`gap-x-7 gap-y-7 md:gap-y-10 ${className}`}>{children}</div>
	);
}

interface BlogPostsSearchParams {
	tags?: string | string[];
}

export default function BlogPostsPage({
	searchParams: { tags },
}: {
	searchParams: BlogPostsSearchParams;
}) {
	const selectedTags = tags ? (Array.isArray(tags) ? tags : [tags]) : [];

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
			className={`mx-auto flex w-full max-w-[850px] flex-col space-y-4 overflow-y-auto px-3 py-3 md:space-y-6 md:px-0 md:py-7 md:pb-10`}
		>
			<div className="mb-3 flex flex-col items-start gap-y-3 md:mb-7 ">
				<HeroText className="mb-5 flex shrink items-center gap-x-2 md:gap-x-4">
					<BinarySpinnerIcon className="slow-spin" /> Thunk Tank
				</HeroText>
				<p className="text-gray-500 dark:text-white/50 md:text-lg">
					A set of written entries with varying amounts of quality, and ranging
					topics. I write about things I find useful, interesting, or just want
					to share (usually in the domain of software).
				</p>
			</div>

			<FilterBar
				className="!mb-1 w-full"
				tags={ALL_TAGS}
				selectedTags={selectedTags}
			/>

			<div className="flex flex-col gap-y-8 md:gap-y-8 xl:gap-y-10">
				{featuredPosts.length > 0 && (
					<PostSection className="grid grid-cols-1 divide-y dark:divide-gray-200/25 md:grid-cols-2 md:divide-none">
						{featuredPosts.map((entry) => (
							<PostCard key={entry.title} post={entry} />
						))}
					</PostSection>
				)}

				{regularPosts.length > 0 && (
					<PostSection className="flex flex-col !gap-y-4 divide-y dark:divide-gray-200/25 md:!gap-y-3 md:divide-none">
						{regularPosts.map((entry) => (
							<PostCard compact key={entry.title} post={entry} />
						))}
					</PostSection>
				)}
			</div>
		</div>
	);
}
