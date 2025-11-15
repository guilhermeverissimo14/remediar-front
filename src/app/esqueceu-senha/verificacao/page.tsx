"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function VerificacaoPage() {
  const router = useRouter()
  const [codigo, setCodigo] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState("")

  useEffect(() => {
    // Recuperar o email do localStorage
    const storedEmail = localStorage.getItem("recoveryEmail")
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro("")

    if (!codigo || codigo.length !== 6) {
      setErro("Por favor, informe o código de 6 dígitos")
      return
    }

    setLoading(true)

    try {
      // Aqui você implementaria a lógica para verificar o código
      // Por enquanto, apenas simulamos um delay e redirecionamos
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/esqueceu-senha/nova-senha")
    } catch (err: any) {
      setErro(err.message || "Código inválido")
    } finally {
      setLoading(false)
    }
  }

  const handleAlterarEmail = () => {
    router.push("/esqueceu-senha")
  }

  const handleReenviarCodigo = async () => {
    try {
      // Aqui você implementaria a lógica para reenviar o código
      // Por enquanto, apenas mostramos uma mensagem
      alert("Código reenviado com sucesso!")
    } catch (err) {
      alert("Erro ao reenviar código")
    }
  }

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
              <h1 className="text-[2rem] font-bold">Acabamos de enviar um código para seu e-mail</h1>
              <p className="text-gray-500">Insira o código de verificação de 6 dígitos enviados para seu e-mail.</p>
              <button
                type="button"
                onClick={handleAlterarEmail}
                className="text-[#19b5de] text-sm hover:underline mt-2 font-medium"
              >
                Alterar e-mail
              </button>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Código de 6 dígitos"
                  className="h-12 text-sm border rounded-md w-full text-center"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                  maxLength={6}
                />
              </div>

              {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleReenviarCodigo}
                  className="text-[#19b5de] text-sm hover:underline font-medium"
                >
                  Reenviar código
                </button>
              </div>

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
