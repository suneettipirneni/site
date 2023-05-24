/* eslint-disable jsx-a11y/alt-text */
import { MDXComponents } from "mdx/types";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { Footer } from "./Footer";
import { Image } from "./Image";
import { Anchor } from "./Anchor";
import { List } from "./List";
import { Table, TableCell, TableRow } from "./Table";
import { InfoBlock } from "./InfoBlock";

const headingSpacing = "mb-4 mt-7";

export const mdxComponents: MDXComponents = {
  h1: (props) => <Heading level={1} {...props} className={headingSpacing} />,
  h2: (props) => <Heading level={2} {...props} className={headingSpacing} />,
  h3: (props) => <Heading level={3} {...props} className={headingSpacing} />,
  h4: (props) => <Heading level={4} {...props} className={headingSpacing} />,
  h5: (props) => <Heading level={5} {...props} className={headingSpacing} />,
  h6: (props) => <Heading level={6} {...props} className={headingSpacing} />,
  p: (props) => <Paragraph {...props} />,
  footer: (props) => <Footer {...props} />,
  img: (props) => <Image alt="" {...props} />,
  a: (props) => <Anchor {...props} />,
  ul: (props) => <List {...props} />,
  table: (props) => <Table {...props} />,
  tr: (props) => <TableRow {...props} />,
  td: (props) => <TableCell {...props} />,
  InfoBlock: (props) => <InfoBlock {...props} />,
};
