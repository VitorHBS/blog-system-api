import type { RequestHandler, Response } from "express";
import type { ExtendedRequest } from "../types/extended-request";
import { z } from "zod";
import { PostSchema } from "../schemas/post";
import { createPost, createPostSlug, handleCover } from "../services/posts";
import { getUserById } from "../services/user";
import { coverToUrl } from "../utils/cover-to-url";

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