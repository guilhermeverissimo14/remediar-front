import { useEffect, useState } from "react";
import ENDPOINTS from "@/services/endpoints";
import { api } from "@/services/api/api";
import { useDataContext } from "@/contexts/DataContext";

type TotalMedicamentosVencidos = {
  quantidade: number;
};

export default function TotalMedicamentosVencidos() {
  const [dados, setDados] = useState<TotalMedicamentosVencidos | null>(null);
  const { dataInicio, dataFim } = useDataContext();

  const buscarTotalMedicamentosVencidos = async () => {
    const inicioISO = `${dataInicio}T00:00:00`;
    const fimISO = `${dataFim}T23:59:59`;

    try {
      const response = await api.get(`${ENDPOINTS.DASHBOARD.TOTAL_MEDICAMENTOS_VENCIDOS}`, {
        params: { inicio: inicioISO, fim: fimISO },
      });

      if (response.status === 200) {
        setDados(response.data);
      } else {
        console.error("Erro ao buscar total de medicamentos vencidos:", response.status);
        setDados(null);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Erro ao buscar total de medicamentos vencidos:", err.message);
      } else {
        console.error("Erro ao buscar total de medicamentos vencidos:", err);
      }
      setDados(null);
    }
  };

  useEffect(() => {
    buscarTotalMedicamentosVencidos();
  }, [dataInicio, dataFim]);

  const temDados = dados !== null && dados.quantidade > 0;

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
      <h2 className="text-xl font-bold text-gray-800">Total de Medicamentos à Vencer</h2>
      {temDados ? (
        <p className="text-lg text-gray-700">
          <span className="font-semibold">{dados?.quantidade}</span>
        </p>
      ) : (
        <p className="text-gray-500">Nenhum medicamento com vencimento neste período.</p>
      )}
    </div>
  );
}
