import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser"
import path from "path";
import { fileURLToPath } from "url";
import { mainRouter } from "./routes/main";
import { authRoutes } from "./routes/auth";
import { admRouters } from "./routes/admin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.resolve(__dirname, "../dist");

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(express.static(clientDist));

server.use("/api/auth", authRoutes)
server.use("/api/admin", admRouters)
server.use("/api", mainRouter)

server.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
});

server.listen(3000, () => {
    console.log(`Server rodando na porta http://localhost:3000/`);
})
