import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

export default function FormMedicacao2() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium text-gray-700">Refrigerado</label>
        <Select
          onValueChange={(value) => setValue("refrigerado", value === "true")} // Converte para boolean
          value={watch("refrigerado") === true ? "true" : "false"} // Garante booleano no estado
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Sim</SelectItem>
            <SelectItem value="false">Não</SelectItem>
          </SelectContent>
        </Select>
        {typeof errors.refrigerado?.message === "string" && (
          <p className="text-red-500 text-sm mt-1">
            {errors.refrigerado.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Tarja</label>
        <Select
          onValueChange={(value) => setValue("tarja", value)}
          value={watch("tarja") || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione a Tarja" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sem Tarja">Sem Tarja</SelectItem>
            <SelectItem value="AMARELA">Amarela</SelectItem>
            <SelectItem value="VERMELHA">Vermelha</SelectItem>
            <SelectItem value="PRETA">Preta</SelectItem>
          </SelectContent>
        </Select>
        {typeof errors.receitaObrigatoria?.message === "string" && (
          <p className="text-red-500 text-sm mt-1">
            {errors.receitaObrigatoria.message}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">
          Receita Obrigatória
        </label>
        <Select
          onValueChange={(value) =>
            setValue("receitaObrigatoria", value === "true")
          } // Converte para boolean
          value={watch("receitaObrigatoria") === true ? "true" : "false"} // Garante booleano no estado
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Sim</SelectItem>
            <SelectItem value="false">Não</SelectItem>
          </SelectContent>
        </Select>
        {typeof errors.receitaObrigatoria?.message === "string" && (
          <p className="text-red-500 text-sm mt-1">
            {errors.receitaObrigatoria.message}
          </p>
        )}
      </div>
    </div>
  );
}
