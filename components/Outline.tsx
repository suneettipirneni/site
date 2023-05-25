import type { HeadingNode } from "@/util/HeaderTree";

export interface OutlineProps {
  headings: HeadingNode[];
  className?: string;
}

export interface OutlineNodeProps {
  node: HeadingNode;
}

export function OutlineNode({ node }: OutlineNodeProps) {
  return (
    <div className="flex flex-col space-y-1">
      <a
        href={`#${node.slug}`}
        className="text-sm line-clamp-1 text-gray-600 dark:text-gray-400 text-ellipsis hover:underline"
      >
        {node.text}
      </a>
      <div className="flex flex-col">
        {node.children.map((child) => (
          <div className="ml-3" key={child.slug}>
            <OutlineNode node={child} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Outline({ headings, className }: OutlineProps) {
  return (
    <div className={className}>
      <h3 className="flex flex-col font-bold mb-2 text-lg">
        Table of Contents
      </h3>
      {headings.map((heading) => (
        <OutlineNode key={heading.slug} node={heading} />
      ))}
    </div>
  );
}
