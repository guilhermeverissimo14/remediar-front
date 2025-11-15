"use client"

import { useEffect, useState } from "react"
import { Settings, Edit, Save, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import DashboardLayout from "@/components/Dashboard/layouts/dashboardLayout"
import { useAuth } from "@/contexts/AuthContext"
import { api } from "@/services/api/api"
import { menuPrincipalClienteItems, ConfiguracaoClienteItems } from "@/utils/constants"

export default function PerfilUsuario() {
  const { user } = useAuth()
  const [editing, setEditing] = useState(false)

  const [userData, setUserData] = useState<any>({
    nome: "",
    email: "",
    telefone: "",
    documento: "",
    genero: "",
    dataNascimento: "",
    escolaridade: "",
    qtdPessoasCasa: "",
    rendaFamiliar: "",
    endereco: {
      cep: "",
      estado: "",
      cidade: "",
      logradouro: "",
      numero: "",
      complemento: "",
    },
  })

  const [tempData, setTempData] = useState(userData)

  useEffect(() => {
    if (!user?.id) return

    const fetch = async () => {
      const response = await api.get(`/usuarios/${user.id}`)
      const data = response.data

      const formatted = {
        nome: data.usuario.nome,
        email: data.usuario.user?.login || "",
        telefone: data.usuario.telefone,
        documento: data.usuario.documento,
        genero: data.genero,
        dataNascimento: data.dataNascimento,
        escolaridade: data.escolaridade,
        qtdPessoasCasa: data.qtdPessoasCasa,
        rendaFamiliar: data.rendaFamiliar,
        endereco: {
          cep: data.usuario.endereco?.cep || "",
          estado: data.usuario.endereco?.estado || "",
          cidade: data.usuario.endereco?.cidade || "",
          logradouro: data.usuario.endereco?.logradouro || "",
          numero: data.usuario.endereco?.numero || "",
          complemento: data.usuario.endereco?.complemento || "",
        },
      }

      setUserData(formatted)
      setTempData(formatted)
    }

    fetch()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name.startsWith("endereco.")) {
      const [_, field] = name.split(".")
      setTempData((prev: any) => ({
        ...prev,
        endereco: { ...prev.endereco, [field]: value },
      }))
    } else {
      setTempData({ ...tempData, [name]: value })
    }
  }

  const save = () => {
    setUserData({ ...tempData })
    setEditing(false)
    // api.put(...) aqui se quiser salvar no backend
  }

  const cancel = () => {
    setTempData(userData)
    setEditing(false)
  }

  const renderLine = (label: string, value: string | number, badge?: boolean, color?: string) => (
    <div className="flex justify-between items-center">
      <span className="text-sm text-muted-foreground">{label}</span>
      {badge ? (
        <span className={`px-2 py-1 text-xs rounded-full font-semibold bg-${color}-100 text-${color}-800`}>
          {value || "-"}
        </span>
      ) : (
        <span className="text-sm font-medium text-gray-900">{value || "-"}</span>
      )}
    </div>
  )

  const renderInput = (label: string, name: string, value: string) => (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground">{label}</label>
      <Input name={name} value={value} onChange={handleChange} />
    </div>
  )

  return (
    <DashboardLayout
      title="Configurações"
      Icon={() => <Settings />}
      menuPrincipalItems={menuPrincipalClienteItems}
      configuracaoItems={ConfiguracaoClienteItems}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* PERFIL PRINCIPAL */}
        <Card className="col-span-2 p-6 rounded-2xl shadow-md bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Meu Perfil</h2>
            {editing ? (
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={cancel}>
                  <X className="w-4 h-4 mr-1" /> Cancelar
                </Button>
                <Button className="bg-[#3FAFC3]" size="sm" onClick={save}>
                  <Save className="w-4 h-4 mr-1" /> Salvar
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                <Edit className="w-4 h-4 mr-1" /> Editar
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {editing
              ? <>
                  {renderInput("Nome", "nome", tempData.nome)}
                  {renderInput("Email", "email", tempData.email)}
                  {renderInput("Telefone", "telefone", tempData.telefone)}
                  {renderInput("Documento", "documento", tempData.documento)}
                  {renderInput("Data de Nascimento", "dataNascimento", tempData.dataNascimento)}
                  {renderInput("Gênero", "genero", tempData.genero)}
                  {renderInput("Escolaridade", "escolaridade", tempData.escolaridade)}
                  {renderInput("Qtd. Pessoas na Casa", "qtdPessoasCasa", tempData.qtdPessoasCasa)}
                  {renderInput("Renda Familiar", "rendaFamiliar", tempData.rendaFamiliar)}
                </>
              : <>
                  {renderLine("Nome", userData.nome)}
                  {renderLine("Email", userData.email)}
                  {renderLine("Telefone", userData.telefone)}
                  {renderLine("Documento", userData.documento)}
                  {renderLine("Nascimento", userData.dataNascimento)}
                  {renderLine("Gênero", userData.genero, true, "blue")}
                  {renderLine("Escolaridade", userData.escolaridade, true, "green")}
                  {renderLine("Pessoas na Casa", userData.qtdPessoasCasa)}
                  {renderLine("Renda Familiar", `R$ ${Number(userData.rendaFamiliar).toLocaleString("pt-BR")}`)}
                </>
            }
          </div>
        </Card>

        {/* ENDEREÇO */}
        <Card className="p-6 rounded-2xl shadow-md bg-white h-fit">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Endereço</h2>
          <div className="space-y-3">
            {editing
              ? <>
                  {renderInput("CEP", "endereco.cep", tempData.endereco.cep)}
                  {renderInput("Estado", "endereco.estado", tempData.endereco.estado)}
                  {renderInput("Cidade", "endereco.cidade", tempData.endereco.cidade)}
                  {renderInput("Logradouro", "endereco.logradouro", tempData.endereco.logradouro)}
                  {renderInput("Número", "endereco.numero", tempData.endereco.numero)}
                  {renderInput("Complemento", "endereco.complemento", tempData.endereco.complemento)}
                </>
              : <>
                  {renderLine("CEP", userData.endereco.cep)}
                  {renderLine("Estado", userData.endereco.estado)}
                  {renderLine("Cidade", userData.endereco.cidade)}
                  {renderLine("Logradouro", userData.endereco.logradouro)}
                  {renderLine("Número", userData.endereco.numero)}
                  {renderLine("Complemento", userData.endereco.complemento)}
                </>
            }
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}