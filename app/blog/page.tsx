import { BlogEntry } from "@/components/BlogEntry";
import { Title } from "@/components/Title";
import { allPosts } from "contentlayer/generated";

function PostSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`gap-x-5 gap-y-7 md:gap-y-10 md:divide-none divide-y divide-gray-400 dark:divide-gray-400/50 ${className}`}
    >
      {children}
    </div>
  );
}

export default function AboutPage() {
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
  });

  const featuredPosts = sortedPosts.filter((post) => post.featured);

  return (
    <div className="flex flex-col w-full md:pb-10 space-y-7 py-7">
      <Title>Featured</Title>
      <PostSection className="grid grid-cols-1 md:grid-cols-2">
        {featuredPosts.map((entry) => (
          <BlogEntry key={entry.title} post={entry} />
        ))}
      </PostSection>

      <Title>Other Posts</Title>
      <PostSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sortedPosts
          .filter((entry) => !entry.featured)
          .map((entry) => (
            <BlogEntry key={entry.title} post={entry} />
          ))}
      </PostSection>
    </div>
  );
}
