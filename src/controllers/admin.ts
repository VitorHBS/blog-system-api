import type { RequestHandler, Response } from "express";
import type { ExtendedRequest } from "../types/extended-request";
import { z } from "zod";
import { PostSchema } from "../schemas/post";

export const addPost = async (req: ExtendedRequest, res: Response) => {
    
    if(!req.user) return res.status(401).json({error: "Erro de login"});

    const data = PostSchema.safeParse(req.body);

    if(!data.success) return res.status(400).json({error: z.treeifyError(data.error)})

    if(!req.file) return res.status(400).json({error: "Nenhuma arquivo selecionado"});

    
}