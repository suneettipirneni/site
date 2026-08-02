"use client";

import { useActiveSlug } from "@/hooks/activeSlug";
import type { HeadingNode } from "@/util/HeaderTree";
import { memo } from "react";

export interface OutlineProps {
	headings: HeadingNode[];
	className?: string;
	hideHeading?: boolean;
}

export interface OutlineNodeProps {
	node: HeadingNode;
	activeSlug: string;
	depth?: number;
}

export const OutlineNode = memo(function OutlineNode({
	node,
	activeSlug,
	depth = 0,
}: OutlineNodeProps) {
	const isActive = activeSlug === node.slug;

	return (
		<div className="flex flex-col">
			<a
				href={`#${node.slug}`}
				className={`type-caption flex min-h-[var(--site-row-xs)] w-full items-center truncate underline-offset-4 hover:underline ${
					isActive ? "font-medium text-foreground" : "text-muted-foreground"
				}`}
				style={{
					paddingInlineStart: `${0.5 + depth * 0.75}rem`,
				}}
			>
				{node.text}
			</a>
			{node.children.length > 0 ? (
				<div className="flex flex-col">
					{node.children.map((child) => (
						<div key={child.slug}>
							<OutlineNode
								node={child}
								activeSlug={activeSlug}
								depth={depth + 1}
							/>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
});

export function Outline({
	headings,
	className,
	hideHeading = false,
}: OutlineProps) {
	const activeSlug = useActiveSlug(headings);

	return (
		<div className={`flex flex-col ${className ?? ""}`}>
			{hideHeading ? null : (
				<h2 className="type-label text-muted-foreground">Outline</h2>
			)}
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
