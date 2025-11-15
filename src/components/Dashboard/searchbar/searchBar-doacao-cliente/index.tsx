"use client";

import { useState, ChangeEvent } from "react";
import { Search, Filter, Plus } from "lucide-react";
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

interface SearchBarDoacoesProps {
  setFiltroTexto: (value: string) => void;
  setStatusFiltro: (value: string) => void;
  onNovaDoacaoClick: () => void;
}

export function SearchBarDoacoes({
  setFiltroTexto,
  setStatusFiltro,
  onNovaDoacaoClick,
}: SearchBarDoacoesProps) {
  const [search, setSearch] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setFiltroTexto(value);
  };

  return (
    <div className="w-full flex justify-between items-center gap-2">
      <div className="relative w-full sm:w-auto hidden lg:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Pesquisar por ID ou nome do medicamento"
          value={search}
          onChange={handleChange}
          className="pl-10"
        />
      </div>

      <div className="hidden lg:flex flex-row gap-3 justify-center items-center">
        <span>Status:</span>
        <Select onValueChange={setStatusFiltro}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="TODOS">Todos</SelectItem>
              <SelectItem value="PENDENTE">Pendente</SelectItem>
              <SelectItem value="FINALIZADA">Finalizada</SelectItem>
              <SelectItem value="CANCELADA">Cancelada</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Button
          className="flex items-center gap-2 bg-[#3FAFC3] text-white hover:bg-[#3498a9]"
          onClick={onNovaDoacaoClick}
        >
          Nova Doação
          <Plus size={18} />
        </Button>
      </div>

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
              <Select onValueChange={setStatusFiltro}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="TODOS">Todos</SelectItem>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                    <SelectItem value="FINALIZADA">Finalizada</SelectItem>
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
