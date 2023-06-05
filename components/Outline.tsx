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
		<div className="flex flex-col space-y-1">
			<a
				href={`#${node.slug}`}
				className={`pl-2 text-sm ${
					isActive &&
					"rounded-sm border-l-4 border-gray-600 bg-gray-800/10  dark:border-gray-400 dark:bg-gray-500/20"
				} line-clamp-1 text-ellipsis text-gray-600 hover:underline dark:text-gray-400`}
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
			<h3 className="mb-2 flex flex-col text-lg font-bold">
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
