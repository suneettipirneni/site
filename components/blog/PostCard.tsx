import Link from "next/link";
import { Tags } from "./Tag";
import Image from "next/image";
import { DateTime } from "./DateTime";
import { BLUR_DATA_URL } from "@/lib/constants";
import { Post } from "@/lib/post";

export interface PostCardProps {
	post: Post;
	compact?: boolean;
}

export function PostCard({ post, compact = false }: PostCardProps) {
	return (
		<div
			className={`flex pt-5 @container first:pt-0 ${
				compact ? "flex-row items-center gap-x-5" : "flex-col space-y-3"
			} md:pt-0 ${compact && "max-h-[130px]"}`}
		>
			<Link
				href={post.url}
				className={`z-10 ${
					compact
						? `hidden h-[130px] max-w-[200px] rounded-xl md:block`
						: "w-full rounded-xl"
				} aspect-[1600_/_850] w-full self-center overflow-hidden  border border-gray-100 bg-white dark:border-gray-200/5 dark:bg-black`}
			>
				<Image
					className={`h-full w-full
						 rounded-xl object-cover transition-all duration-300 ease-in-out hover:scale-105`}
					src={post.headingImage}
					width={compact ? 200 : 500}
					height={compact ? 128 : 250}
					alt={post.title}
					placeholder="blur"
					blurDataURL={BLUR_DATA_URL}
					priority={!compact}
				/>
			</Link>

			<div
				className={`flex w-full grow flex-col ${
					compact ? "gap-y-1" : "gap-y-3"
				}`}
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
					className={`@md:text-md grow ${
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
