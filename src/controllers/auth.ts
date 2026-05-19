import type { RequestHandler } from "express";
import { z } from "zod";
import { createUser } from "../services/user";

export const signup: RequestHandler = async (req, res) => {

    const userSchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string()
    })

    const safeData = userSchema.safeParse(req.body);

    if (!safeData.success) {
        return res.json({ error: z.treeifyError(safeData.error) })
    }

    const newUser = await createUser(safeData.data)

    if (!newUser) {
        return res.json({ error: "Erro ao criar Usuário" });
    }

    const token = "123"

    res.status(201).json({
        user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        },
        token: token
    })
}