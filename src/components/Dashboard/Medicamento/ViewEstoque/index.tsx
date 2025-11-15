"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MedicacaoData } from "@/utils/types/Medicacao";

export default function VisualizarEstoque() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [medicacao, setMedicacao] = useState<MedicacaoData | null>(null);

  useEffect(() => {
    const medParam = searchParams.get("medicamento");
    if (medParam) {
      const parsedMed: MedicacaoData = JSON.parse(decodeURIComponent(medParam));
      setMedicacao(parsedMed);
    }
  }, [searchParams]);

  if (!medicacao) {
    return <div className="flex justify-center items-center h-96">Carregando...</div>;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3FAFC3]">Detalhes do Medicamento</h1>
        </div>

        <Button variant="outline" onClick={handleBack}>
          Voltar
        </Button>
      </div>

      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nome Comercial" value={medicacao.nomeComercial} />
          <Field label="Princípio Ativo" value={medicacao.principioAtivo} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Apresentação" value={medicacao.apresentacao} />
          <Field label="Código de Barras" value={medicacao.codigoBarras} />
          <Field label="Laboratório" value={medicacao.laboratorio} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Preço Máximo"
            value={
              medicacao.precoMaximo?.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) || "Não informado"
            }
          />
          <Field label="Status" value={medicacao.statusProduto} />
        </div>

        {medicacao.descricao && (
          <div className="grid grid-cols-1">
            <Field label="Descrição" value={medicacao.descricao} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Quantidade" value={String(medicacao.quantidade)} />
        </div>

        {/* Datas de Validade */}
        <div className="mt-8">
            <h2 className="text-lg font-bold text-[#3FAFC3] mb-4">Datas de Validade</h2>
            <div className="flex flex-col gap-2">
                {medicacao.dataValidade ? (
                <div className="px-4 py-2 bg-gray-100 rounded-md text-gray-700">
                    {medicacao.dataValidade}
                </div>
                ) : (
                <p className="text-gray-500">Nenhuma data de validade registrada.</p>
                )}
            </div>
            </div>
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
      <Input value={value} readOnly className="bg-gray-100 cursor-not-allowed" />
    </div>
  );
}
