import type { Post } from "../types/post";

export const fallbackPosts: Post[] = [
  {
    id: 1,
    title: "Designing calmer writing workflows",
    slug: "designing-calmer-writing-workflows",
    createdAt: "2026-05-18T10:00:00.000Z",
    cover: "/images/covers/0e679406-7708-4f6d-b390-f4600632a185.jpeg",
    authorName: "Maya Stone",
    tags: "Design,Productivity",
    body: "A clean writing space helps ideas arrive with less friction. Start with fewer choices, clear notes, and a publishing rhythm that feels realistic.",
  },
  {
    id: 2,
    title: "What makes a blog homepage feel alive",
    slug: "what-makes-a-blog-homepage-feel-alive",
    createdAt: "2026-05-14T13:30:00.000Z",
    cover: "/images/covers/23f6acb5-7abd-44d3-b377-c7c490333e80.jpeg",
    authorName: "Noah Lee",
    tags: "Frontend,UX",
    body: "Readers scan quickly. A strong homepage gives them a clear featured story, a few paths into the archive, and enough visual texture to feel intentional.",
  },
  {
    id: 3,
    title: "Small components, better pages",
    slug: "small-components-better-pages",
    createdAt: "2026-05-09T09:15:00.000Z",
    cover: "/images/covers/3128341d-efd5-4a77-a830-cbed351a205e.jpeg",
    authorName: "Iris Chen",
    tags: "React,Tailwind",
    body: "Simple components age well. Cards, section headers, layout wrappers, and loading states are enough to make early product work feel polished.",
  },
];
