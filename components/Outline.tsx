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

export const OutlineNode = memo(({ node, activeSlug }: OutlineNodeProps) => {
  const isActive = activeSlug === node.slug;

  return (
    <div className="flex flex-col space-y-1">
      <a
        href={`#${node.slug}`}
        className={`text-sm ${
          isActive &&
          "border-l-4 border-gray-600 dark:border-gray-400 pl-2 text-md rounded-sm bg-gray-800/10 dark:bg-gray-500/20"
        } line-clamp-1 text-gray-600 dark:text-gray-400 text-ellipsis hover:underline`}
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
      <h3 className="flex flex-col font-bold mb-2 text-lg">
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
