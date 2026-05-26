import type { RequestHandler } from "express";
import { getAllPublishedPosts, getPostBySlug, getPostsWithSameTag } from "../services/posts";
import { coverToUrl } from "../utils/cover-to-url";



export const getAllPosts: RequestHandler = async (req, res) => {
    let page = 1;
    if (req.query.page) {
        page = parseInt(req.query.page as string)
        if (page <= 0) return res.json({ error: "pagina inexistente" })
    }

    let posts = await getAllPublishedPosts(page);

    const postsToReturn = posts.map(posts => ({
        id: posts.id,
        status: posts.status,
        title: posts.title,
        createdAt: posts.createdAt,
        cover: coverToUrl(posts.cover),
        authorName: posts.author?.name,
        tags: posts.tags,
        slug: posts.slug
    }));

    res.json({ posts: postsToReturn, page })
}

export const getPosts: RequestHandler = async (req, res) => {
    const { slug } = req.params;

    if (typeof slug !== "string") return res.status(400).json({ error: "type slug invalid" })

    const post = await getPostBySlug(slug);

    if (!post || (post && post.status !== "PUBLISHED")) return res.status(404).json({ error: "post inexistente" });

    res.json({
        post: {
            id: post.id,
            title: post.title,
            createdAt: post.createdAt,
            cover: coverToUrl(post.cover),
            authorName: post.author?.name,
            body: post.body,
            tags: post.tags,
            slug: post.slug
        }
    })
}

export const getRelatedPost: RequestHandler = async (req, res) => {
    const { slug } = req.params;

    if (typeof slug !== "string") return res.status(400).json({ error: "type slug invalid" })

    let posts = await getPostsWithSameTag(slug);

    const postsToReturn = posts.map(posts => ({
        id: posts.id,
        status: posts.status,
        title: posts.title,
        createdAt: posts.createdAt,
        cover: coverToUrl(posts.cover),
        authorName: posts.author?.name,
        tags: posts.tags,
        slug: posts.slug
    }));

    res.json({ posts: postsToReturn })
}