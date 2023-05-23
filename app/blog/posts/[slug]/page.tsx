import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) throw new Error(`Post not found for slug: "${params.slug}"`);

  const MDXComponent = useMDXComponent(post.body.code);

  return (
    <article className="py-8">
      <Link
        href="/blog"
        className="text-xl font-medium flex flex-row items-center gap-2 my-10"
      >
        <FaArrowLeft />
        Back
      </Link>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <time dateTime={post.datetime} className="mb-1 text-sm text-gray-300">
          {format(parseISO(post.datetime), "LLLL d, yyyy")}
        </time>
      </div>
      <MDXComponent
        components={{
          h1: (props) => (
            <h1 className="text-3xl font-bold mb-4 mt-7" {...props} />
          ),
          h2: (props) => (
            <h2 className="text-2xl font-bold mb-4 mt-7" {...props} />
          ),
          h3: (props) => (
            <h3 className="text-xl font-bold mb-4 mt-7" {...props} />
          ),
          h4: (props) => (
            <h4 className="text-lg font-bold mb-4 mt-7" {...props} />
          ),
          p: (props) => <p className="mb-4 leading-[1.75]" {...props} />,
          // code: (props) => (
          //   <code
          //     className="bg-gray-600/25 rounded-lg px-2 py-1 border border-gray-600"
          //     {...props}
          //   />
          // ),
          img: (props) => (
            <div className="inline-flex items-center justify-center w-full">
              <div className="inline-flex flex-col bg-gray-700 items-center rounded-lg my-2 overflow-clip border border-gray-600 basis-auto">
                <div className="inline-flex flex-col">
                  <img {...props} />
                  <p className="table-caption text-center font-medium p-3 w-full grow">
                    {props.title}
                  </p>
                </div>
              </div>
            </div>
          ),
          footer: (props) => (
            <footer className="text-center w-full" {...props} />
          ),
        }}
      />
    </article>
  );
}
