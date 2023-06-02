import GithubSlugger from "github-slugger";
import { defineDocumentType, makeSource } from "@contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypePrettyCodeOptions } from "./rehype/options/rehypePrettyCodeOptions";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { inlineCodePlugin } from "./rehype/plugins/inlineCode";
import { rehypeAutolinkHeadingsOptions } from "./rehype/options/rehypeAutoLinkHeadingsOptions";

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
    blurDataURL: { type: "string", required: false },
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
      [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
      remarkGfm,
    ],
  },
});
