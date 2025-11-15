import { useEffect, useState } from "react";
import ENDPOINTS from "@/services/endpoints";
import { api } from "@/services/api/api";
import { useDataContext } from "@/contexts/DataContext";

type MedicamentoMaisDoados = {
  apresentacao: string;
  id: number;
  quantidade: number;
};

export default function MedicamentosMaisDoados() {
  const [maisDoados, setMaisDoados] = useState<MedicamentoMaisDoados[]>([]);
  const { dataInicio, dataFim } = useDataContext();

  const buscarMedicamentos = async () => {
    const inicioISO = `${dataInicio}T00:00:00`;
    const fimISO = `${dataFim}T23:59:59`;

    try {
      const response = await api.get(`${ENDPOINTS.DASHBOARD.REMEDIOS_MAIS_DOADOS}`, {
        params: { inicio: inicioISO, fim: fimISO },
      });

      if (response.status === 200) {
        setMaisDoados(response.data);
      } else {
        console.error("Erro ao buscar medicamentos mais doados:", response.status);
        setMaisDoados([]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Erro ao buscar medicamentos mais doados:", err.message);
      } else {
        console.error("Erro ao buscar medicamentos mais doados:", err);
      }
      setMaisDoados([]);
    }
  };

  useEffect(() => {
    buscarMedicamentos();
  }, [dataInicio, dataFim]);

  const temDados = maisDoados.length > 0;

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800">Remédios Mais Doados</h2>

      <div className="overflow-x-auto">
        {temDados ? (
          <table className="min-w-full border border-gray-300 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Cód.</th>
                <th className="border px-4 py-2 text-left">Apresentação</th>
                <th className="border px-4 py-2 text-left">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {maisDoados.map((med) => (
                <tr key={med.id} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-2">{med.id}</td>
                  <td className="border px-4 py-2">{med.apresentacao}</td>
                  <td className="border px-4 py-2">{med.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500 py-4">Não há dados para apresentar.</p>
        )}
      </div>
    </div>
  );
}
