import type { RequestHandler } from "express";
import { getAllPublishedPosts } from "../services/posts";
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

}

export const getRelatedPost: RequestHandler = async (req, res) => {

}