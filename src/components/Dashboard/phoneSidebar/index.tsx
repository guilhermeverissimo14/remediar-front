import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { menuPrincipalItems, ConfiguracaoItems } from "@/utils/constants"
 
export default function PhoneSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          {menuPrincipalItems.map((item) => (
            <SheetClose asChild key={item.url}>
              <Link href={item.url}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <item.icon size={20} />
                  {item.nome}
                </Button>
              </Link>
            </SheetClose>
          ))}
          {ConfiguracaoItems.map((item) => (
            <SheetClose asChild key={item.url}>
              <Link href={item.url}>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <item.icon size={20} />
                  {item.nome}
                </Button>
              </Link>
            </SheetClose>
          ))}
        </div>
        <SheetFooter />
      </SheetContent>
    </Sheet>
  );
}