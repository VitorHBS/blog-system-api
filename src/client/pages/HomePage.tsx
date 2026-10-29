import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "../components/BlogCard";
import { SectionHeader } from "../components/SectionHeader";
import { getPosts } from "../lib/posts";
import type { Post } from "../types/post";

export const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    void getPosts().then(setPosts);
  }, []);

  const featured = posts[0];
  const latest = posts.slice(1, 4);

  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:py-20">
          <div>
            <p className="mb-4 inline-flex rounded-md bg-emerald-50 px-3 py-1 text-sm font-black uppercase text-emerald-700">
              New essays weekly
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-6xl">
              Clear ideas for better digital work.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              A clean blog experience with thoughtful writing, crisp cards, and a layout that feels good on every screen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/posts"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-600"
              >
                Browse posts <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {featured ? <BlogCard post={featured} featured /> : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <SectionHeader
          eyebrow="Latest"
          title="Recently published"
          description="A few carefully selected posts to help the homepage feel editorial without getting complicated."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {latest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};
