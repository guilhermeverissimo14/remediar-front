export type User = {
    id: string;
    login: string;
    role: string;
    nome: string;
};

export type AuthResponse = {
    Token: string;
};

export type RespostaCadastro = {
    id: number;
};

export type Endereco = {
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento?: string;
};

export type UsuarioInterno = {
    login: string;
    password: string;
    role: string;
};

export type DadosCadastro = {
    nome: string;
    documento: string;
    telefone: string;
    dataNascimento: string;
    escolaridade: string;
    genero: string;
    qtdPessoasCasa: number;
    rendaFamiliar: number;
    endereco: Endereco;
    user: UsuarioInterno;
};

