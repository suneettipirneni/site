import { BlogEntry } from "@/components/BlogEntry";
import { Title } from "@/components/Title";
import { allPosts } from "contentlayer/generated";

export default function AboutPage() {
  const featuredPosts = allPosts.filter((post) => post.featured);

  return (
    <div className="flex flex-col w-full md:pb-10 space-y-7 py-7">
      <Title>Featured</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-7 md:gap-y-10 md:divide-none divide-y divide-gray-400">
        {featuredPosts.map((entry) => (
          <BlogEntry key={entry.title} post={entry} />
        ))}
      </div>

      <Title>Other Posts</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7 md:gap-y-7 md:divide-none divide-y divide-gray-400">
        {allPosts
          .filter((entry) => !entry.featured)
          .map((entry) => (
            <BlogEntry key={entry.title} post={entry} />
          ))}
      </div>
    </div>
  );
}
