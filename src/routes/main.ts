import { Router } from "express";
import * as mainController from "../controllers/mainController"
 
export const mainRouter = Router();

mainRouter.get("/ping", (req, res) => {
    res.json({ pong: true })
})

mainRouter.get("/posts", mainController.getAllPosts);
mainRouter.get("/posts/:slug", mainController.getPosts);
mainRouter.get("/posts/:slug/related", mainController.getRelatedPost);


