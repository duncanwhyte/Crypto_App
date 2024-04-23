import { useAppSelector } from "@/app/lib/hooks";
import handleCoinDates from "@/app/utils/handleCoinDates";
import { Chart as ChartJs, CategoryScale, LinearScale, LineElement, PointElement ,Title, Tooltip, Legend, Filler} from "chart.js";
import {  Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
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
interface State {
    currentCurrency: string;
}
interface CoinData {
    index: number,
    price: number
}
const currencySelect = (state: State) => state.currentCurrency;
export default function CoinChart({id, chartColor}: {id : string, chartColor: string}) {
    const currentCurrency = useAppSelector(currencySelect);
    const [prices, setPrices] = useState<CoinData[] | null>(null);
    useEffect(() => {
        const getLast7DaysData = async () => {
            const [currentTime, pastTime] = handleCoinDates(7);
            const coinChartReq = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/range?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q&vs_currency=${currentCurrency}&from=${pastTime}&to=${currentTime}`);
            const coinChartData = await coinChartReq.json();
            const data: [] = coinChartData.prices.reduce((initVal: [], currVal: number[], index: number) => {
                return [...initVal,{
                    index: index + 1,
                    price: currVal[1]
                }
            ];
        }, []);
        setPrices(data);
        };
        getLast7DaysData();
    }, [id, currentCurrency]);
    const config = {
        labels: prices?.map((price: CoinData) => price.index),
        datasets: [
            {
                label: "Prices",
                data: prices?.map((price: CoinData) => price.price),
                backgroundColor: (context: any) => {
                    if (!context.chart.chartArea) return; 
                    const {ctx, chartArea: {top, bottom}} = context.chart;
                    const gradient = ctx.createLinearGradient(0, top, 0, bottom);
                    gradient.addColorStop(0, `${chartColor}`);
                    gradient.addColorStop(1, "rgba(0, 0, 0, 0.0)");
                    return gradient;
                },
                borderColor: `${chartColor}`,
                borderWidth: 3,
                pointRadius: 0,
                fill: true,
            },
        ]
    };
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false
            },
            tooltip: {
                enabled: false
            },
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                display: false,
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            x: {
                display: false,
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        },
        tension: 0.5
    };
    return (
        <div className={"relative w-full h-20 pr-5"}>
            <Line data={config} options={options} />
        </div>
    );
    }