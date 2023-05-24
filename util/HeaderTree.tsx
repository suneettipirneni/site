export interface HeadingData {
  level: number;
  text: string;
  slug: string;
}

export interface HeadingNode {
  level: number;
  text: string;
  slug: string;
  children: HeadingNode[];
}

export function serializeHeadings(headings: HeadingData[]): HeadingNode[] {
  const tree: HeadingNode[] = [];
  const stack: HeadingNode[] = [];

  for (const heading of headings) {
    const node: HeadingNode = {
      level: heading.level,
      text: heading.text,
      slug: heading.slug,
      children: [],
    };

    while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      tree.push(node);
    } else {
      stack[stack.length - 1].children.push(node);
    }

    stack.push(node);
  }

  return tree;
}
