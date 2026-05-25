import type { RequestHandler, Response } from "express";
import type { ExtendedRequest } from "../types/extended-request";
import { z } from "zod";
import { EditPost, PostSchema } from "../schemas/post";
import { createPost, createPostSlug, getPostBySlug, handleCover, updatePost } from "../services/posts";
import { getUserById } from "../services/user";
import { coverToUrl } from "../utils/cover-to-url";
import { removePost } from "../services/auth";

export const addPost = async (req: ExtendedRequest, res: Response) => {

    if (!req.user) return res.status(401).json({ error: "Erro de login" });

    const data = PostSchema.safeParse(req.body);

    if (!data.success) return res.status(400).json({ error: z.treeifyError(data.error) });

    if (!req.file) return res.status(400).json({ error: "Nenhuma arquivo selecionado" });

    //Lidar com o arquivo
    const coverName = await handleCover(req.file);
    if (!coverName) return res.status(400).json({ error: "imagem não permitida/enviada" });

    //Criar o slug do post
    const slug = await createPostSlug(data.data.title);

    //Criar o Post
    const newPost = await createPost({
        authorId: req.user.id,
        slug,
        title: data.data.title,
        tags: data.data.tags,
        body: data.data.body,
        cover: coverName
    })

    //pegar informações do autor
    const author = await getUserById(newPost.authorId);

    res.status(201).json({
        post: {
            id: newPost.id,
            slug: newPost.slug,
            title: newPost.title,
            createdAt: newPost.createdAt,
            cover: coverToUrl(newPost.cover),
            tags: newPost.tags,
            authorId: newPost.authorId,
            authorName: author?.name
        }
    })
}


export const editPost = async (req: ExtendedRequest, res: Response) => {
    const { slug } = req.params;

    if (typeof slug !== "string") return res.status(400).json({ error: "type slug inválido" });

    const data = EditPost.safeParse(req.body);

    if (!data.success) return res.status(400).json({ error: z.treeifyError(data.error) });

    const post = await getPostBySlug(slug);

    if (!post) return res.status(404).json({ error: "Post inexistente" });

    let coverName: string | false = false;

    if (req.file) {
        coverName = await handleCover(req.file);
    }

    const updatedData = {
        updatedAt: new Date(),
        ...(data.data.status !== undefined && { status: data.data.status }),
        ...(data.data.title !== undefined && { title: data.data.title }),
        ...(data.data.tags !== undefined && { tags: data.data.tags }),
        ...(data.data.body !== undefined && { body: data.data.body }),
        ...(coverName && { cover: coverName }),
    }

    const updatedPost = await updatePost(slug, updatedData)

    const author = await getUserById(updatedPost.authorId);

    res.json({
        post: {
            id: updatedPost.id,
            status: updatedPost.status,
            slug: updatedPost.slug,
            title: updatedPost.title,
            createdAt: updatedPost.createdAt,
            cover: coverToUrl(updatedPost.cover),
            tags: updatedPost.tags,
            authorName: author?.name
        }
    });
}

export const deletePost = async (req: ExtendedRequest, res: Response) => {
    const { slug } = req.params;

    if (typeof slug !== "string") return res.json({ error: "tipo do dado inválido" })

    const post = await getPostBySlug(slug)

    if (!post) return res.json({ error: "Post inexistente" });

    await removePost(post.slug)
    res.json({ error: null })
}