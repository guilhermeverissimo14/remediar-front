"use client"

import type React from "react"

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOff } from "lucide-react"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Logo from "@/assets/Ativo 12.png"
import Background from "@/assets/Rectangle 1.png"
import ENDPOINTS from "@/services/endpoints"
import { api } from "@/services/api/api"

export default function NovaSenhaPage() {
  
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); 

  const [senha, setSenha] = useState("")
  const [novaSenha, setNovaSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")
  const [sucesso, setSucesso] = useState("");
  
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      setErro("Token não encontrado.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!token) {
      setErro("Token inválido ou expirado.");
      return;
    }

    if (!senha) {
      setErro("Por favor, informe uma senha")
      return
    }

    if (senha !== novaSenha) {
      setErro("As senhas não coincidem")
      return
    }

    setLoading(true)

    try {
      
      const response = await api.patch(`${ENDPOINTS.RESET_PASS.CRUD}`, { token: token, novaSenha: novaSenha });
            
      if (response.status === 200) {
        alert("Senha redefinida com sucesso!");
        setSucesso("Senha alterada com sucesso!");
        router.push("/login");
      } else {
        setErro("Erro ao redefinir senha. Tente novamente.");
      }

    } catch (err: any) {
      setErro(err.message || "Erro ao redefinir senha")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center bg-[#1EAED3] relative">
        <Image
          src={Background || "/placeholder.svg"}
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
        <div className="p-8 flex flex-col items-center relative z-10">
          <Image src={Logo || "/placeholder.svg"} alt="Remediar Logo" width={400} height={133} className="mb-6" />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-12">
        <div className="flex flex-1 flex-col items-center justify-center max-w-[520px] mx-auto w-full">
          <form onSubmit={handleSubmit} className="w-full space-y-10">
            <div className="space-y-3 text-center">
              <h1 className="text-[2.5rem] font-bold tracking-tight">Criar uma senha nova</h1>
              <p className="text-xl text-muted-foreground">
                É necessário que todos os dispositivos acessem sua conta com a nova senha desejada
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <Input
                      type={mostrarSenha ? "text" : "password"}
                      placeholder="********"
                      className="pl-14 h-16 text-lg border-2 rounded-md w-full"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4"
                    >
                      {mostrarSenha ? (
                        <EyeOff className="h-6 w-6 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="text-base text-gray-500 pl-3">Senha Nova</div>
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <Input
                      type={mostrarConfirmarSenha ? "text" : "password"}
                      placeholder="********"
                      className="pl-14 h-16 text-lg border-2 rounded-md w-full"
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                      className="absolute inset-y-0 right-0 flex items-center pr-4"
                    >
                      {mostrarConfirmarSenha ? (
                        <EyeOff className="h-6 w-6 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-6 w-6 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <div className="text-base text-gray-500 pl-3">Confirmar senha</div>
                </div>
              </div>

              {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

              <Button
                type="submit"
                className="w-full h-16 text-xl bg-[#1EAED3] hover:bg-[#1a9cbf] text-white font-medium rounded-full"
                disabled={loading}
              >
                {loading ? "Redefinindo..." : "Redefinir senha"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


