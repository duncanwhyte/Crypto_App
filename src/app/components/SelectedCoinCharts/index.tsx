import { useAppSelector } from "@/app/lib/hooks";
import { Chart as ChartJs, CategoryScale, LinearScale, LineElement, PointElement ,Title, Tooltip, Legend, Filler, BarElement} from "chart.js";
import {Line, Bar} from "react-chartjs-2";
ChartJs.register(
    CategoryScale,
    LinearScale,
    LineElement,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);
const selectUserCoins = (state) => state.selectedCoins.selectedCoins;
export default function SelectedCoinsCharts() {
    const [coin1, coin2, coin3] = useAppSelector(selectUserCoins);
    const lineConfig = {
        labels: coin1?.coinData.prices.map((price: number[]) => {
            const dataDate = new Date(price[0]);
            return dataDate.toDateString();
        }),
        datasets: [
            {
            id: 1,
            label: coin1?.id || "Coin 1",
            data: coin1?.coinData?.prices.map((price: number[]) => price[1]),
            backgroundColor: (context: any) => {
                if (!context.chart.chartArea) return;
                const {ctx, chartArea: {top, bottom}} = context.chart;
                const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                gradient.addColorStop(0, "#7878FA");
                gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
                return gradient;
            },
            borderColor: "#7878FA",
            borderWidth: 3,
            pointRadius: 0,
            fill: true,
            },
            {
            id: 2,
            label: coin2?.id || "Coin 2",
            data: coin2?.coinData?.prices.map((price: number[]) => price[1]),
            backgroundColor: (context: any) => {
                if (!context.chart.chartArea) return;
                const {ctx, chartArea: {top, bottom}} = context.chart;
                const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                gradient.addColorStop(0, "#9D62D9");
                gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
                return gradient;
            },
            borderColor: "#9D62D9",
            borderWidth: 3,
            pointRadius: 0,
            fill: true,
            },
            {
            id: 3,
            label: coin3?.id || "Coin 3",
            data: coin3?.coinData?.prices.map((price: number[]) => price[1]),
            backgroundColor: (context: any) => {
                if (!context.chart.chartArea) return;
                const {ctx, chartArea: {top, bottom}} = context.chart;
                const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                gradient.addColorStop(0, "#6263D9");
                gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
                return gradient;
            },
            borderWidth: 3,
            pointRadius: 0,
            fill: true
            }
        ]
    };
    const barConfig = {
        labels: coin1?.coinData.total_volumes.map((volume: number[]) => new Date(volume[0]).toDateString()),
        datasets: [
            {
                id: 1,
                label: coin1?.id || "Coin 1",
                data: coin1?.coinData?.total_volumes.map((volume: number[]) => volume[1]),
                backgroundColor: (context: any) => {
                    if (!context.chart.chartArea) return;
                    const {ctx, chartArea: {top, bottom}} = context.chart;
                    const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                    gradient.addColorStop(0, "#9D62D9");
                    gradient.addColorStop(0.9, "#9D62D9");
                    gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
                    return gradient;
                },
                borderRadius: 3,
                barThickness: 20,
            },
            {
                id: 2,
                label: coin2?.id || "Coin 2",
                data: coin2?.coinData?.total_volumes.map((volume: number[]) => volume[1]),
                backgroundColor: (context: any) => {
                    if (!context.chart.chartArea) return;
                    const {ctx, chartArea: {top, bottom}} = context.chart;
                    const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                    gradient.addColorStop(0, "#7878FA");
                    gradient.addColorStop(0.9, "#7878FA");
                    gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
                    return gradient;
                },
                borderRadius: 3,
                barThickness: 20,
            },
            {
                id: 3,
                label: coin3?.id || "Coin 3",
                data: coin3?.coinData?.total_volumes.map((volume: number[]) => volume[1]),
                backgroundColor: (context: any) => {
                    if (!context.chart.chartArea) return;
                    const {ctx, chartArea: {top, bottom}} = context.chart;
                    const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                    gradient.addColorStop(0, "#6263D9");
                    gradient.addColorStop(0.9, "#6263D9");
                    gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
                    return gradient;
                },
                borderRadius: 3,
                barThickness: 20,
            }
        ]
    };
    const lineChartOptions = {
        plugins: {
            title: {
                display: false
            },
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
            },
            y: {
                display: false,
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    };
    const barChartOptions = {
        plugins: {
            title: {
                display: false
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                display: false,
                stacked: true,
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            x: {
                stacked: true,
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        }
    };
    return (
        <div className="flex gap-8 relative">
                <div className="flex flex-col p-6 items-start w-full bg-[#191932] rounded-xl">
                    <div className="">
                        <h3 className="text-xl text-[#D1D1D1]">Bitcoin (BTC)</h3>
                        <p className="text-2xl font-bold">$13.431 mln</p>
                        <p className="text-[#D1D1D1]">September 13 2024</p>
                    </div>
                    <Line className="w-full" options={lineChartOptions} data={lineConfig} />
                </div>
                <div className="w-full flex flex-col items-start relative items-start p-6 bg-[#191932] rounded-xl">
                    <div>
                        <h3 className="text-xl text-[#D1D1D1]">Volume 24h</h3>
                        <p className="text-2xl font-bold">$807.243 bln</p>
                        <p className="text-[#D1D1D1]">September 13 2024</p>
                    </div>
                    <Bar data={barConfig} options={barChartOptions} />
                </div>
            </div>
    );
}