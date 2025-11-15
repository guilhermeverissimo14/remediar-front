'use client';

import { ReactNode } from "react";
import { AppSidebar } from "@/components/Dashboard/sidebar";
import { DashNavbar } from "../dashNavbar";
import { SidebarItem } from "@/utils/types/SidebarItem";
import { Toaster } from "sonner";


interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  Icon: React.ElementType;
  menuPrincipalItems: SidebarItem[];
  configuracaoItems: SidebarItem[];
}

export default function DashboardLayout({
  children,
  title,
  Icon,
  menuPrincipalItems,
  configuracaoItems,
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      <div className="w-[12%] md:w-[8%] lg:w-[14%] xl:w-[12%] border-r-1">
        <AppSidebar
            menuPrincipalItems={menuPrincipalItems}
            configuracaoItems={configuracaoItems}
          />
      </div>

      <div className="w-[88%] md:w-[92%] lg:w-[86%] xl:w-[88%] flex flex-col">
        <div>
          <DashNavbar Icon={Icon} title={title} />
        </div>
        <div>
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
          <Toaster position="top-center" richColors /> 
        </div>
      </div>
    </div>
  );
}

