import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
import { mainRouter } from "./routes/main";
import { authRoutes } from "./routes/auth";
import { admRouters } from "./routes/admin";

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));

server.use("/api/auth", authRoutes)
server.use("/api/admin", admRouters)
server.use("/api", mainRouter)

server.listen(3000, () => {
    console.log(`Server rodando na porta http://localhost:3000/`);
})
