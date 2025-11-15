import MedicamentosMaisDoados from "./MedicamentosMaisDoados";
import TotalMedicamentosDoados from "./TotalMedicamentosDoados";
import TotalMedicamentosVencidos from "./TotalMedicamentosVencidos";
import SolicitacoesNaoAtendidas from "./SolicitacoesNaoAtendidas";
import FiltroData from "./FiltroData";  
import FaixaEtariaPorSolicitacoes from "./FaixaEtariaPorSolicitacoes";
import { DataProvider } from "@/contexts/DataContext";

export default function RelatorioIndex() {

  return (
    <DataProvider>
      <div className="flex flex-col gap-4">
        <FiltroData /> 

        <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
            <SolicitacoesNaoAtendidas />
          </div>
          <div className="flex-1">
            <TotalMedicamentosDoados />
          </div>
          <div className="flex-1">
            <TotalMedicamentosVencidos />
          </div>
        </div>

         <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
            <FaixaEtariaPorSolicitacoes/>
          </div>
          <div className="flex-1">
            <MedicamentosMaisDoados />
          </div>
        </div>
      </div>
    </DataProvider>
  );
}
