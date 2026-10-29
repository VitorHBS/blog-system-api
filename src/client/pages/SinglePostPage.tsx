import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDate, getTags } from "../lib/format";
import { getPost } from "../lib/posts";
import type { Post } from "../types/post";

export const SinglePostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | undefined>();

  useEffect(() => {
    if (slug) void getPost(slug).then(setPost);
  }, [slug]);

  if (!post) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-20">
        <Link to="/posts" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600">
          <ArrowLeft size={17} /> Back to posts
        </Link>
        <p className="mt-10 text-lg font-bold text-slate-700">Post not found.</p>
      </section>
    );
  }

  return (
    <article>
      <header className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-12">
          <Link
            to="/posts"
            className="mb-8 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} /> Back
          </Link>
          <div className="mb-5 flex flex-wrap gap-2">
            {getTags(post.tags).map((tag) => (
              <span key={tag} className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold uppercase text-emerald-700">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-6xl">{post.title}</h1>
          <p className="mt-5 text-slate-500">
            By <span className="font-bold text-slate-800">{post.authorName || "Editorial Team"}</span> on{" "}
            {formatDate(post.createdAt)}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5">
        <img
          src={post.cover || "/images/covers/3128341d-efd5-4a77-a830-cbed351a205e.jpeg"}
          alt=""
          className="h-[22rem] w-full rounded-lg object-cover shadow-xl sm:h-[30rem]"
        />
      </div>

      <div className="mx-auto max-w-3xl px-5 py-12">
        {(post.body || "").split("\n").map((paragraph, index) => (
          <p key={`${paragraph}-${index}`} className="mb-6 text-lg leading-8 text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
};
