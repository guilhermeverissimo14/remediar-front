"use client";

import { Lock, LockKeyhole } from "lucide-react";
import { useFormContext } from "react-hook-form";
import FormInput from "../../FormInput";

export default function FormSenha() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <FormInput
        icon={Lock}
        type="password"
        placeholder="Senha"
        {...register("senha")}
        error={errors.senha?.message as string | undefined}
      />
      <FormInput
        icon={LockKeyhole}
        type="password"
        placeholder="Confirmar Senha"
        {...register("confirmarSenha")}
        error={errors.confirmarSenha?.message as string | undefined}
      />
    </div>
  );
}
