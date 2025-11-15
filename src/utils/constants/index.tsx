import { LayoutDashboard, Boxes, FileText, Pill, DollarSign, User, Settings, LogOut, ClipboardList } from "lucide-react"

export const menuPrincipalItems = [
    { nome: "Visão Geral", url: "/dashboard-funcionario", icon: LayoutDashboard },
    { nome: "Gerenciar Estoque", url: "/dashboard-funcionario/gerenciar-estoque", icon: Boxes },
    { nome: "Lista de Medicamentos", url: "/dashboard-funcionario/lista-medicamentos", icon: ClipboardList },
    { nome: "Solicitações", url: "/dashboard-funcionario/solicitacoes", icon: FileText },
    { nome: "Doação de Remédio", url: "/dashboard-funcionario/gerenciar-doacoes", icon: Pill },
    { nome: "Doação Financeira", url: "/dashboard-funcionario/doacao-financeira", icon: DollarSign }
];

export const ConfiguracaoItems = [
    { nome: "Gerenciar Funcionários", url: "/dashboard-funcionario/gerenciar-funcionarios", icon: User },
    { nome: "Configurações", url: "/dashboard-funcionario/configuracoes", icon: Settings },
    { nome: "Sair", url: "/", icon: LogOut }
];

export const menuPrincipalClienteItems = [
    { nome: "Visão Geral", url: "/dashboard-cliente", icon: LayoutDashboard },
    { nome: "Solicitações", url: "/dashboard-cliente/solicitacoes", icon: FileText },
    { nome: "Doação de Remédio", url: "/dashboard-cliente/doacao-remedio", icon: Pill },
    { nome: "Doação Financeira", url: "/dashboard-cliente/doacao-financeira", icon: DollarSign }
];

export const ConfiguracaoClienteItems = [
    { nome: "Configurações", url: "/dashboard-cliente/configuracoes", icon: Settings },
    { nome: "Sair", url: "/", icon: LogOut }
];

export const userDropdownItems = [
    { label: "Meu Perfil", url: "/configuracoes", icon: User },
    { label: "Configurações", url: "/configuracoes", icon: Settings },
    { label: "Sair", url: "/", icon: LogOut }
  ];

  
  