"use client";

import { Eye } from "lucide-react";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DoacaoCard } from "./DoacaoCard";

export interface DoacaoData {
  id: string;
  nome: string;
  quantidade: number;
  dataValidade: string;
  imagem: string;
  status: string;
  dataCriacao?: string;
  dataAtualizacao?: string;
  observacao?: string;
  usuario?: {
    nome: string;
    documento: string;
    telefone: string;
  };
}

interface ListaDoacoesProps {
  data: DoacaoData[];
  refetchData: () => Promise<void>;
}

export function ListaDoacoes({ data, refetchData }: ListaDoacoesProps) {
  const [selectedDoacao, setSelectedDoacao] = useState<DoacaoData | null>(null);

  return (
    <div className="flex gap-4">
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Medicamento</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Validade</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((doacao) => (
                <TableRow key={doacao.id}>
                  <TableCell>{doacao.nome}</TableCell>
                  <TableCell>{doacao.quantidade}</TableCell>
                  <TableCell>{doacao.dataValidade}</TableCell>
                  <TableCell>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full
                        ${
                          doacao.status === "CONCLUIDA"
                            ? "bg-green-100 text-green-600"
                            : doacao.status === "PENDENTE"
                            ? "bg-gray-100 text-gray-500"
                            : doacao.status === "CANCELADA"
                            ? "bg-red-100 text-red-600"
                            : doacao.status === "EM_ANALISE"
                            ? "bg-amber-100 text-amber-500"
                            : doacao.status === "APROVADA"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      {doacao.status.replace("_", " ")}
                    </span>
                  </TableCell>
                  <TableCell className="flex justify-center">
                    <button
                      onClick={() => setSelectedDoacao(doacao)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24">
                  Nenhuma doação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {selectedDoacao && (
        <DoacaoCard
          doacao={selectedDoacao}
          onClose={() => setSelectedDoacao(null)}
          refetchData={refetchData}
        />
      )}
    </div>
  );
}