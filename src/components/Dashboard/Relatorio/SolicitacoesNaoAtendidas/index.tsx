import { useEffect, useState } from "react";
import ENDPOINTS from "@/services/endpoints";
import { api } from "@/services/api/api";
import { useDataContext } from "@/contexts/DataContext";

type SolicitacoesNaoAtendidas = {
  quantidadeSolicitacoes: number;
  quantidadeMedicamentos: number;
};

export default function SolicitacoesNaoAtendidas() {
  const [dados, setDados] = useState<SolicitacoesNaoAtendidas | null>(null);
  const { dataInicio, dataFim } = useDataContext();

  const buscarSolicitacoesNaoAtendidas = async () => {
    const inicioISO = `${dataInicio}T00:00:00`;
    const fimISO = `${dataFim}T23:59:59`;

    try {
      const response = await api.get(`${ENDPOINTS.DASHBOARD.TOTAL_SOLICITACOES_NAO_ATENDIDAS}`, {
        params: { inicio: inicioISO, fim: fimISO },
      });

      if (response.status === 200) {
        setDados(response.data);
      } else {
        console.error("Erro ao buscar solicitações não atendidas:", response.status);
        setDados(null);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Erro ao buscar solicitações não atendidas:", err.message);
      } else {
        console.error("Erro ao buscar solicitações não atendidas:", err);
      }
      setDados(null);
    }
  };

  useEffect(() => {
    buscarSolicitacoesNaoAtendidas();
  }, [dataInicio, dataFim]);

  const temDados = dados !== null && (dados.quantidadeSolicitacoes > 0 || dados.quantidadeMedicamentos > 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
      <h2 className="text-xl font-bold text-gray-800">Solicitações Não Atendidas</h2>
      {temDados ? (
        <>
          <p className="text-lg text-gray-700">Total de Solicitações: <span className="font-semibold">{dados?.quantidadeSolicitacoes}</span></p>
          <p className="text-lg text-gray-700">Total de Medicamentos: <span className="font-semibold">{dados?.quantidadeMedicamentos}</span></p>
        </>
      ) : (
        <p className="text-gray-500">Nenhuma solicitação sem atendimento nesse período.</p>
      )}
    </div>
  );
}
