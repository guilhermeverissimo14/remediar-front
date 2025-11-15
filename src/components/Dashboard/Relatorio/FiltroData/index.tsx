import { useDataContext } from "@/contexts/DataContext";

export default function FiltroData() {
  const { dataInicio, setDataInicio, dataFim, setDataFim } = useDataContext();

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center border p-4 rounded">
      <div>
        <label className="block text-sm font-medium text-gray-700">Data de Início</label>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Data de Fim</label>
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
}
