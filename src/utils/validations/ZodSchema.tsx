import { z } from "zod";

export const funcionarioSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  genero: z.string().nonempty("Selecione um gênero"),
  dataNascimento: z.string().nonempty("Informe sua data de nascimento"),
  endereco: z.object({
    rua: z.string().nonempty("Endereço obrigatório"),
    numero: z.string().nonempty("Número obrigatório"),
    complemento: z.string().optional(),
    bairro: z.string().nonempty("Bairro obrigatório"),
    cidade: z.string().nonempty("Cidade obrigatória"),
    estado: z.string().min(2, "Estado obrigatório").max(2, "Estado obrigatório"),
    cep: z.string().min(8, "CEP inválido"),
  }),
  usuario: z.object({
    login: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    role: z.literal("FUNCIONARIO"),
  }),
  confirmarSenha: z
    .string()
    .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.usuario.password === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});



export const medicacaoSchema = z.object({
    nome: z.string().min(3, "O nome do medicamento deve ter pelo menos 3 caracteres."),
    dataValidade: z.string().nonempty("A data de validade é obrigatória."),
    dosagem: z.string().nonempty("A dosagem é obrigatória."),
    lote: z.string().nonempty("O número do lote é obrigatório."),
    refrigerado: z.boolean({ message: "Informe se o medicamento deve ser armazenado sob refrigeração." }),
    tarja: z.string().nonempty("O número do tarja é obrigatório."),
    receitaObrigatoria: z.boolean({ message: "Informe se o medicamento requer receita médica para compra." }),
});


export const solicitacaoSchema = z.object({
  item: z.object({
    nomeComercialOrPrincipioAtivo: z.string().min(1, "Medicamento obrigatório"),
    quantidade: z.number().min(1, "Quantidade obrigatória"),
  }),
  modoEntrega: z.enum(["RETIRADA", "ENVIO"], {
    required_error: "Modo de entrega obrigatório",
  }),
  usuarioId: z.number().min(1),
  prescricaoMedica: z.object({
    dataEmissao: z.string().min(1, "Data obrigatória"),
    dispensada: z.boolean(),
    usoContinuo: z.boolean(),
    imageUrl: z.string().optional(),
    nomeMedico: z.string().min(1, "Nome do médico obrigatório"),
    crmMedico: z.string().min(1, "CRM obrigatório"),
    idadePaciente: z.number().min(1, "Idade obrigatória"),
    generoPaciente: z.enum(["MASCULINO", "FEMININO", "OUTRO"]),
    cpfPaciente: z.string().min(11, "CPF inválido"),
    contato: z.string().min(1, "Telefone obrigatório"),
    // ❌ NÃO precisa mais validar nomePaciente do formulário
  }),
});
