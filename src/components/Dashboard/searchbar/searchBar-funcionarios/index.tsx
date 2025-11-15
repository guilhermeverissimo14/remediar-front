import { Search, Plus } from "lucide-react";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { useState } from "react";
import FuncionarioForm from "@/components/Dashboard/FormsParaCadastro/FormFuncionario";

interface SearchBarProps {
    setFiltro: (value: string) => void;
}

export function SearchBar({ setFiltro }: SearchBarProps) {
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        setSearch(value);
        setFiltro(value);
    };

    return (
        <>
            <div className="flex justify-between items-center w-full gap-2">
                <div className="relative w-full md:w-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        type="text"
                        placeholder="Pesquisar"
                        value={search}
                        onChange={handleChange}
                        className="pl-10"
                    />
                </div>

                <Button
                    className="flex items-center gap-2 bg-[#3FAFC3] text-white hover:bg-[#3498a9] transition-all"
                    onClick={() => setIsModalOpen(true)}
                >
                    Novo Funcionário
                    <Plus size={18} />
                </Button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
                    <div className="max-w-md w-full">
                        <FuncionarioForm closeModal={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}
        </>
    );
}