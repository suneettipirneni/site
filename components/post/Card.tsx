import Link from "next/link";
import { Tags } from "./Tag";
import { Post } from "contentlayer/generated";
import { Balancer } from "react-wrap-balancer";
import Image from "next/image";
import { DateTime } from "./DateTime";

export interface BlogEntryProps {
	post: Post;
}

export function BlogEntry({ post }: BlogEntryProps) {
	return (
		<div className="flex w-full flex-col space-y-3 pt-5 @container first:pt-0 md:pt-0">
			<Link
				href={post.url}
				className="relative z-10 h-[200px] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-200/10"
			>
				<picture>
					{post.headingImageDark && (
						<source
							srcSet={post.headingImageDark}
							media="(prefers-color-scheme: dark)"
						/>
					)}
					<Image
						className={`absolute h-[200px] w-full rounded-xl ${post.headerStyle === "cover" ? "object-cover" : "object-contain" } object-contain transition-all duration-300 ease-in-out hover:scale-105`}
						src={post.headingImage}
						width={500}
						height={400}
						alt={post.title}
					/>
				</picture>
			</Link>
			<Tags tags={post.tags} />
			<div className="flex w-full flex-col gap-y-3">
				<div className="flex flex-col">
					<Link href={post.url} className="text-xl font-bold hover:underline">
						<Balancer>{post.title}</Balancer>
					</Link>
					<DateTime datetime={post.datetime} timeToRead={post.timeToRead} />
				</div>
				<p className="@md:text-md line-clamp-4 overflow-ellipsis text-sm text-gray-600 dark:text-gray-300">
					{post.description}
				</p>
			</div>
		</div>
	);
}
