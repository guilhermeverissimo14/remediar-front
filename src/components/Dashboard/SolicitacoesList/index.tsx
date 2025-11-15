"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

interface Solicitacao {
  solicitacao: {
    id: string;
    statusAtual: string;
    dataHoraCriacao: string;
  };
  item: {
    nomeComercialOrPrincipioAtivo: string;
    quantidade: number;
  };
  prescricaoMedica: {
    dataEmissao: string;
  };
}

interface SolicitacoesTableProps {
  data: Solicitacao[];
}

export function SolicitacoesTable({ data }: SolicitacoesTableProps) {
  const router = useRouter();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Medicamento</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Emissão</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((sol) => (
              <TableRow key={sol.solicitacao.id}>
                <TableCell>{sol.item.nomeComercialOrPrincipioAtivo}</TableCell>
                <TableCell>{sol.solicitacao.statusAtual}</TableCell>
                <TableCell>{sol.prescricaoMedica.dataEmissao}</TableCell>
                <TableCell className="flex justify-center">
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard-funcionario/solicitacoes/view?solicitacao=${sol.solicitacao.id}`
                      )
                    }
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                Nenhuma solicitação encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
