import { DatabaseModel } from "./model/DatabaseModel.js";
import { server } from "./server.js";
import dotenv from "dotenv";

// Carrega as variáveis do arquivo .env para o process.env
// Deve ser chamado antes de qualquer leitura de process.env
dotenv.config();

// Lê a porta do .env e converte de string para número inteiro
const port: number = parseInt(process.env.PORT as string);

// Lê o host do .env — se não estiver definido, usa string vazia como padrão
const host: string = process.env.HOST ?? "";

// Testa a conexão com o banco antes de subir o servidor
// testeConexao() retorna true (conexão ok) ou false (falha)
new DatabaseModel().testeConexao().then((ok) => {

    if (ok) {
        // Conexão bem-sucedida — inicia o servidor na porta e host definidos no .env
        server.listen(port, () => {
            console.info(`Servidor executando no endereço ${host}:${port}`);
        });
    } else {
        // Falha na conexão — servidor não é iniciado para evitar erros em todas as rotas
        console.error(`Não foi possível conectar com o banco de dados.`);
    }
});