"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { FaPills, FaHandHoldingHeart, FaDonate, FaRecycle } from "react-icons/fa"
import { api } from "@/services/api/api"

const EstatisticasDoacoes = () => {
  const [totalPedidos, setTotalPedidos] = useState<number>(0)

  useEffect(() => {
    const fetchTotalPedidos = async () => {
      try {
        const response = await api.get("/solicitacoes/pedido", {
          params: {
            page: 0,
            size: 20,
          },
        })
        const total = response.data?.totalElements || 0
        setTotalPedidos(total)
      } catch (error) {
        console.error("Erro ao buscar total de pedidos:", error)
        setTotalPedidos(0)
      }
    }

    fetchTotalPedidos()
  }, [])

  const stats = [
    {
      label: "Medicamentos Doados",
      value: `${(20000 + totalPedidos).toLocaleString("pt-BR")}`,
      icon: <FaPills size={30} className="text-gray-700" />,
    },
    {
      label: "Total Arrecadado",
      value: "R$ 6.502,56",
      icon: <FaHandHoldingHeart size={30} className="text-gray-700" />,
    },
    {
      label: "Outras Doações(Roupas, Alimentos...)",
      value: "143",
      icon: <FaDonate size={30} className="text-gray-700" />,
    },
    {
      label: "Materias Recicláveis",
      value: "1200",
      icon: <FaRecycle size={30} className="text-gray-700" />,
    },
  ]

  return (
    <section className="flex flex-col sm:flex-row justify-center gap-6 p-6 mx-auto max-w-6xl">
      <div className="w-full text-center sm:text-left">
        <button className="bg-black text-white text-sm font-bold py-2 px-6 rounded-full mb-4">
          RESULTADOS
        </button>
        <h2 className="text-sm font-medium mb-4">
          Algumas informações nos últimos 12 meses.
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-6 w-full">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="w-full sm:w-60 h-40 flex flex-col items-center justify-center shadow-lg bg-white hover:scale-105 transition-all"
          >
            <CardContent className="flex flex-col items-center gap-2 p-4">
              {stat.icon}
              <span className="text-2xl font-bold text-gray-700">{stat.value}</span>
              <p className="text-lg text-gray-700">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default EstatisticasDoacoes
