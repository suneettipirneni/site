import { BlogEntry } from "@/components/BlogEntry";
import { Title } from "@/components/Title";
import { allPosts } from "contentlayer/generated";

export default function AboutPage() {
  const featuredPosts = allPosts.filter((post) => post.featured);

  return (
    <div className="flex flex-col space-y-5 w-full md:pb-10 pb-5">
      <Title>Featured</Title>
      {featuredPosts.map((entry) => (
        <BlogEntry key={entry.title} post={entry} />
      ))}
      <Title>All Posts</Title>
      {allPosts.map((entry) => (
        <BlogEntry key={entry.title} post={entry} />
      ))}
    </div>
  );
}
