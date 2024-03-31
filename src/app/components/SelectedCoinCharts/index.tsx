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
        labels: coin1?.coinData.prices.map((price: number[]) => new Date(price[0]).toDateString()),
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
                gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
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
                gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
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
                gradient.addColorStop(0, "#7878FA");
                gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
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
                    gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
                    return gradient;
                },
                borderRadius: 10,
                barThickness: 2,
                order: 3,
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
                    gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
                    return gradient;
                },
                borderRadius: 10,
                barThickness: 3,
                order: 2,
            },
            {
                id: 3,
                label: coin3?.id || "Coin 3",
                data: coin3?.coinData?.total_volumes.map((volume: number[]) => volume[1]),
                backgroundColor: "",
                borderRadius: 10,
                barThickness: 3,
                order: 1,
            }
        ]
    };
    return (
        <div className="flex relative">
                <div className="w-full">
                    <Line data={lineConfig} />
                </div>
                <div className="w-full">
                    <Bar data={barConfig} />
                </div>
            </div>
    );
}