"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/services/api/api";
import ENDPOINTS from "@/services/endpoints";

export default function ForgotPasswordPage() {
  const { forgotPassword, loading } = useAuth();
  const [login, setLogin] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const response = await api.post(`${ENDPOINTS.FORGOT_PASS.CRUD}`, { login });
      
      setSucesso("E-mail enviado com sucesso! Verifique sua caixa de entrada.");
    } catch (err: any) {
      setErro(err.response?.data?.message || "Erro ao enviar e-mail");
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center bg-[#19b5de] relative">
        <div className="p-8 flex flex-col items-center relative z-10">
          <div className="text-6xl font-bold">
            <span className="text-[#e5ff00]">re</span>
            <span className="text-black">mediar</span>
          </div>
          <div className="absolute">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-[#e5ff00] absolute" style={{ top: "-40px", left: "-30px" }}></div>
              <div className="w-3 h-3 rounded-full bg-black absolute" style={{ top: "-20px", left: "10px" }}></div>
              <div className="w-3 h-3 rounded-full bg-[#e5ff00] absolute" style={{ top: "-30px", left: "40px" }}></div>
              <div className="w-2 h-2 rounded-full bg-[#e5ff00] absolute" style={{ top: "-10px", left: "-50px" }}></div>
              <div
                className="w-3 h-3 rounded-full bg-[#19b5de] border border-black absolute"
                style={{ top: "0px", left: "-30px" }}
              ></div>
              <div className="w-3 h-3 rounded-full bg-black absolute" style={{ top: "0px", left: "0px" }}></div>
              <div
                className="w-3 h-3 rounded-full bg-[#19b5de] border border-black absolute"
                style={{ top: "0px", left: "30px" }}
              ></div>
              <div className="w-3 h-3 rounded-full bg-black absolute" style={{ top: "20px", left: "-10px" }}></div>
              <div className="w-2 h-2 rounded-full bg-black absolute" style={{ top: "20px", left: "40px" }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-12">
        <div className="flex flex-1 flex-col items-center justify-center max-w-[520px] mx-auto w-full">
          <form onSubmit={handleSubmit} className="w-full space-y-10">
            <div className="space-y-3">
              <h1 className="text-[2rem] font-bold">Esqueceu a senha?</h1>
              <p className="text-gray-500">Redefina a senha em duas etapas</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <Input
                    type="email"
                    placeholder="usertest@gmail.com"
                    className="pl-10 h-12 text-sm border rounded-md w-full"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                </div>
                <div className="text-xs text-gray-500 pl-3">E-mail</div>
              </div>

              {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

              <Button
                type="submit"
                className="w-full h-12 text-base bg-[#19b5de] hover:bg-[#17a3c9] text-white font-medium rounded-full"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
