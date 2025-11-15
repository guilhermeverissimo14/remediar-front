"use client";

import { useState } from "react";
import { X, CheckSquare2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/services/api/api";
import { useAuth } from "@/contexts/AuthContext";
import { DoacaoData } from "..";

interface DoacaoCardProps {
  doacao: DoacaoData;
  onClose: () => void;
  refetchData: () => void;
}

export function DoacaoCard({ doacao, onClose, refetchData }: DoacaoCardProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handlePatch = async (endpoint: string, successMsg: string, errorMsg: string) => {
    if (!user?.id) {
      toast.error("Usuário não autenticado");
      return;
    }

    setLoading(true);
    try {
      await api.patch(endpoint, { funcionarioId: user.id });
      toast.success(successMsg);
      refetchData();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const actions = {
    PENDENTE: {
      label: "Assumir",
      handler: () => handlePatch(`/solicitacoes/${doacao.id}/funcionario`, "Doação assumida com sucesso!", "Erro ao assumir doação")
    },
    EM_ANALISE: {
      confirm: {
        label: "Confirmar",
        handler: () => handlePatch(`/solicitacoes/${doacao.id}/confirmar`, "Doação confirmada com sucesso!", "Erro ao confirmar doação")
      },
      cancel: {
        label: "Cancelar",
        handler: () => handlePatch(`/solicitacoes/${doacao.id}/cancelar`, "Doação cancelada com sucesso!", "Erro ao cancelar doação")
      }
    },
    APROVADA: {
      label: "Concluir",
      handler: () => handlePatch(`/solicitacoes/${doacao.id}/finalizar`, "Doação concluída com sucesso!", "Erro ao concluir doação")
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="relative w-full max-w-xl bg-white rounded-lg shadow-xl p-6 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center">Detalhes da Doação</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p><strong>Medicamento:</strong> {doacao.nome}</p>
            <p><strong>Quantidade:</strong> {doacao.quantidade}</p>
            <p><strong>Validade:</strong> {doacao.dataValidade}</p>
            <p><strong>Status:</strong> {doacao.status}</p>
          </div>
          <div>
            <p><strong>Solicitante:</strong> {doacao.usuario?.nome}</p>
            <p><strong>Documento:</strong> {doacao.usuario?.documento}</p>
            <p><strong>Telefone:</strong> {doacao.usuario?.telefone}</p>
            <p><strong>Criado em:</strong> {doacao.dataCriacao}</p>
          </div>
        </div>

        <div className="text-sm text-gray-600 bg-gray-50 border p-3 rounded">
          <p><strong>Última atualização:</strong> {doacao.dataAtualizacao}</p>
          <p><strong>Observação:</strong> {doacao.observacao}</p>
        </div>

        <div className="rounded-md overflow-hidden border w-full max-h-[200px]">
          <img
            src={doacao.imagem}
            alt={`Imagem do medicamento: ${doacao.nome}`}
            className="w-full h-48 object-contain bg-white rounded border"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/jpeg;base64,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";
            }}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          {doacao.status === "PENDENTE" && (
            <Button
              disabled={loading}
              onClick={actions.PENDENTE.handler}
              className="bg-cyan-600 text-white hover:bg-cyan-700"
            >
              <CheckSquare2 className="w-4 h-4 mr-1" />
              {actions.PENDENTE.label}
            </Button>
          )}

          {doacao.status === "EM_ANALISE" && (
            <>
              <Button
                disabled={loading}
                variant="outline"
                onClick={actions.EM_ANALISE.cancel.handler}
              >
                {actions.EM_ANALISE.cancel.label}
              </Button>
              <Button
                disabled={loading}
                onClick={actions.EM_ANALISE.confirm.handler}
                className="bg-cyan-600 text-white hover:bg-cyan-700"
              >
                <CheckSquare2 className="w-4 h-4 mr-1" />
                {actions.EM_ANALISE.confirm.label}
              </Button>
            </>
          )}

          {doacao.status === "APROVADA" && (
            <Button
              disabled={loading}
              onClick={actions.APROVADA.handler}
              className="bg-cyan-600 text-white hover:bg-cyan-700"
            >
              <CheckSquare2 className="w-4 h-4 mr-1" />
              {actions.APROVADA.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
