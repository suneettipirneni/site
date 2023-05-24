import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { serializeHeadings } from "@/util/HeaderTree";
import { Outline } from "@/components/Outline";
import { mdxComponents } from "@/components/mdx/components";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
  return { title: post.title };
};

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: "${params.slug}"`);

  const headings = serializeHeadings(post.headings);

  const MDXComponent = useMDXComponent(post.body.code);

  return (
    <article className="relative z-10 py-4 md:py-8 md:grid md:grid-rows(1fr, 100%, 1fr) md:grid-cols-[1fr_min(700px,100%)_1fr] gap-x-10">
      <div className="col-start-2">
        <Link
          href="/blog"
          className="text-xl font-medium flex flex-row items-center gap-2 md:my-10 my-5"
        >
          <FaArrowLeft />
          Back
        </Link>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            <Balancer>{post.title}</Balancer>
          </h1>
          <time
            dateTime={post.datetime}
            className="mb-1 text-sm text-gray-600 dark:text-gray-300"
          >
            {format(parseISO(post.datetime), "LLLL d, yyyy")}
          </time>
        </div>
      </div>
      <div className="md:col-start-2">
        <MDXComponent components={mdxComponents} />
      </div>
      <Outline
        className="lg:block sticky top-10 self-start hidden min-w-[200px]"
        headings={headings}
      />
    </article>
  );
}
