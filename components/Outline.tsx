"use client";

import { useActiveSlug } from "@/hooks/activeSlug";
import type { HeadingNode } from "@/util/HeaderTree";
import { memo } from "react";

export interface OutlineProps {
	headings: HeadingNode[];
	className?: string;
}

export interface OutlineNodeProps {
	node: HeadingNode;
	activeSlug: string;
}

export const OutlineNode = memo(function OutlineNode({
	node,
	activeSlug,
}: OutlineNodeProps) {
	const isActive = activeSlug === node.slug;

	return (
		<div className="flex flex-col space-y-0.5">
			<a
				href={`#${node.slug}`}
				className={`w-auto self-start px-2 py-1 text-sm ${
					isActive
						? "rounded-md bg-gray-200/50 font-semibold dark:border-gray-400 dark:bg-white/[0.15]"
						: "text-gray-600 dark:text-gray-400/80"
				} line-clamp-1 text-ellipsis hover:underline `}
			>
				{node.text}
			</a>
			{node.children.length > 0 && (
				<div className="flex flex-col space-y-0.5">
					{node.children.map((child) => (
						<div className="ml-3" key={child.slug}>
							<OutlineNode node={child} activeSlug={activeSlug} />
						</div>
					))}
				</div>
			)}
		</div>
	);
});

export function Outline({ headings, className }: OutlineProps) {
	const activeSlug = useActiveSlug(headings);

	return (
		<div className={`space-y-0.5 ${className}`}>
			<h1 className="mb-3 ml-2 flex flex-col text-sm font-semibold">Outline</h1>
			{headings.map((heading) => (
				<OutlineNode
					key={heading.slug}
					node={heading}
					activeSlug={activeSlug}
				/>
			))}
		</div>
	);
}
