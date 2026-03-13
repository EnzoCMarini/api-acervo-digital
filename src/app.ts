import { server } from "./server.js";

/**
 * Configura a porta do servidor web
 */
const port: number = 3333;

/**
 * Inicia servidor web para escutar requisições
 */
server.listen(port, () => {
    console.info(`Servidor executando no endereço http://localhost:${port}`);
});