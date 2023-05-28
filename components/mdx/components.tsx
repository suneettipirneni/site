import { MDXComponents } from "mdx/types";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { Footer } from "./Footer";
import { Image } from "./Image";
import { Anchor } from "./Anchor";
import { List } from "./List";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeadingCell,
  TableRow,
} from "./Table";
import { InfoBlock } from "./InfoBlock";
import { BlockQuote } from "./BlockQuote";
import { Figure } from "./Figure";

export const mdxComponents: MDXComponents = {
  h1: (props) => <Heading level={1} {...props} />,
  h2: (props) => <Heading level={2} {...props} />,
  h3: (props) => <Heading level={3} {...props} />,
  h4: (props) => <Heading level={4} {...props} />,
  h5: (props) => <Heading level={5} {...props} />,
  h6: (props) => <Heading level={6} {...props} />,
  p: (props) => <Paragraph {...props} />,
  footer: (props) => <Footer {...props} />,
  Image,
  a: (props) => <Anchor {...props} />,
  ul: (props) => <List {...props} />,
  ol: (props) => <List ordered {...props} />,
  table: (props) => <Table {...props} />,
  thead: (props) => <TableHeader {...props} />,
  th: (props) => <TableHeadingCell {...props} />,
  tr: (props) => <TableRow {...props} />,
  td: (props) => <TableCell {...props} />,
  tbody: (props) => <TableBody {...props} />,
  InfoBlock: (props) => <InfoBlock {...props} />,
  blockquote: (props) => <BlockQuote {...props} />,
  Figure,
};
