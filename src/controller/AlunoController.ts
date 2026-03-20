// Importa a classe Aluno do model — é daqui que vêm os métodos de acesso ao banco de dados
import Aluno from "../model/Aluno.js";
// Importa os tipos Request e Response do Express — representam a requisição e a resposta HTTP
// "type" indica que é uma importação apenas de tipo (só existe em tempo de compilação, não gera código JS)
import { type Request, type Response } from "express";
// Importa o tipo AlunoDTO para tipar os dados recebidos do front-end
import type AlunoDTO from "../dto/AlunoDTO.js";

// Define a classe AlunoController que HERDA da classe Aluno
// Isso permite que o controller acesse diretamente os métodos estáticos do model (listarAlunos, cadastrarAluno, etc.)
// A arquitetura MVC separa responsabilidades: o Model cuida do banco, o Controller cuida das requisições HTTP
class AlunoController extends Aluno {

    /**
     * Lista todos os alunos.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de alunos em formato JSON.
     */
    // Método estático e assíncrono — recebe a requisição HTTP e devolve a resposta com todos os alunos
    static async todos(req: Request, res: Response) {
        try {
            // Busca todos os alunos ativos no banco
            const listaDeAlunos = await Aluno.listarAlunos();
            // Retorna a lista com status 200 (OK)
            res.status(200).json(listaDeAlunos);
        } catch (error) {
            // Exibe o erro no servidor e retorna status 500 (Internal Server Error)
            console.error(`Erro ao listar alunos: ${error}`);
            res.status(500).json("Erro ao recuperar as informações do aluno.");
        }
    }

    /**
     * Retorna informações de um aluno
     * @param req Objeto de requisição HTTP
     * @param res Objeto de resposta HTTP.
     * @returns Informações de aluno em formato JSON.
     */
    // Método que busca um único aluno com base no ID informado na URL (ex: GET /aluno/5)
    static async aluno(req: Request, res: Response) {
        try {
            // Lê o parâmetro "id" da URL e converte de string para número inteiro
            const idAluno = parseInt(req.params.id as string);
    
            // Busca o aluno pelo ID e retorna com status 200 (OK)
            const aluno = await Aluno.listarAluno(idAluno);
            res.status(200).json(aluno);
        } catch (error) {
            // Exibe o erro no servidor e retorna status 500 (Internal Server Error)
            console.error(`Erro ao buscar aluno: ${error}`);
            res.status(500).json("Erro ao recuperar as informações do aluno.");
        }
    }

    /**
      * Cadastra um novo aluno.
      * @param req Objeto de requisição HTTP com os dados do aluno.
      * @param res Objeto de resposta HTTP.
      * @returns Mensagem de sucesso ou erro em formato JSON.
      */
    // Método que recebe os dados do front-end e cria um novo aluno no banco de dados
    static async cadastrar(req: Request, res: Response) {
        try {
            // Lê os dados do novo aluno enviados no body da requisição
            const dadosRecebidos: AlunoDTO = req.body;
    
            // Cria o objeto Aluno com os dados recebidos
            // O operador "??" define valores padrão para campos opcionais não enviados
            const novoAluno = new Aluno(
                dadosRecebidos.nome,
                dadosRecebidos.sobrenome,
                dadosRecebidos.data_nascimento ?? new Date("1900-01-01"), // padrão: 01/01/1900
                dadosRecebidos.endereco ?? '',
                dadosRecebidos.email ?? '',
                dadosRecebidos.celular  
            );
    
            // Persiste o novo aluno no banco e verifica o resultado
            const result = await Aluno.cadastrarAluno(novoAluno);
    
            if (result) {
                // Status 201 (Created) — recurso criado com sucesso
                return res.status(201).json({ mensagem: `Aluno cadastrado com sucesso.` });
            } else {
                return res.status(500).json({ mensagem: 'Não foi possível cadastrar o aluno no banco de dados.' });
            }
        } catch (error) {
            console.error(`Erro ao cadastrar o aluno: ${error}`);
            return res.status(500).json({ mensagem: 'Erro ao cadastrar o aluno.' });
        }
    }

    /**
     * Remove um aluno.
     * @param req Objeto de requisição HTTP com o ID do aluno a ser removido.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    // Método que recebe um ID pela URL e realiza a remoção lógica do aluno no banco
    // "Promise<Response>" indica que este método sempre retorna uma resposta HTTP ao final
    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            // Lê o parâmetro "id" da URL e converte para número inteiro
            const idAluno = parseInt(req.params.id as string);
    
            // Remove logicamente o aluno com o ID informado e verifica o resultado
            const result = await Aluno.removerAluno(idAluno);
    
            if (result) {
                // Status 200 (OK) — remoção bem-sucedida
                return res.status(200).json({ mensagem: 'Aluno removido com sucesso.' });
            } else {
                // Status 404 (Not Found) — aluno não encontrado ou já inativo
                return res.status(404).json({ mensagem: 'Aluno não encontrado para exclusão.' });
            }
        } catch (error) {
            console.error(`Erro ao remover aluno: ${error}`);
            return res.status(500).json({ mensagem: 'Erro ao remover aluno.' });
        }
    }

    /**
     * Método para atualizar o cadastro de um aluno.
     * 
     * @param req Objeto de requisição do Express, contendo os dados atualizados do aluno
     * @param res Objeto de resposta do Express
     * @returns Retorna uma resposta HTTP indicando sucesso ou falha na atualização
     */
    // Método que recebe os novos dados do front-end e atualiza o cadastro do aluno no banco
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            // Lê o corpo da requisição e tipifica como AlunoDTO
            // O front-end envia os dados atualizados no corpo da requisição
            const dadosRecebidos: AlunoDTO = req.body;

            // Cria um novo objeto Aluno com os dados atualizados recebidos do front-end
            // Mesma lógica do método cadastrar — usa "??" para garantir valores padrão nos campos opcionais
            const aluno = new Aluno(
                dadosRecebidos.nome,
                dadosRecebidos.sobrenome,
                dadosRecebidos.data_nascimento ?? new Date("1900-01-01"),
                dadosRecebidos.endereco ?? '',
                dadosRecebidos.email ?? '',
                dadosRecebidos.celular
            );

            // Define o ID do aluno no objeto criado, lendo o parâmetro "id" da URL
            // Isso é necessário para que o model saiba QUAL aluno deve ser atualizado no banco
            // Exemplo de URL: PUT /aluno/7  →  setIdAluno(7)
            aluno.setIdAluno(parseInt(req.params.id as string));

            // Chama o método do model para atualizar os dados do aluno no banco de dados
            const result = await Aluno.atualizarAluno(aluno);

            // Verifica o retorno do model: true = atualização bem-sucedida, false = falha
            if (result) {
                // Retorna mensagem de sucesso com status HTTP 200 (OK)
                return res.status(200).json({ mensagem: "Cadastro atualizado com sucesso." });
            } else {
                // Retorna mensagem de erro com status HTTP 500 se o banco não conseguiu atualizar
                return res.status(500).json({ mensagem: 'Não foi possível atualizar o aluno no banco de dados.' });
            }
        } catch (error) {
            // Registra o erro nos logs do servidor
            console.error(`Erro ao atualizar aluno: ${error}`);
            // Retorna mensagem de erro com status HTTP 500 em caso de exceção inesperada
            return res.status(500).json({ mensagem: "Erro ao atualizar aluno." });
        }
    }
}

// Exporta a classe AlunoController para que possa ser importada e usada nas rotas da aplicação
export default AlunoController;