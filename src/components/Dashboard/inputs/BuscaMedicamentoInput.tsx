import { useEffect, useRef, useState } from "react";
import { useMedicamentos } from "@/hooks/useMedicamento";
import {
  FieldError,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

// Defina um tipo para o medicamento retornado pelo backend
interface Medicamento {
  id: string;
  nomeComercial: string;
  principioAtivo: string;
}

interface BuscaMedicamentoInputProps {
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
  label?: string;
  placeholder?: string;
}

const BuscaMedicamentoInput = ({
  name,
  register,
  setValue,
  error,
  label = "Medicamento",
  placeholder = "Ex: Baycuten N",
}: BuscaMedicamentoInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [justSelected, setJustSelected] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const {
    loading,
    results,
    showDropdown,
    setShowDropdown,
  }: {
    loading: boolean;
    results: Medicamento[];
    showDropdown: boolean;
    setShowDropdown: (val: boolean) => void;
  } = useMedicamentos(inputValue);

  // Fecha o dropdown ao clicar fora ou pressionar Esc
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <input
        type="text"
        autoComplete="off"
        value={inputValue}
        placeholder={placeholder}
        {...register(name)}
        onChange={(e) => {
          const val = e.target.value;
          setInputValue(val);
          setValue(name, val, { shouldValidate: true });

          if (justSelected) {
            setJustSelected(false);
            return;
          }

          if (val.length >= 3) setShowDropdown(true);
        }}
        onFocus={() => {
          if (inputValue.length >= 3 && results.length > 0) {
            setShowDropdown(true);
          }
        }}
        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3FAFC3] ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {loading && <p className="text-sm text-gray-500 mt-1">Buscando medicamentos...</p>}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}

      {showDropdown && results.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow max-h-60 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setInputValue(item.nomeComercial);
                setValue(name, item.nomeComercial, { shouldValidate: true });
                setShowDropdown(false);
                setJustSelected(true);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
            >
              <span className="font-medium">{item.nomeComercial}</span>{" "}
              <span className="text-gray-500">({item.principioAtivo})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuscaMedicamentoInput;
