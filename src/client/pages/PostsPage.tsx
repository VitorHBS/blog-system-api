import { useEffect, useState } from "react";
import { BlogCard } from "../components/BlogCard";
import { SectionHeader } from "../components/SectionHeader";
import { getPosts } from "../lib/posts";
import type { Post } from "../types/post";

export const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    void getPosts().then(setPosts);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      <SectionHeader
        eyebrow="Archive"
        title="All posts"
        description="Browse the latest writing from the blog in a simple responsive card grid."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
};
