"use client";

import { useState, ChangeEvent } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SearchBarDoacaoFuncionarioProps {
  filtroTexto: string;
  statusFiltro: string;
  setFiltroTexto: (value: string) => void;
  setStatusFiltro: (value: string) => void;
}

export default function SearchBarDoacaoFuncionario({
  filtroTexto,
  statusFiltro,
  setFiltroTexto,
  setStatusFiltro,
}: SearchBarDoacaoFuncionarioProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFiltroTexto(value);
  };

  return (
    <div className="w-full flex justify-between items-center gap-2">
      {/* Campo de busca visível em telas grandes */}
      <div className="relative w-full sm:w-auto hidden lg:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Pesquisar por ID ou nome do medicamento"
          value={filtroTexto}
          onChange={handleChange}
          className="pl-10"
        />
      </div>

      {/* Filtros visíveis em telas grandes */}
      <div className="hidden lg:flex flex-row gap-3 justify-center items-center">
        <span>Status:</span>
        <Select value={statusFiltro} onValueChange={setStatusFiltro}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="PENDENTE">Pendente</SelectItem>
              <SelectItem value="APROVADA">Aprovada</SelectItem>
              <SelectItem value="EM_ANALISE">Em Análise</SelectItem>
              <SelectItem value="CONCLUIDA">Concluída</SelectItem>
              <SelectItem value="CANCELADA">Cancelada</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Filtros para telas pequenas */}
      <div className="block lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={18} /> Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-4">
              <span className="text-sm font-semibold">Status:</span>
              <Select value={statusFiltro} onValueChange={setStatusFiltro}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="TODOS">Todos</SelectItem>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                    <SelectItem value="APROVADA">Aprovada</SelectItem>
                    <SelectItem value="EM_ANALISE">Em Análise</SelectItem>
                    <SelectItem value="CONCLUIDA">Concluída</SelectItem>
                    <SelectItem value="CANCELADA">Cancelada</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
