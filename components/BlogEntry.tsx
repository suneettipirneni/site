import Link from "next/link";
import { TagChip } from "./TagChip";
import { format, parseISO } from "date-fns";
import { Post } from "contentlayer/generated";

export interface BlogEntryProps {
  post: Post;
}

export function BlogEntry({ post }: BlogEntryProps) {
  return (
    <Link
      href={post.url}
      className="flex flex-col space-y-3 w-full p-8 bg-white/5 hover:bg-white/10 rounded-xl border border-white/20"
    >
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <time className="text-gray-300/80">
        {format(parseISO(post.datetime), "LLLL d, yyyy")}
      </time>
      <p className="text-lg text-gray-300">{post.description}</p>
      <div className="flex flex-row items-center space-x-2">
        {post.tags.map((tag) => (
          <TagChip key={tag} name={tag} />
        ))}
      </div>
    </Link>
  );
}
