import { type ReactNode, useCallback } from "react";
import Link from "next/link";
import { FadedScroll } from "../FadedScroll";

export interface FilterBarProps {
	className?: string;
	/**
	 * All of the tags that can be filtered.
	 */
	tags: string[];
	/**
	 * The tags that are currently selected.
	 * @defaultValue []
	 */
	selectedTags?: string[];
}

/**
 * A button that represents a selectable tag.
 */
export interface TagButtonProps {
	/**
	 * The tag name to be displayed.
	 */
	tagName: ReactNode;
	/**
	 * Whether or not the tag is selected.
	 * @defaultValue false
	 */
	selected?: boolean;
	/**
	 * The URL to be used for the tag.
	 */
	href: string;
}

function TagButton({ tagName: tag, selected = false, href }: TagButtonProps) {
	const selectedClassNames = selected
		? "bg-black text-white dark:bg-white dark:text-black"
		: "bg-black/5 dark:bg-white/10";

	return (
		<Link
			href={href}
			scroll={false}
			className={`flex max-h-[30px] items-center text-ellipsis whitespace-nowrap rounded-full transition-colors ${selectedClassNames} px-3 py-1 text-sm font-semibold`}
		>
			{tag}
		</Link>
	);
}

export function FilterBar({
	tags,
	className = "",
	selectedTags = [],
}: FilterBarProps) {
	/**
	 * Creates a URL with updated tags based on the selected tag.
	 * @param tag - The tag to be updated.
	 * @returns A URL with updated tags.
	 */
	const createTagHref = useCallback(
		(tag: string) => {
			const updatedTags = selectedTags.includes(tag)
				? selectedTags.filter((t) => t !== tag)
				: [...selectedTags, tag];

			const params = new URLSearchParams(
				updatedTags.map((tag) => ["tags", tag])
			);
			return `/blog?${params.toString()}`;
		},
		[selectedTags]
	);

	return (
		<div className={`flex items-center justify-between gap-x-4 ${className}`}>
			<FadedScroll
				className="flex grow gap-x-2 gap-y-2 overflow-x-auto pr-5"
				direction="horizontal"
			>
				<TagButton
					tagName="All Posts"
					selected={selectedTags.length === 0}
					href="/blog"
				/>
				{tags.map((tag) => (
					<TagButton
						key={tag}
						tagName={tag}
						selected={selectedTags.includes(tag)}
						href={createTagHref(tag)}
					/>
				))}
			</FadedScroll>
		</div>
	);
}
