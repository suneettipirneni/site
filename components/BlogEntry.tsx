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
    <div className="@container flex flex-col w-full space-y-3 pt-5 first:pt-0 md:pt-0">
      <Link
        href={post.url}
        className="relative overflow-hidden h-[200px] z-10 rounded-xl"
      >
        <Image
          className="absolute w-full h-[200px] object-cover rounded-xl transition-all duration-300 ease-in-out hover:scale-105"
          src={post.ogImage}
          width={500}
          height={400}
          alt={post.title}
        />
      </Link>

      <div className="flex flex-row items-end gap-2 flex-wrap">
        {post.tags.map((tag) => (
          <TagChip key={tag} name={tag} />
        ))}
      </div>
      <div className="flex flex-col w-full gap-2">
        <Link href={post.url} className="flex flex-col">
          <h1 className="text-xl font-bold hover:underline">
            <Balancer>{post.title}</Balancer>
          </h1>
        </Link>

        <p className="text-sm @md:text-md text-gray-700 dark:text-gray-300 overflow-ellipsis line-clamp-4">
          {post.description}
        </p>
      </div>
      <time className="text-gray-600 text-sm dark:text-gray-300/80">
        {format(parseISO(post.datetime), "LLLL d, yyyy")}
      </time>
    </div>
  );
}
