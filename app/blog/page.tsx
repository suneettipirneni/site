import { BlogEntry } from "@/components/BlogEntry";
import { allPosts } from "contentlayer/generated";

export default function AboutPage() {
  const featuredPosts = allPosts.filter((post) => post.featured);

  return (
    <div className="flex flex-col space-y-5 w-full">
      <h1 className="text-4xl font-bold">Featured</h1>
      {featuredPosts.map((entry) => (
        <BlogEntry key={entry.title} post={entry} />
      ))}
      <h1 className="text-4xl font-bold">All Posts</h1>
      {allPosts.map((entry) => (
        <BlogEntry key={entry.title} post={entry} />
      ))}
    </div>
  );
}
