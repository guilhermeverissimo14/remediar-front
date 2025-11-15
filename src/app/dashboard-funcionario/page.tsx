'use client';

import DashboardLayout from "@/components/Dashboard/layouts/dashboardLayout";
import RelatorioComponent from "@/components/Dashboard/Relatorio";
import { useAuth } from "@/contexts/AuthContext";
import { ConfiguracaoItems, menuPrincipalItems } from "@/utils/constants";
import { LayoutDashboard } from "lucide-react"

export default function Dashboard() {
    const { user } = useAuth();

    return (
      <DashboardLayout
        title="Visão Geral"
        Icon={() => <LayoutDashboard />}
        menuPrincipalItems={menuPrincipalItems}
        configuracaoItems={ConfiguracaoItems}
      >
        <div className="flex flex-col gap-4">

            <h1 className="text-2xl font-bold">Bem-vindo ao painel, {user?.nome ? user.nome : "usuário"}!</h1>
            <RelatorioComponent></RelatorioComponent>

        </div>
      </DashboardLayout>
    );
  }