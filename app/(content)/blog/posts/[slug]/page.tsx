import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { serializeHeadings } from "@/util/HeaderTree";
import { Outline } from "@/components/Outline";
import { mdxComponents } from "@/components/mdx/components";
import type { Metadata } from "next";
import { DateTime } from "@/components/blog/DateTime";
import { Tags } from "@/components/blog/Tag";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/constants";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPost, getPosts } from "@/lib/post";
import { notFound } from "next/navigation";
import { rehypeAutolinkHeadingsOptions } from "@/rehype/options/rehypeAutoLinkHeadingsOptions";
import { rehypePrettyCodeOptions } from "@/rehype/options/rehypePrettyCodeOptions";
import { codeTitleBarPlugin } from "@/rehype/plugins/codeTitleBar";
import { inlineCodePlugin } from "@/rehype/plugins/inlineCode";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkReferenceLinks from "remark-reference-links";

export async function generateStaticParams() {
	const posts = await getPosts();
	return posts.map((post) => ({ slug: post.slug }));
}

export const generateMetadata = async (props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
	const params = await props.params;
	const post = await getPost(params.slug);

	if (!post) {
		notFound();
	}

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

export default async function Post(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const post = await getPost(params.slug);

	if (!post) {
		notFound();
	}

	const headings = serializeHeadings(post.headings);

	return (
		<article className="relative z-10 mx-auto grid w-full items-start justify-center px-2 py-4 align-middle sm:px-10 md:px-5 lg:grid-cols-postgrid lg:gap-x-10">
			<Link
				href="/blog"
				className="col-start-2 row-start-1 mb-5 flex flex-row items-center gap-2 text-xl font-medium text-gray-600 dark:text-gray-300/80"
			>
				<FaArrowLeft />
				Back
			</Link>
			<h1 className="col-start-2 row-start-2 mb-5 flex w-auto max-w-postcontent flex-col gap-y-3 font-bold">
				<Tags tags={post.tags} />
				<span className="text-3xl leading-tight md:text-3xl">{post.title}</span>
				<DateTime datetime={post.datetime} timeToRead={post.timeToRead} />
				<div className="space-y-5">
					<p className="font-normal text-gray-600 dark:text-gray-300">
						{post.description}
					</p>
				</div>

				<Image
					src={post.headingImage}
					alt={post.title}
					width={1200}
					height={600}
					placeholder="blur"
					blurDataURL={BLUR_DATA_URL}
					className="mt-5 aspect-[1200_/_600] w-full rounded-xl object-cover"
					priority
				/>
			</h1>
			<div className="col-start-2 row-start-3 mb-2 min-w-0 max-w-postcontent self-start">
				<div data-post className="col-start-2 min-w-0 max-w-postcontent">
					<MDXRemote
						source={post.body}
						components={mdxComponents}
						options={{
							mdxOptions: {
								rehypePlugins: [
									[rehypePrettyCode, rehypePrettyCodeOptions],
									rehypeSlug,
									inlineCodePlugin,
									codeTitleBarPlugin,
									rehypeKatex,
									[rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
								],
								remarkPlugins: [remarkGfm, remarkMath, remarkReferenceLinks],
							},
						}}
					/>
					{/* <MDXComponent components={mdxComponents} /> */}
				</div>
			</div>

			<Outline
				className="sticky top-nav col-start-3 row-start-3 hidden min-w-[200px] flex-1 self-start overflow-y-auto border-gray-500 pt-8 lg:block"
				headings={headings}
			/>
		</article>
	);
}
