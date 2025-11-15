"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { cpfMask, phoneMask } from "@/utils/masks/masks";
import { ConfirmationModal } from "../modal/confirmationModal";
import { api } from "@/services/api/api";
import ENDPOINTS from "@/services/endpoints";
import { useFeedbackModal } from "@/hooks/useFeedbackModal";
import { toast } from "sonner";

interface CardListProps {
  id: number;
  name: string;
  email: string;
  cpf: string;
  telefone: string;
  onDeleted?: () => void;
}

export function CardList({
  id,
  name,
  email,
  cpf,
  telefone,
  onDeleted,
}: CardListProps) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    try {
      setLoading(true);
      await api.delete(`${ENDPOINTS.FUNCIONARIO.CRUD}/${id}`);
      onDeleted?.();

      toast.success("Funcionário removido com sucesso.");
    } catch (error) {
      console.error("Erro ao remover funcionário:", error);
      toast.error("Erro ao remover funcionário. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  return (
    <>
      <Card className="items-center">
        <CardHeader className="border-b w-full p-2 text-center">
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-[11px]">
            <div className="flex flex-row gap-2 p-3 border rounded-[10px] w-[226px] h-[50px] items-center">
              <p className="text-[16px] font-semibold">Email:</p>
              <span className="text-[14px] truncate">{email}</span>
            </div>
            <div className="flex flex-row gap-2 p-3 border rounded-[10px] w-[226px] h-[50px] items-center">
              <p className="text-[16px] font-semibold">CPF:</p>
              <span className="text-[16px]">{cpfMask(cpf)}</span>
            </div>
            <div className="flex flex-row gap-2 p-3 border rounded-[10px] w-[226px] h-[50px] items-center">
              <p className="text-[16px] font-semibold">Telefone:</p>
              <span className="text-[16px]">{phoneMask(telefone)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-4 h-full border-t w-full">
          <Button
            className="bg-white text-black border hover:bg-[#3FAFC3] transition-colors duration-300 cursor-pointer"
            onClick={() => setOpenModal(true)}
            disabled={loading}
          >
            {loading ? "Removendo..." : "Remover"}
          </Button>
        </CardFooter>
      </Card>

      {/* Modal de confirmação */}
      <ConfirmationModal
        open={openModal}
        title={
          <>
            Realmente deseja remover o funcionário(a) <br />
            {name}?
          </>
        }
        onCancel={() => setOpenModal(false)}
        onConfirm={handleRemove}
      />
    </>
  );
}
