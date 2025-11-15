import { Suspense } from "react";
import WrapperVerificacao from "./WrapperVerificacao";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <WrapperVerificacao />
    </Suspense>
  );
}