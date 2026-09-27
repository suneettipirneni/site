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
import { cacheLife } from "next/cache";
import { rehypeAutolinkHeadingsOptions } from "@/rehype/options/rehypeAutoLinkHeadingsOptions";
import { rehypePrettyCodeOptions } from "@/rehype/options/rehypePrettyCodeOptions";
import { inlineCodePlugin } from "@/rehype/plugins/inlineCode";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import { remarkHeadings } from "@/rehype/plugins/remarkHeadings";
import { rehypeCodeHeaders } from "@/rehype/plugins/codeHeaders";
import { rehypeTaskListLabels } from "@/rehype/plugins/taskListLabels";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkReferenceLinks from "remark-reference-links";
import { HiArrowLeft, HiChevronDown } from "react-icons/hi2";

async function PostMdx({ source }: { source: string }) {
	"use cache";
	cacheLife("max");

	return (
		<MDXRemote
			source={source}
			components={mdxComponents}
			options={{
				mdxOptions: {
					rehypePlugins: [
						rehypeTaskListLabels,
						[rehypePrettyCode, rehypePrettyCodeOptions],
						rehypeCodeHeaders,
						inlineCodePlugin,
						rehypeKatex,
						[rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
					],
					remarkPlugins: [
						remarkGfm,
						remarkMath,
						remarkReferenceLinks,
						remarkHeadings,
					],
				},
			}}
		/>
	);
}

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
		<article className="site-post-grid">
			<div className="post-reading">
				<header className="post-header">
					<Link href="/blog" className="post-back">
						<HiArrowLeft aria-hidden="true" className="size-4" />
						Back to blog
					</Link>
					<h1 className="post-title">{post.title}</h1>
					<p className="post-description">{post.description}</p>
					<div className="post-meta">
						<div className="post-byline">
							<span className="post-author">{post.author}</span>
							<DateTime datetime={post.datetime} timeToRead={post.timeToRead} />
						</div>
						<Tags tags={post.tags} />
					</div>
					<Image
						src={post.headingImage}
						alt=""
						width={1200}
						height={600}
						placeholder="blur"
						blurDataURL={BLUR_DATA_URL}
						className="post-hero"
						preload
						sizes="(min-width: 768px) 640px, calc(100vw - 2rem)"
					/>
				</header>
				{headings.length > 0 && (
					<details className="post-outline-mobile">
						<summary>
							On this page
							<HiChevronDown aria-hidden="true" className="size-4" />
						</summary>
						<Outline headings={headings} hideHeading />
					</details>
				)}
				<div data-post className="typeset typeset-docs">
					<PostMdx source={post.body} />
				</div>
				<footer className="post-footer">
					<Link href="/blog" className="post-back">
						<HiArrowLeft aria-hidden="true" className="size-4" />
						Back to blog
					</Link>
				</footer>
			</div>
			{headings.length > 0 && (
				<aside className="post-outline-rail">
					<Outline headings={headings} />
				</aside>
			)}
		</article>
	);
}
