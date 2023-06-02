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
      className="@container flex flex-col w-full border-t bg-white dark:bg-black dark:hover:bg-black/40 rounded-xl border border-gray-500/20 dark:border-gray-700 dark:border-white/20"
    >
      <Image
        className="w-full h-[100px] @md:h-[200px] object-cover rounded-t-xl border-b border-gray-500/30"
        src={post.ogImage}
        width={500}
        height={400}
        alt={post.title}
      />
      <div className="flex flex-col w-full h-full gap-2 p-3">
        <span className="flex flex-col">
          <h1 className="text-xl font-bold">
            <Balancer>{post.title}</Balancer>
          </h1>
          <time className="text-gray-600 text-sm dark:text-gray-300/80">
            {format(parseISO(post.datetime), "LLLL d, yyyy")}
          </time>
        </span>

        <p className="text-sm @md:text-md text-gray-700 dark:text-gray-300 overflow-ellipsis line-clamp-4 mb-auto">
          {post.description}
        </p>
        <div className="flex flex-row items-end gap-2 flex-wrap">
          {post.tags.map((tag) => (
            <TagChip key={tag} name={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
