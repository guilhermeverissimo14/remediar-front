"use client"

import { useEffect, useState } from "react"
import { LayoutDashboard, Pill, DollarSign, ClipboardList, User } from "lucide-react"
import DashboardLayout from "@/components/Dashboard/layouts/dashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/services/api/api"
import { ConfiguracaoClienteItems, menuPrincipalClienteItems } from "@/utils/constants"

export default function Dashboard() {
  const { user } = useAuth()
  const [usuarioData, setUsuarioData] = useState<any>(null)
  const [qtdDoacoes, setQtdDoacoes] = useState<number>(0)
  const [qtdSolicitacoes, setQtdSolicitacoes] = useState<number>(0)

  useEffect(() => {
    if (!user?.id) return

    const fetchUser = async () => {
      try {
        const response = await api.get(`/usuarios/${user.id}`)
        setUsuarioData(response.data)
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err)
      }
    }

    fetchUser()
  }, [user])

  useEffect(() => {
    if (!user?.id) return

    const fetchDoacoes = async () => {
      try {
        const response = await api.get(`/solicitacoes/pesquisar/doacoes/autorId/${user.id}`)
        const doacoes = response.data
        setQtdDoacoes(Array.isArray(doacoes) ? doacoes.length : 0)
      } catch (err) {
        console.error("Erro ao buscar doações do usuário:", err)
        setQtdDoacoes(0)
      }
    }

    fetchDoacoes()
  }, [user])

  useEffect(() => {
  if (!user?.id) return

  const fetchSolicitacoes = async () => {
    try {
      const response = await api.get(`/solicitacoes/pesquisar/pedidos/autorId/${user.id}`)
      const solicitacoes = response.data
      setQtdSolicitacoes(Array.isArray(solicitacoes) ? solicitacoes.length : 0)
    } catch (err) {
      console.error("Erro ao buscar solicitações do usuário:", err)
      setQtdSolicitacoes(0)
    }
  }

  fetchSolicitacoes()
}, [user])

  const CardInfo = ({ icon, label, value, color }: any) => (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2 bg-${color}-100 text-${color}-700`}>
          {icon}
        </div>
        <h4 className="text-sm text-gray-500">{label}</h4>
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  )

  return (
    <DashboardLayout
      title="Visão Geral"
      Icon={() => <LayoutDashboard />}
      menuPrincipalItems={menuPrincipalClienteItems}
      configuracaoItems={ConfiguracaoClienteItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bem-vindo, {usuarioData?.usuario?.nome || "usuário"}!</h1>
          <p className="text-gray-500 text-sm">Estamos felizes em ter você aqui. Aqui está um resumo da sua atividade.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <CardInfo
            icon={<User className="w-5 h-5" />}
            label="Nome"
            value={usuarioData?.usuario?.nome || "-"}
            color="blue"
          />
          <CardInfo
            icon={<DollarSign className="w-5 h-5" />}
            label="Renda Familiar"
            value={
              usuarioData?.rendaFamiliar
                ? `R$ ${Number(usuarioData.rendaFamiliar).toLocaleString("pt-BR")}`
                : "-"
            }
            color="green"
          />
          <CardInfo
            icon={<Pill className="w-5 h-5" />}
            label="Doações de Remédio"
            value={`${qtdDoacoes}`}
            color="purple"
          />
          <CardInfo
            icon={<ClipboardList className="w-5 h-5" />}
            label="Solicitações"
            value={`${qtdSolicitacoes}`}
            color="orange"
          />
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Seus Dados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl p-6 shadow">
            <div>
              <span className="text-sm text-gray-500">E-mail</span>
              <p className="text-md font-medium">{usuarioData?.usuario?.user?.login || "-"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Documento</span>
              <p className="text-md font-medium">{usuarioData?.usuario?.documento || "-"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Telefone</span>
              <p className="text-md font-medium">{usuarioData?.usuario?.telefone || "-"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Nascimento</span>
              <p className="text-md font-medium">{usuarioData?.dataNascimento || "-"}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
