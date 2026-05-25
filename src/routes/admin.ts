import { Router } from "express";
import * as adminController from "../controllers/admin";
import { privateRoute } from "../middlewares/private-route";
import { upload } from "../libs/multer";

export const admRouters = Router();

admRouters.post("/posts", privateRoute, upload.single("cover"),  adminController.addPost);
//admRouters.get("/posts", adminController.getPosts);
//admRouters.get("/posts/:slug", adminController.getPost);
admRouters.put("/posts/:slug", privateRoute, upload.single("cover"), adminController.editPost);
//admRouters.delete("/posts/:slug", adminController.deletePost);