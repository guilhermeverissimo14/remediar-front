"use client";

import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface MedicacaoData {
  id: number;
  apresentacao: string;
  quantidade: number;
  dataValidade: string;
}

interface ListaMedicacoesProps {
  data: MedicacaoData[];
}

export function ListaMedicacoes({ data }: ListaMedicacoesProps) {
  const router = useRouter();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Apresentação</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Data de Validade</TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((medicacao) => (
              <TableRow key={medicacao.id}>
                <TableCell className="max-w-[250px] truncate" title={medicacao.apresentacao}>
                  {medicacao.apresentacao}
                </TableCell>
                <TableCell>{medicacao.quantidade}</TableCell>
                <TableCell>{medicacao.dataValidade}</TableCell>
                <TableCell className="flex justify-center">
                  <button
                    onClick={() =>
                      router.push(
                        `/dashboard-funcionario/gerenciar-estoque/view-estoque?medicamento=${encodeURIComponent(
                          JSON.stringify(medicacao)
                        )}`
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
                Nenhum medicamento encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
