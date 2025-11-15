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
import { DoacoesTable } from "@/components/Dashboard/DoacaoList";
import { SearchBarDoacoes } from "@/components/Dashboard/searchbar/searchBar-doacao-cliente";
import FormDoacao from "@/components/Dashboard/FormsParaCadastro/FormDoacao";
import { useAuth } from "@/contexts/AuthContext";

export default function ListaDoacoes() {
  const { user } = useAuth();
  const [doacoes, setDoacoes] = useState<any[]>([]);
  const [filtradas, setFiltradas] = useState<any[]>([]);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchDoacoes = async () => {
    if (!user?.id) return;
    try {
      const { data } = await api.get(
        `/solicitacoes/pesquisar/doacoes/autorId/${user.id}`
      );
      setDoacoes(data);
    } catch (error) {
      console.error("Erro ao buscar doações:", error);
    }
  };

  useEffect(() => {
    fetchDoacoes();
  }, [user]);

  useEffect(() => {
    const lower = filtroTexto.toLowerCase();

    const resultado = doacoes.filter((doacao: any) => {
      const nomeMedicamento =
        doacao.itensDoacao[0]?.item?.nomeComercialOrPrincipioAtivo?.toLowerCase() || "";
      const id = doacao.solicitacao?.id?.toLowerCase() || "";
      const status = doacao.solicitacao?.statusAtual;

      const matchesTexto = id.includes(lower) || nomeMedicamento.includes(lower);
      const matchesStatus =
        statusFiltro === "TODOS" || !statusFiltro ? true : status === statusFiltro;

      return matchesTexto && matchesStatus;
    });

    setFiltradas(resultado);
  }, [filtroTexto, statusFiltro, doacoes]);

  return (
    <DashboardLayout
      title="Doações de Medicamentos"
      Icon={() => <Boxes />}
      menuPrincipalItems={menuPrincipalClienteItems}
      configuracaoItems={ConfiguracaoClienteItems}
    >
      <div className="flex flex-col gap-6">
        <SearchBarDoacoes
          setFiltroTexto={setFiltroTexto}
          setStatusFiltro={setStatusFiltro}
          onNovaDoacaoClick={() => setIsFormOpen(true)}
        />

        <DoacoesTable data={filtradas} />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl animate-fade-in">
            <FormDoacao
              closeModal={() => {
                setIsFormOpen(false);
                fetchDoacoes();
              }}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
