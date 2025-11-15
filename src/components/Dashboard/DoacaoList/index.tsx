"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, X } from "lucide-react";
import { DoacaoModal } from "./DoacaoModal.tsx";

interface DoacoesTableProps {
  data: {
    solicitacao: {
      id: string;
      statusAtual: string;
      dataHoraCriacao: string;
    };
    itensDoacao: {
      item: {
        nomeComercialOrPrincipioAtivo: string;
        quantidade: number;
      };
      dataValidade: string;
      imagem: string;
    }[];
  }[];
}

export function DoacoesTable({ data }: DoacoesTableProps) {
  const [selected, setSelected] = useState<{
    solicitacao: {
      statusAtual: string;
      dataHoraCriacao: string;
      dataHoraUltimaAtualizacao: string;
      funcionarioResponsavelAtual: { nome: string } | null;
    };
    itensDoacao: {
      item: {
        nomeComercialOrPrincipioAtivo: string;
        quantidade: number;
      };
      dataValidade: string;
      imagem: string;
    }[];
  } | null>(null);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Medicamento</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Criação</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((doacao) =>
              doacao.itensDoacao.map((item, index) => (
                <TableRow key={`${doacao.solicitacao.id}-${index}`}>
                  <TableCell>
                    {item.item.nomeComercialOrPrincipioAtivo}
                  </TableCell>
                  <TableCell>{item.item.quantidade}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full
                          ${
                            doacao.solicitacao.statusAtual === "FINALIZADA"
                              ? "bg-green-100 text-green-600"
                              : doacao.solicitacao.statusAtual === "PENDENTE"
                              ? "bg-gray-100 text-gray-500"
                              : doacao.solicitacao.statusAtual === "CANCELADA"
                              ? "bg-red-100 text-red-600"
                              : doacao.solicitacao.statusAtual === "EM_ANALISE"
                              ? "bg-amber-100 text-amber-500"
                              : doacao.solicitacao.statusAtual === "APROVADA"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-700"
                          }
                        `}
                    >
                      {doacao.solicitacao.statusAtual.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell>{doacao.solicitacao.dataHoraCriacao}</TableCell>
                  <TableCell className="flex justify-center">
                    <button
                      onClick={() =>
                        setSelected({
                          solicitacao: {
                            statusAtual: doacao.solicitacao.statusAtual,
                            dataHoraCriacao: doacao.solicitacao.dataHoraCriacao,
                            dataHoraUltimaAtualizacao: new Date().toISOString(), // ou outro valor real
                            funcionarioResponsavelAtual: null, // ou algum nome real
                          },
                          itensDoacao: [item],
                        })
                      }
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                Nenhuma doação encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selected && (
        <DoacaoModal data={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
