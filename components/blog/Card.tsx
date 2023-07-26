import Link from "next/link";
import { Tags } from "./Tag";
import { Post } from "contentlayer/generated";
import Image from "next/image";
import { DateTime } from "./DateTime";

export interface BlogEntryProps {
	post: Post;
	compact?: boolean;
}

export function BlogEntry({ post, compact = false }: BlogEntryProps) {
	return (
		<div
			className={`flex pt-5 @container first:pt-0 ${
				compact ? "flex-row-reverse items-center gap-x-5" : "flex-col space-y-3"
			} md:pt-0 ${compact && "max-h-[130px]"}`}
		>
			<Link
				href={post.url}
				className={`z-10 ${
					compact
						? `hidden h-[130px] max-w-[200px] rounded-xl md:block`
						: "w-full rounded-3xl"
				} aspect-[1600_/_850] w-full self-center overflow-hidden  border border-gray-100 bg-white dark:border-gray-200/5 dark:bg-black`}
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

			<div
				className={`flex w-full flex-col ${compact ? "gap-y-1" : "gap-y-3"}`}
			>
				<div className={`flex flex-col ${!compact && "gap-y-2"}`}>
					<DateTime
						className={`${compact && "text-xs"}`}
						datetime={post.datetime}
						timeToRead={post.timeToRead}
					/>
					<Link
						href={post.url}
						className={`${
							compact ? "text-lg" : "text-xl"
						} font-semibold hover:underline`}
					>
						{post.title}
					</Link>
				</div>
				<p
					className={`@md:text-md ${
						compact ? "mb-1 line-clamp-2" : "line-clamp-4"
					} overflow-ellipsis text-sm text-gray-600 dark:text-gray-300`}
				>
					{post.description}
				</p>
				<Tags compact={compact} tags={post.tags} />
			</div>
		</div>
	);
}
