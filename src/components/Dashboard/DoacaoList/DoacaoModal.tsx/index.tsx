"use client";

import { X } from "lucide-react";

interface DoacaoModalProps {
  data: {
    solicitacao: {
      statusAtual: string;
      dataHoraCriacao: string;
      dataHoraUltimaAtualizacao: string;
      funcionarioResponsavelAtual: {
        nome: string;
      } | null;
    };
    itensDoacao: {
      item: {
        nomeComercialOrPrincipioAtivo: string;
        quantidade: number;
      };
      dataValidade: string;
      imagem: string;
    }[];
  };
  onClose: () => void;
}

export function DoacaoModal({ data, onClose }: DoacaoModalProps) {
  const item = data.itensDoacao[0];

  // Corrigindo a imagem que pode vir com prefixo duplicado
  const rawImage = item.imagem;
  const cleanedImage = rawImage.replace(/^data:image\/[a-z]+;base64,/, "");
  const imagemSrc = `data:image/jpeg;base64,${cleanedImage}`;

  const statusMap: Record<string, string> = {
    PENDENTE: "text-yellow-600 bg-yellow-100",
    EM_ANALISE: "text-blue-600 bg-blue-100",
    APROVADA: "text-green-600 bg-green-100",
    CONCLUIDA: "text-emerald-700 bg-emerald-100",
    CANCELADA: "text-red-600 bg-red-100",
  };

  const statusStyle = statusMap[data.solicitacao.statusAtual] || "text-gray-700 bg-gray-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-center text-gray-800">Detalhes da Doação</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p><strong>Medicamento:</strong> {item.item.nomeComercialOrPrincipioAtivo}</p>
            <p><strong>Quantidade:</strong> {item.item.quantidade}</p>
            <p><strong>Validade:</strong> {item.dataValidade}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`px-2 py-1 rounded text-xs font-medium ${statusStyle}`}>
                {data.solicitacao.statusAtual}
              </span>
            </p>
          </div>
          <div>
            <p>
              <strong>Funcionário Responsável:</strong>{" "}
              {data.solicitacao.funcionarioResponsavelAtual?.nome || (
                <span className="italic text-gray-500">Funcionário ainda não atribuído</span>
              )}
            </p>
            <p><strong>Data de Criação:</strong> {data.solicitacao.dataHoraCriacao}</p>
            <p><strong>Última Atualização:</strong> {data.solicitacao.dataHoraUltimaAtualizacao}</p>
          </div>
        </div>

        <div className="border rounded overflow-hidden max-h-56 mt-4">
          <img
            src={imagemSrc}
            alt="Imagem do medicamento"
            className="w-full h-56 object-contain bg-white"
            onError={(e) => {
                (e.target as HTMLImageElement).src =
                    "data:image/jpeg;base64,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";
                }}
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
