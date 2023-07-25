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
		<div className="flex flex-col space-y-3 pt-5 @container first:pt-0 md:pt-0">
			<Link
				href={post.url}
				className="z-10 aspect-[auto_1200_/_600] w-full self-center overflow-hidden rounded-3xl border border-gray-100 bg-white dark:border-gray-200/5 dark:bg-black"
			>
				<Image
					className={`h-full w-full
						 rounded-xl object-cover transition-all duration-300 ease-in-out hover:scale-105`}
					src={post.headingImage}
					width={500}
					height={250}
					alt={post.title}
				/>
			</Link>

			<div className="flex w-full flex-col gap-y-3">
				<div className="flex flex-col gap-y-2">
					<DateTime datetime={post.datetime} timeToRead={post.timeToRead} />
					<Link
						href={post.url}
						className="text-xl font-semibold hover:underline"
					>
						<Balancer>{post.title}</Balancer>
					</Link>
				</div>
				<p className="@md:text-md line-clamp-4 overflow-ellipsis text-sm text-gray-600 dark:text-gray-300">
					{post.description}
				</p>
			</div>
			<Tags tags={post.tags} />
		</div>
	);
}
