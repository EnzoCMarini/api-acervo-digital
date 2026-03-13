export default interface AlunoDTO {
    id_aluno?: number,
    ra?: string,
    nome: string,
    sobrenone: string,
    data_nascimento: Date,
    endereco: string,
    email: string,
    celular?: string
}