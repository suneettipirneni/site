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
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkReferenceLinks from "remark-reference-links";
import {
	EntranceItem,
	StaggeredEntrance,
} from "@/components/motion/StaggeredEntrance";
import { HiArrowLeft } from "react-icons/hi2";

async function PostMdx({ source }: { source: string }) {
	"use cache";
	cacheLife("minutes");

	return (
		<MDXRemote
			source={source}
			components={mdxComponents}
			options={{
				mdxOptions: {
					rehypePlugins: [
						[rehypePrettyCode, rehypePrettyCodeOptions],
						rehypeSlug,
						inlineCodePlugin,
						rehypeKatex,
						[rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
					],
					remarkPlugins: [remarkGfm, remarkMath, remarkReferenceLinks],
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
		<article className="site-content-grid w-full border-x border-border">
			<aside className="order-2 border-t border-border p-[var(--site-panel)] lg:order-none lg:border-r lg:border-t-0">
				<StaggeredEntrance className="flex flex-col gap-8 lg:sticky lg:top-[calc(var(--site-nav)+var(--site-panel))] lg:max-h-[calc(100dvh-var(--site-nav)-var(--site-panel)*2)] lg:overflow-y-auto">
					<EntranceItem>
						<section aria-labelledby="navigation-heading">
							<h2 id="navigation-heading" className="type-label">
								Navigation
							</h2>
							<Link
								href="/blog"
								transitionTypes={["nav-back"]}
								className="site-list-row type-body-small mt-3 flex min-h-[var(--site-row-sm)] items-center justify-between text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
							>
								<span>Back to blog</span>
								<HiArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
							</Link>
						</section>
					</EntranceItem>
					<EntranceItem>
						<section aria-labelledby="metadata-heading">
							<h2 id="metadata-heading" className="type-label">
								Metadata
							</h2>
							<dl className="mt-3 text-[0.8125rem] leading-5">
								<div className="site-list-row grid min-h-[var(--site-row-sm)] grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-4 py-2">
									<dt className="font-medium">Published</dt>
									<dd className="text-muted-foreground">
										<DateTime
											datetime={post.datetime}
											timeToRead={post.timeToRead}
										/>
									</dd>
								</div>
								<div className="site-list-row grid min-h-[var(--site-row-sm)] grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-4 py-2">
									<dt className="font-medium">Author</dt>
									<dd className="text-muted-foreground">{post.author}</dd>
								</div>
							</dl>
						</section>
					</EntranceItem>
					<EntranceItem>
						<section aria-labelledby="tags-heading">
							<h2 id="tags-heading" className="type-label">
								Tags
							</h2>
							<div className="mt-3">
								<Tags tags={post.tags} />
							</div>
						</section>
					</EntranceItem>
					<EntranceItem className="hidden lg:block">
						<section aria-labelledby="outline-heading">
							<h2 id="outline-heading" className="type-label">
								Outline
							</h2>
							<div className="mt-3">
								<Outline headings={headings} hideHeading />
							</div>
						</section>
					</EntranceItem>
				</StaggeredEntrance>
			</aside>

			<div className="order-1 min-w-0 lg:order-none">
				<header className="border-b border-border">
					<StaggeredEntrance>
						<EntranceItem className="p-[var(--site-panel)]">
							<div className="flex max-w-[960px] flex-col gap-6">
								<h1 className="type-page-title max-w-[22ch]">{post.title}</h1>
								<p className="type-body max-w-[65ch] text-muted-foreground">
									{post.description}
								</p>
							</div>
						</EntranceItem>
						<EntranceItem className="border-t border-border">
							<Image
								src={post.headingImage}
								alt=""
								width={1200}
								height={600}
								placeholder="blur"
								blurDataURL={BLUR_DATA_URL}
								className="aspect-[2/1] w-full object-cover grayscale lg:aspect-[3/1]"
								fetchPriority="high"
								loading="eager"
								preload
								sizes="(min-width: 1024px) 980px, calc(100vw - 3rem)"
							/>
						</EntranceItem>
					</StaggeredEntrance>
				</header>

				<div className="p-[var(--site-panel)]">
					<StaggeredEntrance delay={0.12}>
						<EntranceItem>
							<div
								data-post
								className="typeset typeset-docs text-pretty max-w-[760px]"
							>
								<PostMdx source={post.body} />
							</div>
						</EntranceItem>
					</StaggeredEntrance>
				</div>
			</div>
		</article>
	);
}
