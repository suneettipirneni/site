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
    <Link
      href={post.url}
      className="flex flex-col w-full border-t bg-gray-50/40 dark:bg-white/5 dark:hover:bg-white/10 rounded-xl border border-gray-500/20 dark:border-gray-600 mark:border-white/20"
    >
      <Image
        className="w-full h-[100px] md:h-[200px] object-cover rounded-t-xl border-b border-gray-500/30"
        src={post.ogImage}
        width={500}
        height={400}
        alt={post.title}
      />
      <div className="flex flex-col w-full gap-2 p-3">
        <h1 className="text-xl font-bold">
          <Balancer>{post.title}</Balancer>
        </h1>
        <time className="text-gray-600 dark:text-gray-300/80">
          {format(parseISO(post.datetime), "LLLL d, yyyy")}
        </time>
        <p className="text-md text-gray-700 dark:text-gray-300 line-clamp-2">
          {post.description}
        </p>
        <div className="flex flex-row items-center gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <TagChip key={tag} name={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
