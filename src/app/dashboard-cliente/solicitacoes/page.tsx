"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Dashboard/layouts/dashboardLayout";
import { Boxes } from "lucide-react";
import {
  ConfiguracaoClienteItems,
  menuPrincipalClienteItems,
} from "@/utils/constants";
import { api } from "@/services/api/api";
import ENDPOINTS from "@/services/endpoints";
import { SolicitacoesTable } from "@/components/Dashboard/SolicitacoesList";
import { SearchBarSolicitacoes } from "@/components/Dashboard/searchbar/searchbar-solicitacoes-cliente";
import SolicitacaoForm from "@/components/Dashboard/FormsParaCadastro/FormSolicitacaoRemedio";
import { useAuth } from "@/contexts/AuthContext";

export default function ListaSolicitacoes() {
  const { user } = useAuth();
  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [filtradas, setFiltradas] = useState<any[]>([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [modoEntregaFiltro, setModoEntregaFiltro] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchSolicitacoes = async () => {
    if (!user?.id) return;

    try {
      const { data } = await api.get(
        `${ENDPOINTS.PEDIDOS.CRUD.replace("/pedidos", "")}/pesquisar/pedidos/autorId/${user.id}`
      );
      setSolicitacoes(data);
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
    }
  };

  useEffect(() => {
    fetchSolicitacoes();
  }, [user?.id]);

  useEffect(() => {
    const lowerText = filtroTexto.toLowerCase();

    const resultado = solicitacoes.filter((sol) => {
      const nome = sol.prescricaoMedica?.nomePaciente?.toLowerCase() || "";
      const id = sol.solicitacao?.id?.toLowerCase() || "";

      const matchesTexto = nome.includes(lowerText) || id.includes(lowerText);
      const matchesStatus = statusFiltro
        ? sol.solicitacao.statusAtual === statusFiltro
        : true;
      const matchesModo = modoEntregaFiltro
        ? sol.modoEntrega === modoEntregaFiltro
        : true;

      return matchesTexto && matchesStatus && matchesModo;
    });

    setFiltradas(resultado);
  }, [filtroTexto, statusFiltro, modoEntregaFiltro, solicitacoes]);

  return (
    <DashboardLayout
      title="Solicitações de Medicamentos"
      Icon={() => <Boxes />}
      menuPrincipalItems={menuPrincipalClienteItems}
      configuracaoItems={ConfiguracaoClienteItems}
    >
      <div className="flex flex-col gap-6">
        <SearchBarSolicitacoes
          setFiltroTexto={setFiltroTexto}
          setStatusFiltro={setStatusFiltro}
          setModoEntregaFiltro={setModoEntregaFiltro}
          onNovaSolicitacaoClick={() => setIsFormOpen(true)}
        />

        <SolicitacoesTable data={filtradas} />

        <div className="flex justify-between mt-4"></div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl animate-fade-in">
            <SolicitacaoForm
              closeModal={() => {
                setIsFormOpen(false);
                fetchSolicitacoes();
              }}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
