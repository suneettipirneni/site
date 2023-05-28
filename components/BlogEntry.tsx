import Link from "next/link";
import { TagChip } from "./TagChip";
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";
import { Balancer } from "react-wrap-balancer";

export interface BlogEntryProps {
  post: Post;
}

export function BlogEntry({ post }: BlogEntryProps) {
  return (
    <Link
      href={post.url}
      className="flex flex-col space-y-3 w-full p-3 md:p-4 border-t md:bg-gray-50/20 md:dark:bg-white/5 dark:hover:bg-white/10 md:rounded-xl md:border border-gray-500/20 dark:border-gray-600 md:dark:border-white/20"
    >
      <h1 className="text-xl font-bold">
        <Balancer>{post.title}</Balancer>
      </h1>
      <time className="text-gray-600 dark:text-gray-300/80">
        {format(parseISO(post.datetime), "LLLL d, yyyy")}
      </time>
      <p className="text-lg text-gray-700 dark:text-gray-300 line-clamp-2">
        {post.description}
      </p>
      <div className="flex flex-row items-center gap-2 flex-wrap">
        {post.tags.map((tag) => (
          <TagChip key={tag} name={tag} />
        ))}
      </div>
    </Link>
  );
}
