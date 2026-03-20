import express from "express";
import cors from "cors";
import { router } from "./routes.js";

// Cria a instância do servidor Express
const server = express();

// Habilita leitura de requisições em JSON — sem isso, req.body chegaria undefined nos controllers
server.use(express.json());

// Habilita CORS — permite requisições de origens diferentes (ex: front-end em outra porta)
server.use(cors());

// Registra as rotas da aplicação
server.use(router);

export { server };