type RequestData = {
  titulo: string;
  numero: string;
};

export default function TotalCard({ titulo, numero }: RequestData) {

  return (
    <div className="w-full flex flex-col justify-center items-center border rounded gap-3 p-3">
      <span>{titulo}</span>
      <span className="font-semibold text-2xl">{numero}</span>
    </div>
  );
}