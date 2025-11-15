"use client"

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userDropdownItems } from "@/utils/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

interface DashNavbarProps {
  Icon: React.ElementType;
  title: string;
}

export function DashNavbar({ Icon, title }: DashNavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const fullName = user?.nome ? user.nome : "usuário";
  const initials = fullName
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleMenuClick = (item: (typeof userDropdownItems)[0]) => {
    if (item.label === "Sair") {
      logout(); // chama função do contexto
      router.push("/"); // redireciona para home
      return;
    }

    // se já estiver na URL, não faz nada
    if (!pathname.includes(item.url)) {
      router.push(`${pathname}${item.url}`);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="hidden md:flex items-center gap-3 text-xl px-2 whitespace-nowrap">
        <div className="text-2xl">
          <Icon />
        </div>
        <span className="font-semibold truncate max-w-xs">{title}</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 focus:outline-none hover:cursor-pointer">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-md border-2 font-semibold text-sm text-white"
              style={{
                backgroundColor: "rgba(63, 175, 195, 0.2)",
                borderColor: "#2e8a9c",
              }}
            >
              {initials}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xs leading-3 font-medium">{fullName}</span>
              <span className="text-[10px] text-gray-500">
                {user?.role === "USER" ? "Usuário" : "Administrador"}
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56 mt-2">
          {userDropdownItems.map((item) => (
            <DropdownMenuItem
              key={item.label}
              onClick={() => handleMenuClick(item)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
