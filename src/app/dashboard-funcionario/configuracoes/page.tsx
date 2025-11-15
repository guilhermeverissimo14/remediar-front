"use client"

import { useEffect, useState } from "react"
import { Edit, Save, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/Dashboard/layouts/dashboardLayout"
import { ConfiguracaoItems, menuPrincipalItems } from "@/utils/constants"
import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/services/api/api"

export default function GerenciamentoPerfilUsuario() {
  const { user } = useAuth()
  const [editingSection, setEditingSection] = useState<string | null>(null)

  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    telefone: "",
  })

  const [tempData, setTempData] = useState({ ...userData })

  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        if (!user?.id) return

        const response = await api.get(`/funcionarios/${user.id}`)
        const data = response.data

        setUserData({
          nome: data.nome || "",
          email: data.email || "",
          telefone: data.telefone || "",
        })
      } catch (error) {
        console.error("Erro ao buscar funcionário:", error)
      }
    }

    fetchFuncionario()
  }, [user])

  const handleEdit = (section: string) => {
    setEditingSection(section)
    setTempData({ ...userData })
  }

  const handleSave = (section: string) => {
    setUserData({ ...userData, ...tempData })
    setEditingSection(null)
    // Aqui você pode fazer um PUT/POST para salvar os dados, se desejar
  }

  const handleCancel = () => {
    setEditingSection(null)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempData({
      ...tempData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <DashboardLayout
      title="Configurações"
      Icon={() => <Settings />}
      menuPrincipalItems={menuPrincipalItems}
      configuracaoItems={ConfiguracaoItems}
    >
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4">Meu Perfil</h2>

        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">Informações Pessoais</CardTitle>
            {editingSection === "pessoal" ? (
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-1" />
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleSave("pessoal")}
                  className="bg-[#3FAFC3] hover:bg-[#3FAFC3]/90"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Salvar
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => handleEdit("pessoal")}>
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {editingSection === "pessoal" ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Nome Completo</label>
                  <Input name="nome" value={tempData.nome} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">E-mail</label>
                  <Input name="email" value={tempData.email} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Telefone</label>
                  <Input name="telefone" value={tempData.telefone} onChange={handleChange} />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 font-medium">Nome completo</div>
                  <div className="text-base">{userData.nome}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">E-mail</div>
                  <div className="text-base">{userData.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-medium">Telefone</div>
                  <div className="text-base">{userData.telefone}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}