import { allPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { useMDXComponent } from "next-contentlayer/hooks";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { serializeHeadings } from "@/util/HeaderTree";
import { Outline } from "@/components/Outline";
import { mdxComponents } from "@/components/mdx/components";
import type { Metadata } from "next";

export const generateStaticParams = async () =>
	allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({
	params,
}: {
	params: { slug: string };
}): Metadata => {
	const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
	if (!post) throw new Error(`Post not found for slug: ${params.slug}`);
	return {
		title: post.title,
		description: post.description,
		authors: [
			{
				name: post.author,
			},
		],
		openGraph: {
			type: "article",
			title: post.title,
			authors: post.author,
			description: post.description,
		},
	};
};

export default function Post({ params }: { params: { slug: string } }) {
	const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
	if (!post) throw new Error(`Post not found for slug: "${params.slug}"`);

	const headings = serializeHeadings(post.headings);
	const MDXComponent = useMDXComponent(post.body.code);

	return (
		<article className="grid-rows(1fr, 100%, 1fr) relative z-10 w-full grid-cols-[1fr_fit-content(700px)_1fr] gap-x-10 py-4 md:py-8 lg:grid">
			<div className="col-start-2 mb-2 min-w-0">
				<Link
					href="/blog"
					className="my-5 flex flex-row items-center gap-2 text-xl font-medium md:my-10"
				>
					<FaArrowLeft />
					Back
				</Link>
				<div className="space-y-5">
					<h1 className="text-3xl font-bold">
						<Balancer>{post.title}</Balancer>
					</h1>
					<time
						dateTime={post.datetime}
						className="text-sm text-gray-600 dark:text-gray-300"
					>
						{format(parseISO(post.datetime), "LLLL d, yyyy")}
					</time>
					<p className="text-gray-600 dark:text-gray-300">{post.description}</p>
				</div>
			</div>
			<div data-post className="col-start-2 min-w-0">
				<MDXComponent components={mdxComponents} />
			</div>
			<div></div>
			<Outline
				className="sticky top-10 col-start-3 row-start-2 hidden min-w-[200px] self-start lg:block"
				headings={headings}
			/>
		</article>
	);
}
