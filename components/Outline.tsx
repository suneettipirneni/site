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
		<div className="flex flex-col space-y-2">
			<a
				href={`#${node.slug}`}
				className={`text-sm ${
					isActive
						? "rounded-sm  border-gray-600 font-bold  dark:border-gray-400 "
						: "text-gray-600 dark:text-gray-400"
				} line-clamp-1 text-ellipsis  hover:underline `}
			>
				{node.text}
			</a>
			<div className="flex flex-col">
				{node.children.map((child) => (
					<div className="ml-3" key={child.slug}>
						<OutlineNode node={child} activeSlug={activeSlug} />
					</div>
				))}
			</div>
		</div>
	);
});

export function Outline({ headings, className }: OutlineProps) {
	const activeSlug = useActiveSlug(headings);

	return (
		<div className={className}>
			<h3 className="mb-2 flex flex-col text-xl font-bold">
				Table of Contents
			</h3>
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
