import { useFormContext } from "react-hook-form";
import FormInput from "../../FormInput";
import { CalendarDays, Droplets, Package, Pill } from "lucide-react";

export default function FormMedicacao1() {
    const { register, formState: { errors } } = useFormContext();


    return (
        <div className="space-y-4">
            <FormInput
                icon={Pill}
                type="text"
                placeholder="Nome do Medicamento"
                {...register("nome")}
                error={errors.nome?.message as string | undefined}
            />
            <FormInput
                icon={CalendarDays}
                type="date"
                placeholder="Data de Validade"
                {...register("dataValidade")}
                error={errors.dataValidade?.message as string | undefined}
            />
            <FormInput
                icon={Droplets}
                type="text"
                placeholder="Dosagem"
                {...register("dosagem")}
                error={errors.dosagem?.message as string | undefined}
            />
            <FormInput
                icon={Package}
                type="text"
                placeholder="Lote"
                {...register("lote")}
                error={errors.lote?.message as string | undefined}
            />
        </div>
    );
}