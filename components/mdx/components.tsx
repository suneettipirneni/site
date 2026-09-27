import type { ComponentProps } from "react";
import { MDXComponents } from "mdx/types";
import { Image } from "./Image";
import { InfoBlock } from "./InfoBlock";
import { Figure } from "./Figure";
import { Quote } from "./Quote";

function MarkdownTable(props: ComponentProps<"table">) {
	return (
		<div
			className="typeset-scroll"
			role="group"
			aria-label="Scrollable table"
			tabIndex={0}
		>
			<table {...props} />
		</div>
	);
}

export const mdxComponents: MDXComponents = {
	table: MarkdownTable,
	Image,
	InfoBlock: (props) => <InfoBlock {...props} />,
	Figure,
	Quote: (props) => <Quote {...props} />,
};
