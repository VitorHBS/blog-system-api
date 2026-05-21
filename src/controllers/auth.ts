import type { RequestHandler, Response } from "express";
import { z } from "zod";
import { createUser, verifyUser } from "../services/user";
import { createToken } from "../services/auth";
import { LoginSchema, RegisterSchema } from "../schemas/user";
import type { ExtendedRequest } from "../types/extended-request";

export const signup: RequestHandler = async (req, res) => {

    const safeData = RegisterSchema.safeParse(req.body);

    if (!safeData.success) {
        return res.json({ error: z.treeifyError(safeData.error) })
    }

    const newUser = await createUser(safeData.data)

    if (!newUser) {
        return res.json({ error: "Erro ao criar Usuário" });
    }

    const token = createToken(newUser)

    res.status(201).json({
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        },
        token
    })
}

export const signin: RequestHandler = async (req, res) => {
    const safeData = LoginSchema.safeParse(req.body);

    if (!safeData.success) {
        return res.status(400).json({
            error: z.treeifyError(safeData.error)
        })
    }

    const user = await verifyUser(safeData.data);

    if (!user) {
        return res.status(401).json({ error: "Acesso negado" })
    }

    const token = createToken(user);

    return res.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    })
}

export const validate = async (req: ExtendedRequest, res: Response) => {
    return res.json({user: req.user});
}
