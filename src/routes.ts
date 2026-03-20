import { Router, type Request, type Response } from "express";
import AlunoController from "./controller/AlunoController.js";
import LivroController from "./controller/LivroController.js";
import EmprestimoController from "./controller/EmprestimoController.js";

const router = Router();

// Rota raiz — health check para verificar se a API está no ar
router.get('/', (req: Request, res: Response) => {
    return res
        .status(200)
        .json(`Aplicação online. Timestamp: ${new Date()}`);
});

// ==================== ROTAS DE ALUNO ====================

// Lista todos os alunos ativos
router.get('/api/alunos', AlunoController.todos);

// Busca um aluno pelo ID (ex: /api/alunos/3)
router.get('/api/alunos/:id', AlunoController.aluno);

// Cadastra um novo aluno (dados chegam no body)
router.post('/api/alunos', AlunoController.cadastrar);

// Remove logicamente o aluno com o ID informado
router.delete('/api/alunos/:id', AlunoController.remover);

// Atualiza os dados do aluno com o ID informado
router.put('/api/alunos/:id', AlunoController.atualizar);

// ==================== ROTAS DE LIVRO ====================

// Lista todos os livros ativos
router.get('/api/livros', LivroController.todos);

// Busca um livro pelo ID (ex: /api/livros/5)
router.get('/api/livros/:id', LivroController.livro);

// Cadastra um novo livro (dados chegam no body)
router.post('/api/livros', LivroController.cadastrar);

// Remove logicamente o livro e seus empréstimos relacionados
router.delete('/api/livros/:id', LivroController.remover);

// Atualiza os dados do livro com o ID informado
router.put('/api/livros/:id', LivroController.atualizar);

// ==================== ROTAS DE EMPRÉSTIMO ====================

// Lista todos os empréstimos ativos (com dados do aluno e livro via JOIN)
router.get('/api/emprestimos', EmprestimoController.todos);

// Busca um empréstimo pelo ID (ex: /api/emprestimos/2)
router.get('/api/emprestimos/:id', EmprestimoController.emprestimo);

// Cadastra um novo empréstimo (dados chegam no body com IDs de aluno e livro)
router.post('/api/emprestimos', EmprestimoController.cadastrar);

// Remove logicamente o empréstimo com o ID informado
router.delete('/api/emprestimos/:id', EmprestimoController.remover);

// Atualiza os dados do empréstimo com o ID informado
router.put('/api/emprestimos/:id', EmprestimoController.atualizar);

export { router };