import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { medicacaoSchema } from "@/utils/validations/ZodSchema";
import { z } from "zod";
import { Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormMedicacao1 from "./FormMedicacao1";
import FormMedicacao2 from "./FormMedicacao2";
import { api } from "@/services/api/api";
import ENDPOINTS from "@/services/endpoints";

type MedicacaoData = z.infer<typeof medicacaoSchema>;

interface FormMedicacaoProps {
  closeModal: () => void;
}

export default function FormMedicacao({ closeModal }: FormMedicacaoProps) {
    const [step, setStep] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const methods = useForm<MedicacaoData>({
        resolver: zodResolver(medicacaoSchema),
    })
    

    async function onSubmit(data: MedicacaoData) {
        setLoading(true);
        try {
            console.log(data)
            await api.post(ENDPOINTS.MEDICAMENTOS.CRUD, data);
            closeModal();
        } catch (error) {
            console.error("Erro ao cadastrar medicamento:", error);
            alert("Erro ao cadastrar medicamento. Tente novamente.");
            closeModal();
        } finally {
            setLoading(false);
        }
    }

    function renderStep() {
        return step === 1 ? <FormMedicacao1 /> : <FormMedicacao2 />;
    }

    return (
        <FormProvider {...methods}> 
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
            >
                <div className="flex flex-row gap-3 justify-center border-b">
                    <Pill />
                    <h2 className="text-xl font-semibold text-center mb-4">Cadastrar Medicamento</h2>
                </div>

                {renderStep()}     

                <div className="flex justify-between mt-6">
                    {step === 1 ? (
                        <Button variant="outline" onClick={closeModal}>
                            Cancelar
                        </Button>
                    ) : (
                        <Button variant="outline" type="button" onClick={() => setStep(step - 1)}>
                            Voltar
                        </Button>
                    )}


                    {step < 3 ? (
                        <Button className="bg-[#3FAFC3] text-white" type="button" onClick={() => setStep(step + 1)}>
                            Avançar
                        </Button>
                    ) : (
                        <Button className="bg-[#3FAFC3] text-white" type="submit">
                            Confirmar
                        </Button>
                    )}

                </div>
            </form>
        </FormProvider>
    );
}