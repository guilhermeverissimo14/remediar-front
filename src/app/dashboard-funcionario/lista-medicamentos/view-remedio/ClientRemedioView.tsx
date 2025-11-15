"use client";

import { useSearchParams } from "next/navigation";
import VisualizarMedicamento from "@/components/Dashboard/Medicamento/index";

export default function ClientRemedioView() {
  const searchParams = useSearchParams();
  const medicamentoParam = searchParams.get("medicamento");

  if (!medicamentoParam) {
    return <div className="flex justify-center items-center h-96">Medicamento não encontrado.</div>;
  }

  try {
    const medicamento = JSON.parse(decodeURIComponent(medicamentoParam));
    // Você pode passar `medicamento` para `VisualizarMedicamento` se ele aceitar props
    return <VisualizarMedicamento medicamento={medicamento} />;
  } catch (error) {
    console.error("Erro ao parsear medicamento:", error);
    return <div className="flex justify-center items-center h-96">Dados inválidos.</div>;
  }
}
