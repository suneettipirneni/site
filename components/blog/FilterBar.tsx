import { RxCross1 } from "react-icons/rx";
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

export interface TagButtonProps {
	tag: ReactNode;
	selected?: boolean;
	href: string;
}

function TagButton({ tag, selected = false, href }: TagButtonProps) {
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
				{tags.map((tag) => (
					<TagButton
						key={tag}
						tag={tag}
						selected={selectedTags.includes(tag)}
						href={createTagHref(tag)}
					/>
				))}
			</FadedScroll>
			{selectedTags.length > 0 && (
				<TagButton
					href="/blog"
					tag={
						<span className="flex items-center gap-x-2">
							<RxCross1 /> Clear
						</span>
					}
				/>
			)}
		</div>
	);
}
