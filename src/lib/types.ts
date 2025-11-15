export interface Solicitation {
    id: string;
    dadosPessoais: {
      nome: string;
      documento: string;
      telefone: string;
      email: string;
      endereco: string;
    };
    itemSolicitacao: {
      medicamento: string;
      quantidade: number;
      modoEntrega: string;
      dataSolicitacao: string;
    };
    prescricaoMedica: {
      data: string;
      nomePaciente: string;
      idadePaciente: string;
      genero: string;
      cpf: string;
      contato: string;
      dispensada: string;
      usoContinuo: string;
      nomeMedico: string;
      crm: string;
      imagemReceita: string;
    };
    status: "PENDENTE" | "EM_ANALISE" | "APROVADA" | "REJEITADA" | 
            "CONCLUIDA" | "CANCELADA" | "SEPARADA" | "AGUARDANDO_RETIRADA";
    responsavel?: string;
    historico: Array<{
      id: number;      
      solicitacaoId: string;
      dataHora: string;
      funcionario: string | null;
      status: string;
      observacao: string;
    }>;
  }
  