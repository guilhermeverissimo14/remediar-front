"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmationModal } from "@/components/Dashboard/modal/confirmationModal";
import { api } from "@/services/api/api";
import ENDPOINTS from "@/services/endpoints";
import { toast } from "sonner";

interface Medicamento {
    id: number;
    descricao: string | null;
    nomeComercial: string;
    principioAtivo: string;
    apresentacao: string;
    codigoBarras: string;
    laboratorio: string;
    precoMaximo: number;
    statusProduto: string;
}
interface VisualizarMedicamentoProps {
    medicamento?: Medicamento; // Torne opcional se necessário
}

export default function VisualizarMedicamento({ medicamento: propMedicamento }: VisualizarMedicamentoProps) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [medicamento, setMedicamento] = useState<Medicamento | null>(propMedicamento || null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Medicamento | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (!propMedicamento) {
            const medParam = searchParams.get("medicamento");
            if (medParam) {
                try {
                    const parsedMed = JSON.parse(decodeURIComponent(medParam));
                    setMedicamento(parsedMed);
                    setFormData(parsedMed);
                } catch (error) {
                    console.error("Erro ao parsear medicamento:", error);
                }
            }
        }
    }, [searchParams, propMedicamento]);

    if (!medicamento || !formData) {
        return <div className="flex justify-center items-center h-96">Carregando...</div>;
    }

    const handleInputChange = (field: keyof Medicamento, value: string) => {
        setFormData((prev) => prev ? { ...prev, [field]: value } : prev);
    };

    const handleSave = async () => {
        if (!formData) return;
        try {
            await api.put(`${ENDPOINTS.MEDICAMENTOS.CRUD}/${formData.id}`, formData);
            toast.success("Medicamento atualizado com sucesso!");
            setIsEditing(false);
            setMedicamento(formData);
        } catch (error) {
            console.error(error);
            toast.error("Erro ao atualizar medicamento.");
        } finally {
            setModalOpen(false);
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#3FAFC3]">Visualização - Medicamento</h1>
                    <p className="text-gray-500 text-sm">{isEditing ? "Editando informações." : "Campos bloqueados para visualização."}</p>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleBack}>
                        Voltar
                    </Button>

                    {!isEditing ? (
                        <Button className="bg-[#3FAFC3] hover:bg-[#2e8a9c] text-white" onClick={() => setIsEditing(true)}>
                            Editar
                        </Button>
                    ) : (
                        <>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </Button>
                            <Button className="bg-[#3FAFC3] hover:bg-[#2e8a9c] text-white" onClick={() => setModalOpen(true)}>
                                Salvar Alterações
                            </Button>
                        </>
                    )}
                </div>
            </div>

            <section className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Nome Comercial" value={formData.nomeComercial} editable={isEditing} onChange={(v) => handleInputChange("nomeComercial", v)} />
                    <Field label="Princípio Ativo" value={formData.principioAtivo} editable={isEditing} onChange={(v) => handleInputChange("principioAtivo", v)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="Apresentação" value={formData.apresentacao} editable={isEditing} onChange={(v) => handleInputChange("apresentacao", v)} />
                    <Field label="Código de Barras" value={formData.codigoBarras} editable={isEditing} onChange={(v) => handleInputChange("codigoBarras", v)} />
                    <Field label="Laboratório" value={formData.laboratorio} editable={isEditing} onChange={(v) => handleInputChange("laboratorio", v)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Preço Máximo" value={formData.precoMaximo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} editable={false} />
                    <Field label="Status" value={formData.statusProduto} editable={isEditing} onChange={(v) => handleInputChange("statusProduto", v)} />
                </div>
                {formData.descricao && (
                    <div className="grid grid-cols-1">
                        <Field label="Descrição" value={formData.descricao} editable={isEditing} onChange={(v) => handleInputChange("descricao", v)} />
                    </div>
                )}
            </section>

            {/* Modal de Confirmação */}
            <ConfirmationModal
                open={modalOpen}
                title="Deseja realmente salvar as alterações?"
                onConfirm={handleSave}
                onCancel={() => setModalOpen(false)}
            />
        </div>
    );
}

function Field({ label, value, editable, onChange }: { label: string; value: string; editable: boolean; onChange?: (value: string) => void }) {
    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
            <Input
                value={value}
                readOnly={!editable}
                onChange={editable && onChange ? (e) => onChange(e.target.value) : undefined}
                className={editable ? "" : "bg-gray-100 cursor-not-allowed"}
            />
        </div>
    );
}
