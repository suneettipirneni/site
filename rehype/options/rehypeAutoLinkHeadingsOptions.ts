import { s } from "hastscript";
import type { Options } from "rehype-autolink-headings";

export const rehypeAutolinkHeadingsOptions: Options = {
	behavior: "append",
	properties: {
		class: "autolink-header hidden group-hover:inline-block",
		ariaHidden: true,
		tabIndex: -1,
	},
	content: [
		s(
			"span",
			{
				xmlns: "http://www.w3.org/2000/svg",
				width: 24,
				height: 24,
				fill: "currentColor",
				viewBox: "0 0 24 24",
			},
			"#"
		),
	],
};
