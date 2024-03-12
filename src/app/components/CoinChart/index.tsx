import { useAppSelector } from "@/app/lib/hooks";
import handleCoinDates from "@/app/utils/handleCoinDates";
import { Chart as ChartJs, CategoryScale, LinearScale, LineElement, PointElement} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
ChartJs.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
);
interface State {
    currentCurrency: string;
}
interface CoinData {
    index: number,
    price: number
}
const currencySelect = (state: State) => state.currentCurrency;
export default function CoinChart({id}: {id : string}) {
    const currentCurrency = useAppSelector(currencySelect);
    const [prices, setPrices] = useState<CoinData[] | null>(null);
    useEffect(() => {
        const getLast7DaysData = async () => {
            const [currentTime, pastTime] = handleCoinDates();
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
                borderColor: "lightgreen",
                borderWidth: 3,
            },
        ]
    };
    const options = {
        responsive: true,
    };
    return (
    <Line data={config} options={options} />
    );
    }