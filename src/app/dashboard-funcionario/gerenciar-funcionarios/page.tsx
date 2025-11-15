"use client"

import type React from "react"
import { useState } from "react"
import { Edit, Save, X, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/components/Dashboard/layouts/dashboardLayout"
import { ConfiguracaoItems, menuPrincipalItems } from "@/utils/constants"
import { Settings } from "lucide-react"

export default function GerenciarFuncionario() {
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState("")

  // Dados de funcionários (em uma aplicação real, estes viriam de uma API)
  const [employees, setEmployees] = useState([
    {
      id: 1,
      nome: "João Silva",
      email: "joao.silva@gmail.com",
      telefone: "(31) 98765-4321",
      cpf: "123.456.789-00",
      dataContratacao: "15/01/2020",
    },
    {
      id: 2,
      nome: "Ana Oliveira",
      email: "ana.oliveira@gmail.com",
      telefone: "(31) 91234-5678",
      cpf: "987.654.321-00",
      dataContratacao: "03/05/2021",
    },
    {
      id: 3,
      nome: "Carlos Mendes",
      email: "carlos.mendes@gmail.com",
      telefone: "(31) 99876-5432",
      cpf: "456.789.123-00",
      dataContratacao: "22/11/2022",
    },
  ])

  // Novo funcionário
  const [newEmployee, setNewEmployee] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataContratacao: "",
  })

  // Funcionário em edição
  const [editEmployee, setEditEmployee] = useState({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    dataContratacao: "",
  })

  // Função para aplicar máscara de CPF
  const applyCpfMask = (value: string) => {
    const digits = value.replace(/\D/g, "").substring(0, 11)
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
  }

  // Função para aplicar máscara de telefone
  const applyPhoneMask = (value: string) => {
    const digits = value.replace(/\D/g, "").substring(0, 11)
    return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")
  }

  // Função para validar CPF
  const validateCPF = (cpf: string) => {
    const digits = cpf.replace(/\D/g, "")
    if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false

    let soma = 0
    for (let i = 0; i < 9; i++) soma += Number.parseInt(digits.charAt(i)) * (10 - i)
    let resto = 11 - (soma % 11)
    if (resto === 10 || resto === 11) resto = 0
    if (resto !== Number.parseInt(digits.charAt(9))) return false

    soma = 0
    for (let i = 0; i < 10; i++) soma += Number.parseInt(digits.charAt(i)) * (11 - i)
    resto = 11 - (soma % 11)
    if (resto === 10 || resto === 11) resto = 0
    return resto === Number.parseInt(digits.charAt(10))
  }

  // Função para validar email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Função para validar telefone
  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "")
    return /^(\d{2})(9\d{8})$/.test(digits)
  }

  // Função para validar dados
  const validateEmployeeData = (employee: any) => {
    const newErrors: string[] = []
    let message = ""

    if (!employee.nome.trim()) {
      newErrors.push("nome")
      message = "Nome é obrigatório."
    } else if (employee.nome.length > 500) {
      newErrors.push("nome")
      message = "Nome deve ter no máximo 500 caracteres."
    }

    if (!employee.email.trim()) {
      newErrors.push("email")
      message = "Email é obrigatório."
    } else if (!validateEmail(employee.email)) {
      newErrors.push("email")
      message = "Email inválido."
    }

    if (!employee.cpf.trim()) {
      newErrors.push("cpf")
      message = "CPF é obrigatório."
    } else if (!validateCPF(employee.cpf)) {
      newErrors.push("cpf")
      message = "CPF inválido."
    }

    if (!employee.telefone.trim()) {
      newErrors.push("telefone")
      message = "Telefone é obrigatório."
    } else if (!validatePhone(employee.telefone)) {
      newErrors.push("telefone")
      message = "Telefone inválido. Use um número de celular com DDD e nono dígito."
    }


    setErrors(newErrors)
    setErrorMessage(message)
    return newErrors.length === 0
  }

  const handleAddEmployee = () => {
    setIsAddingEmployee(true)
    setNewEmployee({
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      dataContratacao: "",
    })
    setErrors([])
    setErrorMessage("")
  }

  const handleSaveNewEmployee = () => {
    if (!validateEmployeeData(newEmployee)) return

    const id = employees.length > 0 ? Math.max(...employees.map((emp) => emp.id)) + 1 : 1
    setEmployees([...employees, { id, ...newEmployee }])
    setIsAddingEmployee(false)
    setErrors([])
    setErrorMessage("")
  }

  const handleEditEmployee = (employee: any) => {
    setEditingEmployeeId(employee.id)
    setEditEmployee({ ...employee })
    setErrors([])
    setErrorMessage("")
  }

  const handleSaveEditEmployee = () => {
    if (!validateEmployeeData(editEmployee)) return

    setEmployees(employees.map((emp) => (emp.id === editEmployee.id ? editEmployee : emp)))
    setEditingEmployeeId(null)
    setErrors([])
    setErrorMessage("")
  }

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id))
  }

  const handleCancelAdd = () => {
    setIsAddingEmployee(false)
    setErrors([])
    setErrorMessage("")
  }

  const handleCancelEdit = () => {
    setEditingEmployeeId(null)
    setErrors([])
    setErrorMessage("")
  }

  const handleChangeNewEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    const fieldName = e.target.name

    // Aplicar máscaras
    if (fieldName === "cpf") {
      value = applyCpfMask(value)
    } else if (fieldName === "telefone") {
      value = applyPhoneMask(value)
    } else if (fieldName === "nome" && value.length > 500) {
      value = value.substring(0, 500)
    }

    setNewEmployee({
      ...newEmployee,
      [fieldName]: value,
    })
  }

  const handleChangeEditEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    const fieldName = e.target.name

    // Aplicar máscaras
    if (fieldName === "cpf") {
      value = applyCpfMask(value)
    } else if (fieldName === "telefone") {
      value = applyPhoneMask(value)
    } else if (fieldName === "nome" && value.length > 500) {
      value = value.substring(0, 500)
    }

    setEditEmployee({
      ...editEmployee,
      [fieldName]: value,
    })
  }

  const getInputClassName = (fieldName: string) => {
    return errors.includes(fieldName) ? "border-red-500 focus:border-red-500" : ""
  }

  return (
    <DashboardLayout
      title="Funcionários"
      Icon={() => <Settings />}
      menuPrincipalItems={menuPrincipalItems}
      configuracaoItems={ConfiguracaoItems}
    >
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Gerenciar Funcionários</h1>
            </div>
            <Button onClick={handleAddEmployee} className="bg-[#3FAFC3] hover:bg-[#3FAFC3]/90">
              <Plus className="h-4 w-4 mr-1" />
              Adicionar Funcionário
            </Button>
          </div>

          {isAddingEmployee && (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md font-medium">Adicionar Novo Funcionário</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleCancelAdd}>
                    <X className="h-4 w-4 mr-1" />
                    Cancelar
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSaveNewEmployee}
                    className="bg-[#3FAFC3] hover:bg-[#3FAFC3]/90"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Salvar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Nome <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="nome"
                      value={newEmployee.nome}
                      onChange={handleChangeNewEmployee}
                      className={getInputClassName("nome")}
                      placeholder="Nome completo"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={newEmployee.email}
                      onChange={handleChangeNewEmployee}
                      className={getInputClassName("email")}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      Telefone <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="telefone"
                      value={newEmployee.telefone}
                      onChange={handleChangeNewEmployee}
                      className={getInputClassName("telefone")}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">
                      CPF <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="cpf"
                      value={newEmployee.cpf}
                      onChange={handleChangeNewEmployee}
                      className={getInputClassName("cpf")}
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div>
                  </div>
                </div>
                {errorMessage && <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>}
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Lista de Funcionários</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      {editingEmployeeId === employee.id ? (
                        <>
                          <TableCell>
                            <Input
                              name="nome"
                              value={editEmployee.nome}
                              onChange={handleChangeEditEmployee}
                              className={getInputClassName("nome")}
                              placeholder="Nome completo"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              name="email"
                              type="email"
                              value={editEmployee.email}
                              onChange={handleChangeEditEmployee}
                              className={getInputClassName("email")}
                              placeholder="email@exemplo.com"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              name="cpf"
                              value={editEmployee.cpf}
                              onChange={handleChangeEditEmployee}
                              className={getInputClassName("cpf")}
                              placeholder="000.000.000-00"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              name="telefone"
                              value={editEmployee.telefone}
                              onChange={handleChangeEditEmployee}
                              className={getInputClassName("telefone")}
                              placeholder="(00) 00000-0000"
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                                <X className="h-4 w-4" />
                                <span className="sr-only">Cancelar</span>
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={handleSaveEditEmployee}
                                className="bg-[#3FAFC3] hover:bg-[#3FAFC3]/90"
                              >
                                <Save className="h-4 w-4" />
                                <span className="sr-only">Salvar</span>
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{employee.nome}</TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>{employee.cpf}</TableCell>
                          <TableCell>{employee.telefone}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => handleEditEmployee(employee)}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Editar</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteEmployee(employee.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Excluir</span>
                              </Button>
                            </div>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {errorMessage && editingEmployeeId && <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
