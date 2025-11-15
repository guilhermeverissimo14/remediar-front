'use client';

import DashboardLayout from "@/components/Dashboard/layouts/dashboardLayout";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ConfiguracaoItems, menuPrincipalItems } from "@/utils/constants";
import { DollarSign } from "lucide-react";
import { useState } from "react";

type Doacao = {
  NomeDoador: string;
  Valor: number;
  Data_doacao: string;
};

const doacoes: Doacao[] = [
  {
    NomeDoador: "João Silva",
    Valor: 1000,
    Data_doacao: "13/05/2023",
  },
  {
    NomeDoador: "Maria Oliveira",
    Valor: 200,
    Data_doacao: "10/05/2025",
  },
  {
    NomeDoador: "Carlos Santos",
    Valor: 150,
    Data_doacao: "11/05/2025",
  },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"valor" | "nome">("valor");

  const filteredDoacoes = doacoes
    .filter(doacao =>
      doacao.NomeDoador.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "valor") {
        return b.Valor - a.Valor;
      }
      return a.NomeDoador.localeCompare(b.NomeDoador);
    });

  const totalDoacoes = filteredDoacoes.reduce((acc, doacao) => acc + doacao.Valor, 0);

  return (
    <DashboardLayout
      title="Doações de Financeiras"
      Icon={() => <DollarSign />}
      menuPrincipalItems={menuPrincipalItems}
      configuracaoItems={ConfiguracaoItems}
    >
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Pesquisar doador"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[180px]"
        />

        <Select value={sortBy} onValueChange={(value: "valor" | "nome") => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="valor">Maior valor</SelectItem>
            <SelectItem value="nome">Ordem alfabética</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome do Doador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data da Doação
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDoacoes.map((doacao, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {doacao.NomeDoador}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">
                  R$ {doacao.Valor.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doacao.Data_doacao}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Total de doações: R$ {totalDoacoes.toFixed(2)}
      </div>
    </DashboardLayout>
  );
}