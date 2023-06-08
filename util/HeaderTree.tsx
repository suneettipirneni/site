/**
 * Represents the data for a heading element.
 */
export interface HeadingData {
	/**
	 * The level of the heading element.
	 */
	level: number;
	/**
	 * The text content of the heading element.
	 */
	text: string;
	/**
	 * The slug for the heading element.
	 */
	slug: string;
}

/**
 * Represents the data for a heading node.
 */
export interface HeadingNode extends HeadingData {
	/**
	 * The children of the heading node.
	 */
	children: HeadingNode[];
}

/**
 * Serializes an array of heading data into a tree structure of heading nodes.
 * @param headings The array of heading data to serialize.
 * @returns The tree structure of heading nodes.
 */
export function serializeHeadings(headings: HeadingData[]): HeadingNode[] {
	// Initialize an empty array to hold the root nodes of the tree.
	const tree: HeadingNode[] = [];
	// Initialize an empty array to hold the nodes that are currently open.
	const stack: HeadingNode[] = [];

	// Iterate over each heading in the array.
	for (const heading of headings) {
		// Create a new node for the current heading.
		const node: HeadingNode = {
			level: heading.level,
			text: heading.text,
			slug: heading.slug,
			children: [],
		};

		// Close any nodes that are deeper than the current node.
		while (stack.length > 0 && stack[stack.length - 1].level >= node.level) {
			stack.pop();
		}

		// Add the current node to the tree.
		if (stack.length === 0) {
			tree.push(node);
		} else {
			stack[stack.length - 1].children.push(node);
		}

		// Add the current node to the stack.
		stack.push(node);
	}

	// Return the root nodes of the tree.
	return tree;
}
