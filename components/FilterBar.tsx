"use client";

import { useFilteredTags } from "@/hooks/useSelectedTags";
import { RxCross1 } from "react-icons/rx";
import { ReactNode, useState } from "react";

export interface FilterBarProps {
	className?: string;
	tags: string[];
}

function TagButton({
	tag,
	selected = false,
	onClick,
}: {
	tag: ReactNode;
	selected?: boolean;
	onClick?: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className={`flex max-h-[30px] items-center text-ellipsis whitespace-nowrap rounded-full transition-colors ${
				selected
					? "bg-black text-white dark:bg-white dark:text-black"
					: "bg-black/5 dark:bg-white/10"
			} px-3 py-1 text-sm font-semibold`}
		>
			{tag}
		</button>
	);
}

export function FilterBar({ tags, className = "" }: FilterBarProps) {
	const [selectedTags, setSelectedTags] = useFilteredTags();
	const [shouldFadeLeft, setShouldFadeLeft] = useState(false);

	const onTagClick = (tag: string) => {
		if (selectedTags.includes(tag)) {
			setSelectedTags(selectedTags.filter((t) => t !== tag));
			return;
		}

		setSelectedTags([...selectedTags, tag]);
	};

	const onScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const target = e.target as HTMLDivElement;
		const scrollLeft = target.scrollLeft;

		if (scrollLeft > 0) {
			setShouldFadeLeft(true);
			return;
		}

		setShouldFadeLeft(false);
	};

	return (
		<div className={`flex items-center justify-between gap-x-4 ${className}`}>
			<div
				className={`${
					shouldFadeLeft ? "fade-x" : "fade-right"
				} flex grow gap-x-2 gap-y-2 overflow-x-auto pr-5`}
				onScroll={onScroll}
			>
				{tags.map((tag) => (
					<TagButton
						key={tag}
						tag={tag}
						selected={selectedTags.includes(tag)}
						onClick={() => onTagClick(tag)}
					/>
				))}
			</div>
			{selectedTags.length > 0 && (
				<TagButton
					onClick={() => setSelectedTags([])}
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
