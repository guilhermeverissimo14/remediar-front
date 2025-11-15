import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

type GraficoMensalProps = {
  titulo: string;
  dados: number[];
};

const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

export default function GraficoAnual({ titulo, dados }: GraficoMensalProps) {
  const chartData = {
    labels: meses,
    datasets: [
      {
        label: 'Quantidade',
        data: dados,
        backgroundColor: '#111111',
        borderRadius: 6,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

return (
  <div className="border rounded p-4 justify-center items-center">
    <h2 className="text-lg font-semibold mb-4">{titulo}</h2>
    <div className="w-full h-[300px]">
      <Bar data={chartData} options={options} />
    </div>
  </div>
);
}
