import { toText } from "hast-util-to-text";
import type { Options } from "rehype-autolink-headings";

export const rehypeAutolinkHeadingsOptions: Options = {
	behavior: "append",
	properties: (heading) => ({
		className: ["heading-anchor"],
		ariaLabel: `Link to ${toText(heading)}`,
	}),
	content: { type: "text", value: "#" },
};
