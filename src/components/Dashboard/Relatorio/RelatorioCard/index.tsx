
type RequestData = {
  primeiroNumero: number;
  segundoNumero: number;
  terceiroNumero: number;
};

type RequestLabels = {
  primeiroTexto: string;
  segundoTexto: string;
  terceiroTexto: string;
};

type RelatorioCardProps = {
  titulo: string;
  dados: RequestData;
  textos: RequestLabels;
};

export default function RelatorioCard({ titulo, dados, textos }: RelatorioCardProps) {
    const valores = Object.values(dados);
    const labels = Object.values(textos);


  return (
    <div className="w-full flex flex-col gap-3 border rounded p-4">
      <div>
        <h2 className="text-2xl font-semibold">{titulo}</h2>
      </div>
      <div className="flex flex-col gap-2">
        {labels.map((label, index) => (
          <div key={index} className="flex flex-row gap-2 items-center">
            <span>{label}:</span>
            <span className="font-semibold">{valores[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
