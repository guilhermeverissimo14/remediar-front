import { useEffect, useState } from "react";
import ENDPOINTS from "@/services/endpoints";
import { api } from "@/services/api/api";
import { useDataContext } from "@/contexts/DataContext";

type TotalMedicamentosDoados = {
  quantidade: number;
};

export default function TotalMedicamentosDoados() {
  const [maisDoados, setMaisDoados] = useState<TotalMedicamentosDoados | null>(null);
  const { dataInicio, dataFim } = useDataContext();

  const buscarTotalMedicamentos = async () => {
    const inicioISO = `${dataInicio}T00:00:00`;
    const fimISO = `${dataFim}T23:59:59`;

    try {
      const response = await api.get(`${ENDPOINTS.DASHBOARD.TOTAL_MEDICAMENTOS_DOADOS}`, {
        params: { inicio: inicioISO, fim: fimISO },
      });

      if (response.status === 200) {
        setMaisDoados(response.data);
      } else {
        console.error("Erro ao buscar total de medicamentos doados:", response.status);
        setMaisDoados(null);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Erro ao buscar total de medicamentos doados:", errorMessage);
      setMaisDoados(null);
    }
  };

  useEffect(() => {
    buscarTotalMedicamentos();
  }, [dataInicio, dataFim]);

  const temDados = maisDoados !== null && maisDoados.quantidade > 0;

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
      <h2 className="text-xl font-bold text-gray-800">Total de Medicamentos Doados</h2>
      {temDados ? (
        <p className="text-lg text-gray-700">
          <span className="font-semibold">{maisDoados?.quantidade}</span>
        </p>
      ) : (
        <p className="text-gray-500">Nenhum medicamento doado neste período.</p>
      )}
    </div>
  );
}
