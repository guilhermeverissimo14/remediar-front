"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/Dashboard/layouts/dashboardLayout";
import { Boxes } from "lucide-react";
import { ConfiguracaoItems, menuPrincipalItems } from "@/utils/constants";
import { api } from "@/services/api/api";
import ENDPOINTS from "@/services/endpoints";
import { ListaDoacoes } from "@/components/Dashboard/FuncionarioDoacaoList";
import SearchBarDoacaoFuncionario from "@/components/Dashboard/searchbar/searchBar-doacao-funcionario";

interface DoacaoData {
  id: string;
  nome: string;
  quantidade: number;
  dataValidade: string;
  imagem: string;
  status: string;
}

export default function GerenciarDoacoes() {
  const [filtroTexto, setFiltroTexto] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("TODOS");
  const [doacoes, setDoacoes] = useState<DoacaoData[]>([]);

  const fetchDoacoes = async () => {
    try {
      const { data } = await api.get(`${ENDPOINTS.DOACOES.CRUD}?page=0&size=15`);
      const mapped: DoacaoData[] = data.content.flatMap((item: any) =>
        item.itensDoacao.map((it: any) => ({
          id: item.solicitacao.id,
          nome: it.item.nomeComercialOrPrincipioAtivo,
          quantidade: it.item.quantidade,
          dataValidade: it.dataValidade,
          imagem: it.imagem,
          status: item.solicitacao.statusAtual,
        }))
      );
      setDoacoes(mapped);
    } catch (error) {
      console.error("Erro ao buscar doações:", error);
    }
  };

  useEffect(() => {
    fetchDoacoes();
  }, []);

  const doacoesFiltradas = doacoes.filter((doacao) => {
    const textoFiltrado =
      doacao.nome.toLowerCase().includes(filtroTexto.toLowerCase()) ||
      doacao.id.toLowerCase().includes(filtroTexto.toLowerCase());

    const statusFiltrado =
      statusFiltro === "TODOS" || doacao.status === statusFiltro;

    return textoFiltrado && statusFiltrado;
  });

  return (
    <DashboardLayout
      title="Gerenciar Doações"
      Icon={() => <Boxes />}
      menuPrincipalItems={menuPrincipalItems}
      configuracaoItems={ConfiguracaoItems}
    >
      <div className="flex flex-col gap-6">
        <SearchBarDoacaoFuncionario
          filtroTexto={filtroTexto}
          statusFiltro={statusFiltro}
          setFiltroTexto={setFiltroTexto}
          setStatusFiltro={setStatusFiltro}
        />

        <ListaDoacoes data={doacoesFiltradas} refetchData={fetchDoacoes} />
      </div>
    </DashboardLayout>
  );
}
