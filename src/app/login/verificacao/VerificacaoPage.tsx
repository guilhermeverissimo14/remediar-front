"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/assets/Ativo 12.png";
import Background from "@/assets/Rectangle 1.png";
import { Toaster, toast } from "sonner";

export default function VerificacaoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [codigoArray, setCodigoArray] = useState<string[]>(Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const { verificarCodigo, loading } = useAuth();
  const { reenviarCodigo } = useAuth();
  const codigo = codigoArray.join("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!email) {
      router.push("/login");
    }
  }, [email, router]);

  useEffect(() => {
    let countdown: NodeJS.Timeout;

    if (!canResend && timer > 0) {
      countdown = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }

    return () => clearTimeout(countdown);
  }, [timer, canResend]);

  const handleVerificar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    try {
      await verificarCodigo(email, codigo);
      router.push("/login");
    } catch (err: any) {
      setErro(err.message || "Erro ao verificar código");
      setCodigoArray(Array(6).fill(""));
      const firstInput = document.getElementById("input-0");
      if (firstInput) (firstInput as HTMLInputElement).focus();
    }
  };

  const handleReenviarCodigo = async () => {
    try {
      await reenviarCodigo(email);
      toast.success("Código reenviado com sucesso! Verifique seu e-mail.");
      setCanResend(false);
      setTimer(30);
    } catch (err: any) {
      setErro(err.message || "Erro ao reenviar código");
      toast.error(err.message || "Erro ao reenviar código");
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center bg-[#1EAED3] relative">
        <Image
          src={Background}
          alt="Background"
          fill
          className="absolute object-cover"
        />
        <div className="p-8 flex flex-col items-center relative z-10">
          <Image
            src={Logo}
            alt="Remediar Logo"
            width={400}
            height={133}
            className="mb-6"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-12">
        <div className="flex flex-1 flex-col items-center justify-center max-w-[520px] mx-auto w-full">
          <form onSubmit={handleVerificar} className="w-full space-y-10">
            <div className="space-y-3 text-center">
              <h1 className="text-[2.5rem] font-bold tracking-tight">
                Verifique seu Código
              </h1>
              <p className="text-xl text-muted-foreground">
                Enviamos um código para o email{" "}
                <span className="font-semibold">{email}</span>
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-center gap-3">
                {codigoArray.map((digit, index) => (
                  <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-14 h-16 text-center text-2xl border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EAED3]"
                    value={digit}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0, 1);
                      if (val) {
                        const newArr = [...codigoArray];
                        newArr[index] = val;
                        setCodigoArray(newArr);
                        const nextInput = document.getElementById(
                          `input-${index + 1}`
                        );
                        if (nextInput) (nextInput as HTMLInputElement).focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !codigoArray[index] &&
                        index > 0
                      ) {
                        const prevInput = document.getElementById(
                          `input-${index - 1}`
                        );
                        if (prevInput) (prevInput as HTMLInputElement).focus();
                      }
                    }}
                    onPaste={(e) => e.preventDefault()}
                  />
                ))}
              </div>

              <div className="text-base text-gray-500 text-center">
                Código de verificação
              </div>
            </div>

            {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

            <Button
              type="submit"
              className="w-full h-16 text-xl bg-[#1EAED3] hover:bg-[#1a9cbf] text-white font-medium rounded-full"
              disabled={loading}
            >
              {loading ? "Verificando..." : "Verificar"}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleReenviarCodigo}
                className={`mt-4 text-md ${
                  canResend
                    ? "text-[#1EAED3] hover:underline cursor-pointer"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                disabled={!canResend}
              >
                {canResend ? "Reenviar código" : `Reenviar em ${timer}s`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
