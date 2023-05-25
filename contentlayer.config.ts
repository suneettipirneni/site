import GithubSlugger from "github-slugger";
import { defineDocumentType, makeSource } from "@contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypePrettyCodeOptions } from "./rehypeOptions";
import rehypeSlug from "rehype-slug";
import { visit } from "unist-util-visit";
import { Element, Text } from "hast";
import { Plugin } from "unified";
import { Node } from "unist-util-visit/lib";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { h, s } from "hastscript";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    featured: { type: "boolean", required: true },
    draft: { type: "boolean", required: true },
    author: { type: "string", required: true },
    slug: { type: "string", required: true },
    title: { type: "string", required: true },
    datetime: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    ogImage: { type: "string", required: true },
    description: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/posts/${post._raw.flattenedPath}`,
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level: flag?.length,
              text: content,
              slug: content ? slugger.slug(content) : undefined,
            };
          }
        );
        return headings;
      },
    },
  },
}));

// This logic was used from https://github.com/delbaoliveira/website/blob/187ed8ea3cd4b78122148227cd060666227be555/lib/rehyePrettyCode.ts
const inlineCodePlugin: Plugin = () => {
  // This check can disambiguate inline code against code within a codeblock
  // by checking the presence of data on the element. If the element contains data
  // it is in a codeblock, otherwise it is inline. Finally we check if the element
  // in question has a direct text child.

  const inlineBlockStyle =
    "py-[0.5px] px-1 bg-white/50 text-black dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md";

  const inlineCodePredicate = (node: Node) => {
    if (node.type !== "element") {
      return false;
    }

    const element = node as Element;

    return Boolean(
      element.tagName === "code" &&
        Object.keys(element.properties ?? []).length === 0 &&
        element.children.some((n: any) => n.type === "text")
    );
  };

  return (tree: Node) => {
    tree.type === "";
    visit(tree, inlineCodePredicate, (node: Node) => {
      const element = node as Element;

      const textNode = element.children.find(
        (node) => node.type === "text"
      ) as Element;

      if (!textNode) {
        return;
      }

      textNode.type = "element";
      textNode.tagName = "code";
      textNode.properties = { className: [inlineBlockStyle] };
      // @ts-expect-error
      textNode.children = [{ type: "text", value: textNode.value }];
      element.tagName = "span";
    });
  };
};

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      [rehypePrettyCode, rehypePrettyCodeOptions],
      rehypeSlug,
      inlineCodePlugin,
      remarkMath,
      rehypeKatex,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          properties: {
            class:
              "autolink-header hidden group-hover:inline-block absolute -ml-8",
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
        },
      ],
      remarkGfm,
    ],
  },
});
