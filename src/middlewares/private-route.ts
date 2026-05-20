import type { NextFunction, Request, Response } from "express";
import { verifyRequest } from "../services/auth";
import type { ExtendedRequest } from "../types/extended-request";


export const privateRoute = async (req:ExtendedRequest, res: Response, next: NextFunction) => {
    const user = await verifyRequest(req);

    if(!user) {
        return res.status(401).json({error: "Acesso negado"});
    }

    req.user = user

    next()
}