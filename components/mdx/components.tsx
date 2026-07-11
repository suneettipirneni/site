import { MDXComponents } from "mdx/types";
import { Image } from "./Image";
import { InfoBlock } from "./InfoBlock";
import { Figure } from "./Figure";

export const mdxComponents: MDXComponents = {
	Image,
	InfoBlock: (props) => <InfoBlock {...props} />,
	Figure,
};
