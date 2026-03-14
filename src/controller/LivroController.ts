import Livro from "../model/Livro.js";
import { type Request, type Response } from "express";

class LivroController extends Livro {
    static async todos(req: Request, res: Response) {
        try {
            const listaDeLivros = await Livro.listarLivros();
            return res.status(200).json(listaDeLivros);
        } catch (error) {
            console.error(`Erro ao listar livros: ${error}`);
            return res.status(500).json({ mensagem: "Erro ao recuperar as informações dos livros." });
        }
    }

    static async livro(req: Request, res: Response) {
        try {
            const idLivro = parseInt(req.params.id as string);

            const livro = await Livro.listarLivro(idLivro);
            res.status(200).json(livro);
        } catch (error) {
            console.log(`Erro ao acessar método herdado: ${error}`);    // Exibe erros da consulta no console
            res.status(500).json("Erro ao recuperar as informações do livro.");  // Retorna mensagem de erro com status code 400
        }
    }

}

export default LivroController;