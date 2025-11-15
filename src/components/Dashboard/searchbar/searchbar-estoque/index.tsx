"use client";
import { ChangeEvent, useEffect } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
interface SearchBarEstoqueProps {
  setFiltro: (value: string) => void;
  setEstoqueSelecionado: (estoqueId: string) => void;
  estoques: { id: number; nome: string }[];
  onOpenModal: () => void; 
}
export function SearchBarEstoque({ setFiltro, setEstoqueSelecionado, estoques, onOpenModal }: SearchBarEstoqueProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiltro(e.target.value);
  };
  useEffect(() => {
    if (estoques.length > 0) {
      setEstoqueSelecionado(String(estoques[0].id));
    }
  }, [estoques, setEstoqueSelecionado]);
  return (
    <div className="w-full flex justify-between items-center gap-2">
      {/* Campo de Pesquisa */}
      <div className="relative w-full sm:w-auto hidden lg:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Pesquisar medicamento"
          onChange={handleChange}
          className="pl-10"
        />
      </div>
      {/* Selecionar Estoque */}
      <div className="hidden lg:flex flex-row gap-3 justify-center items-center">
        <span>Selecionar Estoque:</span>
        <Select onValueChange={setEstoqueSelecionado} defaultValue={estoques[0]?.id ? String(estoques[0].id) : ""}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecionar Estoque" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {estoques.map((estoque) => (
                <SelectItem key={estoque.id} value={String(estoque.id)}>
                  {estoque.nome}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Botão Novo Estoque */}
      <div>
        <Button
          className="flex items-center gap-2 bg-[#3FAFC3] text-white hover:bg-[#3498a9] transition-all"
          onClick={onOpenModal} // Modificado aqui
        >
          Novo Item no Estoque
          <Plus size={18} />
        </Button>
      </div>
      {/* Filtros Mobile */}
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
              <Select onValueChange={setEstoqueSelecionado} defaultValue={estoques[0]?.id ? String(estoques[0].id) : ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar Estoque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {estoques.map((estoque) => (
                      <SelectItem key={estoque.id} value={String(estoque.id)}>
                        {estoque.nome}
                      </SelectItem>
                    ))}
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
