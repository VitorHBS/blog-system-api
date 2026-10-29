import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate, getExcerpt, getTags } from "../lib/format";
import type { Post } from "../types/post";

type BlogCardProps = {
  post: Post;
  featured?: boolean;
};

export const BlogCard = ({ post, featured = false }: BlogCardProps) => (
  <article
    className={`group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
      featured ? "grid md:grid-cols-[1.15fr_0.85fr]" : ""
    }`}
  >
    <Link to={`/posts/${post.slug}`} className="block overflow-hidden bg-slate-200">
      <img
        src={post.cover || "/images/covers/3128341d-efd5-4a77-a830-cbed351a205e.jpeg"}
        alt=""
        className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
          featured ? "h-72 md:h-full" : "h-56"
        }`}
      />
    </Link>

    <div className="flex min-h-full flex-col p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        {getTags(post.tags)
          .slice(0, 3)
          .map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-bold uppercase text-emerald-700"
            >
              {tag}
            </span>
          ))}
      </div>

      <Link to={`/posts/${post.slug}`}>
        <h2 className={featured ? "text-3xl font-black leading-tight" : "text-xl font-black leading-tight"}>
          {post.title}
        </h2>
      </Link>

      <p className="mt-3 text-sm leading-6 text-slate-600">{getExcerpt(post.body)}</p>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 text-sm">
        <div>
          <p className="font-bold text-slate-900">{post.authorName || "Editorial Team"}</p>
          <p className="text-slate-500">{formatDate(post.createdAt)}</p>
        </div>
        <Link
          to={`/posts/${post.slug}`}
          className="grid size-10 place-items-center rounded-lg bg-slate-950 text-white transition group-hover:bg-emerald-600"
          aria-label={`Read ${post.title}`}
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </div>
  </article>
);
