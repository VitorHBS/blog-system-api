import { fallbackPosts } from "../data/fallbackPosts";
import type { Post } from "../types/post";

type PostsResponse = {
  posts: Post[];
};

type PostResponse = {
  post: Post;
};

export const getPosts = async () => {
  try {
    const response = await fetch("/api/posts");
    if (!response.ok) throw new Error("Unable to load posts");

    const data = (await response.json()) as PostsResponse;
    return data.posts.length > 0 ? data.posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
};

export const getPost = async (slug: string) => {
  try {
    const response = await fetch(`/api/posts/${slug}`);
    if (!response.ok) throw new Error("Unable to load post");

    const data = (await response.json()) as PostResponse;
    return data.post;
  } catch {
    return fallbackPosts.find((post) => post.slug === slug);
  }
};
