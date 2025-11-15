  "use client";

  import { MapPin, Landmark, Building, Home, ClipboardList } from "lucide-react";
  import { useFormContext } from "react-hook-form";
  import FormInput from "../../FormInput";
  import { formatCEP } from "@/utils/masks/masks";

  export default function FormEndereco() {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    return (
      <div className="space-y-4">
        <FormInput
          icon={MapPin}
          type="text"
          placeholder="CEP"
          {...register("cep")}
          error={errors.cep?.message as string | undefined}
          mask={formatCEP}
        />
        <FormInput
          icon={Landmark}
          type="text"
          placeholder="Estado"
          {...register("estado")}
          error={errors.estado?.message as string | undefined}
        />
        <FormInput
          icon={Building}
          type="text"
          placeholder="Cidade"
          {...register("cidade")}
          error={errors.cidade?.message as string | undefined}
        />
        <FormInput
          icon={Home}
          type="text"
          placeholder="Logradouro"
          {...register("logradouro")}
          error={errors.logradouro?.message as string | undefined}
        />
        <FormInput
          icon={ClipboardList}
          type="text"
          placeholder="Complemento"
          {...register("complemento")}
          error={errors.complemento?.message as string | undefined}
        />
      </div>
    );
  }
