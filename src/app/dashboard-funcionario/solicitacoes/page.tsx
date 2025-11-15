"use client";

import { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";
import { ptBR } from 'date-fns/locale/pt-BR';
import { ConfiguracaoItems, menuPrincipalItems } from "@/utils/constants";
registerLocale('pt-BR', ptBR);
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/Dashboard/layouts/dashboardLayout";
import { SolicitacaoForm } from "@/components/FormsExibirDados/FormsSolicitacao";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BellRing,
  User,
  Pill,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  ShoppingBag,
  Search,
  Package,
  Truck,
  X,
} from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster, toast } from "sonner";
import { api } from "@/services/api/api";
import ENDPOINTS from "@/services/endpoints";
import axios from "axios";
import { AxiosError, isAxiosError } from 'axios';

type Usuario = {
  id: number;
  nome: string;
  documento: string;
  telefone: string;
  email: string;
  endereco: string;
  genero: string;
  dataNascimento: string;
  escolaridade: string;
};


type Solicitation = {
  id: string;
  dadosPessoais: {
    nome: string;
    email: string;
    documento: string;
    endereco: string;
    telefone: string;
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
  historico: Array<{
    id: number;
    solicitacaoId: string;
    funcionario: string | null;
    status: string;
    observacao: string;
    dataHora: string;
  }>;
  status: "PENDENTE" | "EM_ANALISE" | "APROVADA" | "REJEITADA" | "CONCLUIDA" | "CANCELADA" | "SEPARADA" | "AGUARDANDO_RETIRADA";
  responsavel?: string;
};

interface SolicitacaoResponse {
  content: Solicitation[];
  totalPages: number;
  number: number;
}

interface ErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
}

const transformSolicitacaoAPI = (apiData: any): Solicitation => ({
  id: apiData.solicitacao.id,
  dadosPessoais: {
    nome: apiData.solicitacao.usuario.nome,
    documento: apiData.solicitacao.usuario.documento,
    telefone: apiData.solicitacao.usuario.telefone,
    email: "Não informado",
    endereco: "Não informado",
  },
  itemSolicitacao: {
    medicamento: apiData.item.nomeComercialOrPrincipioAtivo || "Desconhecido",
    quantidade: apiData.item.quantidade,
    modoEntrega: apiData.modoEntrega,
    dataSolicitacao: parseCustomDate(apiData.solicitacao.dataHoraCriacao).toLocaleString("pt-BR"),
  },
  prescricaoMedica: {
    data: parseCustomDate(apiData.prescricaoMedica.dataEmissao).toLocaleDateString("pt-BR"),
    nomePaciente: apiData.prescricaoMedica.nomePaciente,
    idadePaciente: apiData.prescricaoMedica.idadePaciente.toString(),
    genero: apiData.prescricaoMedica.generoPaciente,
    cpf: apiData.prescricaoMedica.cpfPaciente,
    contato: apiData.prescricaoMedica.contato,
    dispensada: apiData.prescricaoMedica.dispensada ? "Sim" : "Não",
    usoContinuo: apiData.prescricaoMedica.usoContinuo ? "Sim" : "Não",
    nomeMedico: apiData.prescricaoMedica.nomeMedico,
    crm: apiData.prescricaoMedica.crmMedico,
    imagemReceita: apiData.prescricaoMedica.imageUrl,
  },
  status: apiData.solicitacao.statusAtual,
  historico: apiData.solicitacao.historico.map((h: any) => ({
    id: h.id,
    solicitacaoId: h.solicitacaoId,
    dataHora: parseCustomDate(h.dataHora).toLocaleString("pt-BR"),
    funcionario: h.funcionario || null,
    status: h.status,
    observacao: h.observacao,
  })),
  responsavel: apiData.solicitacao.funcionarioResponsavelAtual?.nome || undefined,
});


const parseCustomDate = (dateString: string): Date => {
  const [datePart, timePart] = dateString.split(' ');
  const [day, month, year] = datePart.split('/').map(Number);

  if (timePart) {
    const [hours, minutes] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }

  return new Date(year, month - 1, day);
};

const renderStatus = (status: string) => {
  switch (status) {
    case "PENDENTE":
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case "EM_ANALISE":
      return <Search className="w-5 h-5 text-blue-500" />;
    case "APROVADA":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "REJEITADA":
    case "CANCELADA":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "CONCLUIDA":
      return <ShoppingBag className="w-5 h-5 text-purple-500" />;
    case "SEPARADA":
      return <Package className="w-5 h-5 text-orange-500" />;
    case "AGUARDANDO_RETIRADA":
      return <Truck className="w-5 h-5 text-indigo-500" />;
    default:
      return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

export default function GerenciarSolicitacoes() {
  const [data, setData] = useState<Solicitation[]>([]);
  const [selectedSolicitation, setSelectedSolicitation] = useState<Solicitation | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const currentUser = {
    id: "user-id-exemplo",
    nome: "Funcionário Exemplo"
  };

  const fetchSolicitacoes = async (pageNumber = 0) => {
    try {
      const { data } = await api.get<SolicitacaoResponse>(
        `${ENDPOINTS.PEDIDOS.CRUD}?page=${pageNumber}&size=10`
      );
      setData(data.content.map(transformSolicitacaoAPI));
      setTotalPages(data.totalPages);
      setCurrentPage(data.number);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
      toast.error("Erro ao carregar solicitações");
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, []);

  const handleStatusChange = (solicitacaoId: string, newStatus: string) => {
    setData(prevData => 
      prevData.map(solicitacao => 
        solicitacao.id === solicitacaoId 
          ? { ...solicitacao, status: newStatus as Solicitation['status'] } 
          : solicitacao
      )
    );
    
    setSelectedSolicitation(null);
    api.patch(`${ENDPOINTS.PEDIDOS.CRUD}/${solicitacaoId}/status`, {
      status: newStatus,
      funcionarioId: currentUser.id
    });
  };

  const columns: ColumnDef<Solicitation>[] = [
    {
      accessorFn: (row) => row.dadosPessoais.nome,
      id: "nomeSolicitante",
      header: () => (
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Nome do Solicitante
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-gray-600" />
          <div className="flex flex-col">
            <span>{row.original.dadosPessoais.nome}</span>
            <span className="text-sm text-gray-500">{row.original.dadosPessoais.email}</span>
          </div>
        </div>
      ),
    },
    {
      accessorFn: (row) => row.itemSolicitacao.medicamento,
      id: "medicamento",
      header: () => (
        <div className="flex items-center gap-2">
          <Pill className="w-5 h-5" />
          Medicamento
        </div>
      ),
    },
    {
      accessorFn: (row) => row.itemSolicitacao.dataSolicitacao,
      id: "dataSolicitacao",
      header: () => (
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Data e Hora da Solicitação
        </div>
      ),
      filterFn: (row, columnId, filterValue) => {
        const rawValue = row.getValue<string>(columnId); 
        if (!rawValue) return false;

        try {
          const rowDate = parseCustomDate(rawValue);
          const start = filterValue?.startDate;
          const end = filterValue?.endDate;
          const startDate = start ? new Date(start.setHours(0, 0, 0, 0)) : null;
          const endDate = end ? new Date(end.setHours(23, 59, 59, 999)) : null;

          return (!startDate || rowDate >= startDate) &&
            (!endDate || rowDate <= endDate);
        } catch {
          return false;
        }
      }
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Status
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {renderStatus(row.original.status)}
          <span className="capitalize">{row.original.status.toLowerCase().replace(/_/g, ' ')}</span>
        </div>
      ),
    },
  ];

  const parseCustomDate = (dateString: string): Date => {
    const [datePart, timePart] = dateString.replace(',', '').split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours = 0, minutes = 0] = timePart?.split(':').map(Number) || [];
    return new Date(year, month - 1, day, hours, minutes);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <DashboardLayout
      title="Solicitações"
      Icon={() => <BellRing />}
      menuPrincipalItems={menuPrincipalItems}
      configuracaoItems={ConfiguracaoItems}
    >
      <div className="w-full flex flex-col justify-center">
        <div className="w-full">
          <div className="flex items-center py-4 gap-2 flex-wrap">
            <Input
              placeholder="Filtrar por Solicitante"
              value={(table.getColumn("nomeSolicitante")?.getFilterValue() as string) ?? ""}
              onChange={(e) => table.getColumn("nomeSolicitante")?.setFilterValue(e.target.value)}
              className="max-w-sm"
            />

            <Input
              placeholder="Filtrar por medicamento"
              value={(table.getColumn("medicamento")?.getFilterValue() as string) ?? ""}
              onChange={(e) => table.getColumn("medicamento")?.setFilterValue(e.target.value)}
              className="max-w-sm"
            />

            <div className="relative z-40">
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  const [start, end] = update;
                  setDateRange([start, end]);
                  table.getColumn("dataSolicitacao")?.setFilterValue({
                    startDate: start,
                    endDate: end ? new Date(end.setHours(23, 59, 59, 999)) : null
                  });
                }}
                dateFormat="dd/MM/yyyy"
                isClearable
                locale={ptBR}
                calendarStartDay={1}
                showMonthDropdown
                showYearDropdown
                useShortMonthInDropdown
                dropdownMode="select"
                popperClassName="z-40"
                customInput={
                  <Button variant="outline" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    {startDate || endDate ? (
                      `${startDate?.toLocaleDateString('pt-BR') || ''} - ${endDate?.toLocaleDateString('pt-BR') || ''}`
                    ) : (
                      "Filtrar por data"
                    )}
                  </Button>
                }
              />
            </div>

            <Select
              onValueChange={(value) => {
                table.getColumn("status")?.setFilterValue(value === "todos" ? "" : value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="PENDENTE">Pendente</SelectItem>
                <SelectItem value="EM_ANALISE">Em Análise</SelectItem>
                <SelectItem value="APROVADA">Aprovada</SelectItem>
                <SelectItem value="EM_SEPARACAO">Em Separação</SelectItem>
                <SelectItem value="AGUARDANDO_RETIRADA">Aguardando Retirada</SelectItem>
                <SelectItem value="CONCLUIDA">Concluída</SelectItem>
                <SelectItem value="SEPARADA">Separada</SelectItem>
                <SelectItem value="REJEITADA">Rejeitada</SelectItem>
                <SelectItem value="CANCELADA">Cancelada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <div className="relative h-[500px] overflow-auto">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 z-20 bg-white dark:bg-gray-950 shadow-sm">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="hover:bg-transparent">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="sticky top-0 z-20 bg-gray-100 dark:bg-gray-800 p-4 border-b text-left"
                          style={{ position: "sticky", top: 0 }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedSolicitation(row.original)}
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-4 border-b">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Dialog open={!!selectedSolicitation} onOpenChange={() => setSelectedSolicitation(null)}>
            <DialogContent className="min-w-full w-full max-w-none h-[90vh] max-h-[90vh] p-0 mx-0 px-4 flex flex-col">
              <div className="flex flex-col h-full relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-6 top-6 z-[100] bg-white/90 backdrop-blur-sm hover:bg-gray-100 rounded-full shadow-lg"
                  onClick={() => setSelectedSolicitation(null)}
                >
                  <X className="w-6 h-6" />
                </Button>

                <DialogHeader className="px-6 pt-6 pb-4 border-b sticky top-0 bg-white z-10">
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <BellRing className="w-6 h-6" />
                    Detalhes da Solicitação
                  </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6">
                  {selectedSolicitation && (
                    <SolicitacaoForm
                      solicitation={selectedSolicitation}
                      onClose={() => setSelectedSolicitation(null)}
                      onStatusChange={(newStatus) =>
                        handleStatusChange(selectedSolicitation.id, newStatus)
                      }
                      currentUser={currentUser}
                    />
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (currentPage > 0) {
                  fetchSolicitacoes(currentPage - 1);
                }
              }}
              disabled={currentPage === 0}
            >
              Anterior
            </Button>
            <span className="text-sm">
              Página {currentPage + 1} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (currentPage < totalPages - 1) {
                  fetchSolicitacoes(currentPage + 1);
                }
              }}
              disabled={currentPage >= totalPages - 1}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}