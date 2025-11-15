"use client";

import { useState, ChangeEvent } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Input } from "../../../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { Button } from "../../../ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../../../ui/sheet";
import FormMedicacao from "@/components/Dashboard/FormsParaCadastro/FormMedicacao";

interface SearchBarProps {
  setFiltro: (value: string) => void;
  setEstoqueSelecionado: (estoque: string) => void;
  setOrdenacao: (ordenacao: "nome" | "laboratorio" | "status") => void;
}

export function SearchBar({ setFiltro, setEstoqueSelecionado, setOrdenacao }: SearchBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setFiltro(value);
  };

  return (
    <div className="w-full flex justify-between items-center gap-2">
      <div className="relative w-full sm:w-auto hidden lg:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Pesquisar"
          value={search}
          onChange={handleChange}
          className="pl-10"
        />
      </div>

      <div className="hidden lg:flex flex-row gap-3 justify-center items-center">
        <span>Ordenar por:</span>
        <Select onValueChange={(value) => setOrdenacao(value as "nome" | "laboratorio" | "status")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Nome" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="nome">Nome</SelectItem>
              <SelectItem value="laboratorio">Laboratório</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="hidden lg:flex flex-row gap-3 justify-center items-center">
        <span>Selecionar Estoque:</span>
        <Select onValueChange={setEstoqueSelecionado}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecionar Estoque" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="estoque1">Estoque 1</SelectItem>
              <SelectItem value="estoque2">Estoque 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Button
          className="flex items-center gap-2 bg-[#3FAFC3] text-white hover:bg-[#3498a9] transition-all"
          onClick={() => setIsModalOpen(true)}
        >
          Novo Medicamento
          <Plus size={18} />
        </Button>

        {isModalOpen && (
          <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
            <div className="max-w-md w-full">
              <FormMedicacao closeModal={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
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
              <span className="text-sm font-semibold">Selecionar Estoque:</span>
              <Select onValueChange={setEstoqueSelecionado}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar Estoque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="estoque1">Estoque 1</SelectItem>
                    <SelectItem value="estoque2">Estoque 2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <span className="text-sm font-semibold mt-6">Ordenar por:</span>
              <Select onValueChange={(value) => setOrdenacao(value as "nome" | "laboratorio" | "status")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Ordenar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="nome">Nome</SelectItem>
                    <SelectItem value="laboratorio">Laboratório</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
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
