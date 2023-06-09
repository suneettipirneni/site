import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { serializeHeadings } from "@/util/HeaderTree";
import { Outline } from "@/components/Outline";
import { mdxComponents } from "@/components/mdx/components";
import type { Metadata } from "next";
import { DateTime } from "@/components/post/DateTime";

const findPost = (slug: string) => {
	const post = allPosts.find((post) => post.slug === slug);
	if (!post) throw new Error(`Post not found for slug: ${slug}`);
	return post;
};

export const generateStaticParams = async () =>
	allPosts.map(({ slug }) => ({ slug }));

export const generateMetadata = ({
	params,
}: {
	params: { slug: string };
}): Metadata => {
	const post = findPost(params.slug);
	return {
		title: post.title,
		description: post.description,
		authors: [
			{
				name: post.author,
			},
		],
		twitter: {
			card: "summary_large_image",
		},
		openGraph: {
			type: "article",
			title: post.title,
			authors: post.author,
			description: post.description,
			images: [
				{
					url: post.headingImage,
				},
			],
		},
	};
};

export default function Post({ params }: { params: { slug: string } }) {
	const post = findPost(params.slug);
	const headings = serializeHeadings(post.headings);
	const MDXComponent = useMDXComponent(post.body.code);

	return (
		<article className="relative z-10 mx-auto grid w-full items-start justify-center px-2 py-4 align-middle md:px-0 xl:grid-cols-postgrid xl:gap-x-10">
			<Link
				href="/blog"
				className="col-start-2 row-start-1 mb-5 flex flex-row items-center gap-2 text-xl font-medium"
			>
				<FaArrowLeft />
				Back
			</Link>
			<h1 className="col-start-2 row-start-2 mb-10 flex w-auto max-w-postcontent flex-col text-3xl font-bold">
				<Balancer>{post.title}</Balancer>
				<DateTime datetime={post.datetime} timeToRead={post.timeToRead} />
			</h1>
			<div className="col-start-2 row-start-3 mb-2 min-w-0 max-w-postcontent self-start">
				<div className="space-y-5">
					<p className="text-gray-600 dark:text-gray-300">{post.description}</p>
				</div>
				<div data-post className="col-start-2 min-w-0 max-w-postcontent">
					<MDXComponent components={mdxComponents} />
				</div>
			</div>

			<Outline
				className="sticky top-nav col-start-3 row-start-3 hidden min-w-[200px] flex-1 self-start overflow-y-auto border-gray-500 pt-8 xl:block"
				headings={headings}
			/>
		</article>
	);
}
