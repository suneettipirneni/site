import Link from "next/link";
import { TagChip } from "./TagChip";
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import { Balancer } from "react-wrap-balancer";
import Image from "next/image";

export interface BlogEntryProps {
	post: Post;
}

export function BlogEntry({ post }: BlogEntryProps) {
	return (
		<div className="flex w-full flex-col space-y-3 pt-5 @container first:pt-0 md:pt-0">
			<Link
				href={post.url}
				className="relative z-10 h-[200px] overflow-hidden rounded-xl border border-black/20 dark:border-white/30"
			>
				<picture>
					{post.headingImageDark && (
						<source
							srcSet={post.headingImageDark}
							media="(prefers-color-scheme: dark)"
						/>
					)}
					<Image
						className="absolute h-[200px] w-full rounded-xl object-cover transition-all duration-300 ease-in-out hover:scale-105"
						src={post.headingImage}
						width={500}
						height={400}
						alt={post.title}
					/>
				</picture>
			</Link>

			<div className="flex flex-row flex-wrap items-end gap-2">
				{post.tags.map((tag) => (
					<TagChip key={tag} name={tag} />
				))}
			</div>
			<div className="flex w-full flex-col gap-2">
				<Link href={post.url} className="flex flex-col">
					<h1 className="text-xl font-bold hover:underline">
						<Balancer>{post.title}</Balancer>
					</h1>
				</Link>

				<p className="@md:text-md line-clamp-4 overflow-ellipsis text-sm text-gray-700 dark:text-gray-300">
					{post.description}
				</p>
			</div>
			<time className="text-sm text-gray-600 dark:text-gray-300/80">
				{format(parseISO(post.datetime), "LLLL d, yyyy")}
			</time>
		</div>
	);
}
