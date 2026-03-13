import express from "express";
import cors from "cors";
import { router } from "./routes.js";

/**
 * Cria servidor express
 */
const server = express();

/**
 * Configurações do servidor
 */
server.use(express.json()); // configura o servidor para usar JSON
server.use(cors()); // configura o servidor para usar CORS
server.use(router); // configura o servidor para usar o arquivo de rotas

export { server }