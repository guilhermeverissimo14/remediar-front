import { useEffect, useState } from "react";
import ENDPOINTS from "@/services/endpoints";
import { api } from "@/services/api/api";
import { useDataContext } from "@/contexts/DataContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface FaixaEtariaPorSolicitacoes {
  faixa_etaria: string;
  quantidade_doacoes: number;
}

export default function FaixaEtariaPorSolicitacoes() {
  const [dados, setDados] = useState<FaixaEtariaPorSolicitacoes[]>([]);
  const { dataInicio, dataFim } = useDataContext();

  const buscarFaixaEtaria = async () => {
    const inicioISO = `${dataInicio}T00:00:00`;
    const fimISO = `${dataFim}T23:59:59`;
    try {
      const response = await api.get(
        `${ENDPOINTS.DASHBOARD.FAIXA_ETARIA_POR_SOLICITACAO}`,
        {
          params: { inicio: inicioISO, fim: fimISO },
        }
      );
      if (response.status === 200) {
        setDados(response.data);
      } else {
        setDados([]);
      }
    } catch {
      setDados([]);
    }
  };

  useEffect(() => {
    buscarFaixaEtaria();
  }, [dataInicio, dataFim]);

  const temDados = dados.some((d) => d.quantidade_doacoes > 0);

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3 w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800">Faixa Etária por Solicitações</h2>
      {temDados ? (
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={dados} margin={{ top: 20, right: 40, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="faixa_etaria" interval={0} angle={-20} dy={20} tick={{ fontSize: 13 }} />
            <YAxis allowDecimals={false} />
            <Tooltip formatter={(value: number) => [value, "Doações"]} />
            <Bar dataKey="quantidade_doacoes" fill="#1a9cbf" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500">Nenhuma doação registrada nesse período.</p>
      )}
    </div>
  );
}
