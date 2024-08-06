import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useTheme } from "next-themes";
import { Line } from "react-chartjs-2";
ChartJs.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
export default function CoinChart({
  chartColor,
  prices,
}: {
  chartColor: string;
  prices: number[];
}) {
  const { theme } = useTheme();
  const config = {
    labels: prices?.map((price: number) => price),
    datasets: [
      {
        label: "Prices",
        data: prices?.map((price: number) => price),
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) return;
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, `${chartColor}`);
          gradient.addColorStop(
            1,
            `${theme === "dark" ? "rgba(0, 0, 0, 0.0)" : "#FFFFFF"}`
          );
          return gradient;
        },
        borderColor: `${chartColor}`,
        borderWidth: 3,
        pointRadius: 0,
        fill: true,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      x: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
    tension: 0.5,
  };
  return (
    <div
      className={
        "relative flex items-center w-[90px] md:w-full mx-auto md:mx-0 h-20"
      }
    >
      <Line className="lg:mx-auto" data={config} options={options} />
    </div>
  );
}
