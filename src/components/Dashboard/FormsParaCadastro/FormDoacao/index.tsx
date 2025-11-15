"use client";

import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { api } from "@/services/api/api";
import ENDPOINTS from "@/services/endpoints";
import moment from "moment";
import {
  ClipboardList,
  CalendarIcon,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import BuscaMedicamentoInput from "../../inputs/BuscaMedicamentoInput";
import { useAuth } from "@/contexts/AuthContext";
import { useState, ChangeEvent } from "react";

const doacaoSchema = z.object({
  usuarioId: z.number(),
  itens: z
    .array(
      z.object({
        descricao: z.string().min(1, "Informe a descrição"),
        quantidade: z
          .number({ invalid_type_error: "Quantidade deve ser um número" })
          .min(1, "Quantidade mínima é 1"),
        dataValidade: z
          .string()
          .refine((val) => {
            const hoje = new Date();
            const data = new Date(val);
            hoje.setHours(0, 0, 0, 0);
            data.setHours(0, 0, 0, 0);
            return data >= hoje;
          }, {
            message: "A data deve ser hoje ou uma futura",
          }),
        imagem: z
          .string()
          .min(1, "Imagem é obrigatória"),
      })
    )
    .min(1, "Adicione ao menos um item"),
});

type DoacaoFormData = z.infer<typeof doacaoSchema>;

export default function FormDoacao({ closeModal }: { closeModal: () => void }) {
  const { user } = useAuth();

  const [previews, setPreviews] = useState<Record<number, string>>({});

  if (!user?.id) {
    toast.error("Usuário não autenticado");
    return null;
  }

  const methods = useForm<DoacaoFormData>({
    resolver: zodResolver(doacaoSchema),
    defaultValues: {
      usuarioId: Number(user.id),
      itens: [
        {
          descricao: "",
          quantidade: 1,
          dataValidade: "",
          imagem: "",
        },
      ],
    },
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "itens",
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setValue(`itens.${index}.imagem`, base64, { shouldValidate: true });
      setPreviews((prev) => ({
        ...prev,
        [index]: base64,
      }));
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: DoacaoFormData) => {
    try {
      const promises = data.itens.map((item) => {
        const payload = {
          usuarioId: data.usuarioId,
          itens: [
            {
              ...item,
              dataValidade: moment(item.dataValidade).format("DD/MM/YYYY"),
            },
          ],
        };

        return api.post(`${ENDPOINTS.DOACOES.CRUD}`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      });

      // Aguarda todas as requisições em paralelo
      await Promise.all(promises);

      toast.success("Doações registradas com sucesso!");
      closeModal();
    } catch (error) {
      toast.error("Erro ao enviar uma ou mais doações.");
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.error("Erros de validação:", errors);
          toast.error("Preencha todos os campos obrigatórios.");
        })}
        className="max-w-md w-full bg-white rounded-lg shadow-md"
      >
        <ScrollArea className="h-[80vh] p-4 flex flex-col gap-5">
          <h2 className="text-xl font-semibold border-b pb-2">Nova Doação</h2>

          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative border border-gray-300 rounded-lg p-5 bg-gray-50 shadow-sm mb-6"
            >
              <div className="absolute top-3 right-3">
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-600 transition"
                    title="Remover item"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <h3 className="text-md font-semibold mb-4 text-gray-700">
                Medicamento #{index + 1}
              </h3>

              <div className="space-y-4">
                {/* Descrição */}
                <BuscaMedicamentoInput
                  name={`itens.${index}.descricao`}
                  register={register}
                  setValue={setValue}
                  error={errors.itens?.[index]?.descricao}
                  label="Descrição do Medicamento"
                  placeholder="Ex: BAYCUTEN N"
                />

                {/* Quantidade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 2"
                    {...register(`itens.${index}.quantidade`, {
                      valueAsNumber: true,
                    })}
                    className={`w-full px-4 py-2 border ${
                      errors.itens?.[index]?.quantidade
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#3FAFC3]`}
                  />
                  {errors.itens?.[index]?.quantidade && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.itens[index]?.quantidade?.message}
                    </p>
                  )}
                </div>

                {/* Data de Validade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Validade
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register(`itens.${index}.dataValidade`)}
                    className={`w-full px-4 py-2 border ${
                      errors.itens?.[index]?.dataValidade
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#3FAFC3]`}
                  />
                  {errors.itens?.[index]?.dataValidade && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.itens[index]?.dataValidade?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imagem do Medicamento
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className={`w-full px-4 py-2 border ${
                      errors.itens?.[index]?.imagem ? "border-red-500" : "border-gray-300"
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[#3FAFC3]`}
                  />
                  {previews[index] && (
                    <img
                      src={previews[index]}
                      alt={`Preview ${index}`}
                      className="mt-3 w-full h-40 object-cover rounded border"
                    />
                  )}
                  {errors.itens?.[index]?.imagem && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.itens[index]?.imagem?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={() =>
                append({
                  descricao: "",
                  quantidade: 1,
                  dataValidade: "",
                  imagem: "",
                })
              }
              variant="ghost"
              className="flex items-center gap-2 text-[#3FAFC3] hover:text-[#2e93a6] transition"
            >
              <Plus size={18} />
              Adicionar Item
            </Button>
          </div>
        </ScrollArea>

        <div className="flex justify-between px-6 pb-6 pt-3">
          <Button variant="outline" onClick={closeModal}>
            Cancelar
          </Button>
          <Button className="bg-[#3FAFC3] text-white" type="submit">
            Confirmar
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
