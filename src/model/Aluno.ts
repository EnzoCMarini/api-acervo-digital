class Aluno {

    private id_aluno: number = 0;
    private ra: string = "";
    private nome: string;
    private sobrenome: string;
    private data_nascimento: Date;
    private endereco: string;
    private email: string;
    private celular: string;

    constructor(
        _nome: string,
        _sobrenome: string,
        _data_nascimento: Date,
        _endereco: string,
        _email: string,
        _celular?: string
    ) {
        this.nome = _nome;
        this.sobrenome = _sobrenome;
        this.data_nascimento = _data_nascimento;
        this.endereco = _endereco;
        this.email = _email;
        this.celular = _celular ?? "";
    }

    // id_aluno
    public getIdAluno(): number {
        return this.id_aluno;
    }

    public setIdAluno(id_aluno: number): void {
        this.id_aluno = id_aluno;
    }

    // ra
    public getRa(): string {
        return this.ra;
    }

    public setRa(ra: string): void {
        this.ra = ra;
    }

    // nome
    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    // sobrenome
    public getSobrenome(): string {
        return this.sobrenome;
    }

    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    // data_nascimento
    public getDataNascimento(): Date {
        return this.data_nascimento;
    }

    public setDataNascimento(data_nascimento: Date): void {
        this.data_nascimento = data_nascimento;
    }

    // endereco
    public getEndereco(): string {
        return this.endereco;
    }

    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    // email
    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    // celular
    public getCelular(): string {
        return this.celular;
    }

    public setCelular(celular: string): void {
        this.celular = celular;
    }
}

export default Aluno;