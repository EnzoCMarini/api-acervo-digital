import Emprestimo from "../model/Emprestimo.js";
import { type Request, type Response } from "express";
import type EmprestimoDTO from "../dto/EmprestimoDTO.js";

class EmprestimoController extends Emprestimo {

    /**
    * Método para listar todos os empréstimos.
    * Retorna um array de empréstimos com informações dos alunos e dos livros.
    */
    static async todos(req: Request, res: Response): Promise<Response> {
        try {
            // Chama o método listarEmprestimos do service
            const listaDeEmprestimos = await Emprestimo.listarEmprestimos();

            // Retorna a lista de empréstimos com status 200 (OK)
            return res.status(200).json(listaDeEmprestimos);
        } catch (error) {
            // Em caso de erro, retorna o erro com status 500 (erro do servidor)
            console.error('Erro ao listar empréstimos:', error);
            return res.status(500).json({ mensagem: 'Erro ao listar os empréstimos.' });
        }
    }

    /**
     * Retorna informações de um empréstimo
     * @param req Objeto de requisição HTTP
     * @param res Objeto de resposta HTTP.
     * @returns Informações de empréstimo em formato JSON.
     */
    static async emprestimo(req: Request, res: Response) {
        try {
            const idEmprestimo: number = parseInt(req.params.id as string);

            const emprestimo = await Emprestimo.listarEmprestimo(idEmprestimo);
            res.status(200).json(emprestimo);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);    // Exibe erros da consulta no console
            res.status(500).json("Erro ao recuperar as informações do aluno.");  // Retorna mensagem de erro com status code 400
        }
    }

    /**
     * Cadastra um novo empréstimo.
     * Recebe os dados do empréstimo a partir da requisição e passa para o serviço.
     */
    static async cadastrar(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidos: EmprestimoDTO = req.body;

            const emprestimo = new Emprestimo(
                dadosRecebidos.aluno.id_aluno,
                dadosRecebidos.livro.id_livro,
                new Date(dadosRecebidos.data_emprestimo),
                dadosRecebidos.status_emprestimo ?? "",
                dadosRecebidos.data_devolucao ? new Date(dadosRecebidos.data_devolucao) : undefined
            );

            // Chama o serviço para cadastrar o empréstimo
            const result = await Emprestimo.cadastrarEmprestimo(emprestimo);

            if (result) {
                // Retorna a resposta de sucesso com o ID do novo empréstimo
                return res.status(201).json({ mensagem: 'Empréstimo cadastrado com sucesso.' });
            } else {
                return res.status(500).json({ mensagem: 'Não foi possível cadastrar o livro no banco de dados.' });
            }
        } catch (error) {
            console.error('Erro ao cadastrar empréstimo:', error);
            return res.status(500).json({ mensagem: 'Erro ao cadastrar o empréstimo.' });
        }
    }

    /**
     * Atualiza um empréstimo existente.
     * Recebe os dados do empréstimo a partir da requisição e passa para o serviço.
     */
    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const dadosRecebidos: EmprestimoDTO = req.body;
            const idEmprestimo = parseInt(req.params.id as string);

            // Chama o MODEL para atualizar o empréstimo/ Number(idEmprestimo) converte o idEmprestimo de string para number
            const result = await Emprestimo.atualizarEmprestimo(
                idEmprestimo,
                dadosRecebidos.aluno.id_aluno,
                dadosRecebidos.livro.id_livro,
                new Date(dadosRecebidos.data_emprestimo),
                dadosRecebidos.data_devolucao ? new Date(dadosRecebidos.data_devolucao) : new Date(),
                dadosRecebidos.status_emprestimo ?? ""
            );

            if (result) {
                // Retorna a resposta de sucesso com o ID do empréstimo atualizado
                return res.status(200).json({ mensagem: 'Empréstimo atualizado com sucesso.' });
            } else {
                return res.status(500).json({ mensagem: 'Não foi possível cadastrar o livro no banco de dados.' });
            }
        } catch (error) {
            console.error('Erro ao atualizar empréstimo:', error);
            return res.status(500).json({ mensagem: 'Erro ao atualizar o empréstimo.' });
        }
    }

    /**
    * Método para remover um empréstimo do banco de dados
    * 
    * @param req Objeto de requisição HTTP com o ID do aluno a ser removido.
    * @param res Objeto de resposta HTTP.
    * @returns Mensagem de sucesso ou erro em formato JSON.
    */
    static async remover(req: Request, res: Response): Promise<Response> {
        // tenta executar a remoção do registro
        try {
            // id do empréstimo vindo do cliente
            const idEmprestimo = parseInt(req.params.id as string);
            // executa o método de remoção e armazena o resultado (booleano)
            const resultado = await Emprestimo.removerEmprestimo(idEmprestimo);

            // se o resultdo for true
            if (resultado) {
                // retorna mensagem e sucesso com status 200
                return res.status(200).json({ mensagem: 'Empréstimo removido com sucesso!' });
            } else {
                // retorna mensagem de erro com status 
                return res.status(500).json({ mensagem: 'Erro ao remover empréstimo!' });
            }

            // captura qualquer erro que possa acontecer
        } catch (error) {
            // exibe detalhes do erro no console
            console.log(`Erro ao remover o Empréstimo ${error}`);
            // retorna uma mensagem de erro com status 500
            return res.status(500).json({ mensagem: "Erro ao remover empréstimo." });
        }
    }
}

export default EmprestimoController;