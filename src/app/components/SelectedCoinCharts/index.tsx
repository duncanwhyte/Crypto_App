import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import handleCurrency from "@/app/utils/handleCurrency";
import { Chart as ChartJs, CategoryScale, LinearScale, LineElement, PointElement ,Title, Tooltip, Legend, Filler, BarElement} from "chart.js";
import {Line, Bar} from "react-chartjs-2";
import { updateCoinData } from "@/app/lib/features/selectedCoins/selectedCoinsSlice";
import handleCoinDateDisplay from "@/app/utils/handleCoinDateDisplay";
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
const selectCurrency = (state) => state.currentCurrency;
const selectGraphTimeDuration = (state) => state.graphTimeDuration.graphTimeDuration;
export default function SelectedCoinsCharts() {
    const currentCurrency = useAppSelector(selectCurrency);
    const [coin1, coin2, coin3] = useAppSelector(selectUserCoins);
    const graphTimeDuration = useAppSelector(selectGraphTimeDuration);
    const dispatch = useAppDispatch();
    const lineConfig = {
        labels: coin1?.coinData.prices.map((price: number[]) => {
            return handleCoinDateDisplay(new Date(price[0]), graphTimeDuration);
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
        labels: coin1?.coinData.total_volumes.map((volume: number[]) => {
            return handleCoinDateDisplay(new Date(volume[0]), graphTimeDuration);
        }),
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
                    gradient.addColorStop(0.5, "#9D62D9");
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
        responsiveness: true,
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
                ticks: {
                    align: "inner"
                }
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
        responsiveness: true,
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
    useEffect(() => {
        if (coin1) {
            dispatch(updateCoinData(coin1));
        }
        if (coin2) {
            dispatch(updateCoinData(coin2));
        }
        if (coin3) {
            dispatch(updateCoinData(coin3));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [graphTimeDuration, currentCurrency]);
    const currentDate = new Date().toDateString();
    return (
        <div className="flex gap-8 mb-14 relative">
                <div className="flex flex-col p-6 items-start w-full bg-[#191932] rounded-xl">
                    <div className="mb-6">
                        {coin1 && !coin2 && !coin3 
                        ?
                        <>
                        <h3 className="text-xl text-[#D1D1D1]">{coin1?.name} ({coin1?.symbol.toUpperCase()})</h3>
                        <p className="text-2xl font-bold">{handleCurrencySymbol(currentCurrency)}{coin1?.current_price}</p>
                        <p className="text-[#D1D1D1]">{currentDate}</p>
                        </>
                         :
                         <p className={"text-2xl font-bold"}>{currentDate}</p>
                         }
                    </div>
                    <Line style={{width: "100%"}} options={lineChartOptions} data={lineConfig} />
                    <div>
                        <div className="flex items-center space-x-2">
                            {coin1 && coin2 && !coin3 &&
                            <div className="flex justify-center w-full">
                            <div className={"flex items-center space-x-2"}>
                            <div className="w-6 h-6 rounded-sm bg-[#7878FA] text-xl"></div>
                            <p>{coin1?.name} {handleCurrencySymbol(currentCurrency)}{coin1?.current_price}</p>
                            </div>
                            <div className={"flex items-center space-x-2"}>
                            <div className="w-6 h-6 rounded-sm bg-[#9D62D9] text-xl"></div>
                            <p>{coin2?.name} {handleCurrencySymbol(currentCurrency)}{coin2?.current_price}</p>
                            </div>
                            </div>
                            }
                            {
                            coin1 && coin2 && coin3 &&
                            <div className="flex justify-center w-full">
                            <div className={"flex items-center space-x-2"}>
                            <div className="w-6 h-6 rounded-sm bg-[#7878FA] text-xl"></div>
                            <p>{coin1?.name} {handleCurrencySymbol(currentCurrency)}{coin1?.current_price}</p>
                            </div>
                            <div className={"flex items-center space-x-2"}>
                            <div className="w-6 h-6 rounded-sm bg-[#9D62D9] text-xl"></div>
                            <p>{coin2?.name} {handleCurrencySymbol(currentCurrency)}{coin2?.current_price}</p>
                            </div>
                            <div className={"flex items-center space-x-2"}>
                            <div className="w-6 h-6 rounded-sm bg-[#6263D9] text-xl"></div>
                            <p>{coin3?.name} {handleCurrencySymbol(currentCurrency)}{coin3?.current_price}</p>
                            </div>
                            </div>
                            }
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="w-full flex flex-col relative p-6 bg-[#191932] rounded-xl">
                    <div className="mb-6">
                        {
                            coin1 && !coin2 && !coin3 
                            ?
                        <div>
                        <h3 className="text-xl text-[#D1D1D1]">Volume 24h</h3>
                        <p className="text-2xl font-bold">$807.243 bln</p>
                        <p className="text-[#D1D1D1]">{currentDate}</p>
                        </div>
                            :
                        <div>
                        <h3 className="text-2xl font-bold">Volume 24h</h3>
                        <p className="text-[#D1D1D1]">{currentDate}</p>
                        </div>
                        }
                    </div>
                    <Bar data={barConfig} options={barChartOptions} />
                    <div>
                        <div className="flex items-center space-x-2">
                        {coin1 && coin2 && !coin3 &&
                            <>
                            <div className={"flex items-center space-x-2"}>
                            <div className="w-6 h-6 rounded-sm bg-[#7878FA] text-xl"></div>
                            <p>{coin1?.name} {handleCurrencySymbol(currentCurrency)}{handleCurrency(coin1?.total_volume)}</p>
                            </div>
                            <div className={"flex items-center space-x-2"}>
                            <div className="w-6 h-6 rounded-sm bg-[#9D62D9] text-xl"></div>
                            <p>{coin2?.name} {handleCurrencySymbol(currentCurrency)}{handleCurrency(coin2?.total_volume)}</p>
                            </div>
                            </>
                            }
                            {
                            coin1 && coin2 && coin3 &&
                            <>
                            <div className={"flex items-center space-x-2"}>
                            <div className="w-6 h-6 rounded-sm bg-[#7878FA] text-xl"></div>
                            <p>{coin1?.name} {handleCurrencySymbol(currentCurrency)}{handleCurrency(coin1?.total_volume)}</p>
                            </div>
                            <div className={"flex items-center space-x-2"}>
                            <div className="w-6 h-6 rounded-sm bg-[#9D62D9] text-xl"></div>
                            <p>{coin2?.name} {handleCurrencySymbol(currentCurrency)}{handleCurrency(coin2?.total_volume)}</p>
                            </div>
                            <div className={"flex items-center space-x-2"}>
                            <div className="w-6 h-6 rounded-sm bg-[#6263D9] text-xl"></div>
                            <p>{coin3?.name} {handleCurrencySymbol(currentCurrency)}{handleCurrency(coin3?.total_volume)}</p>
                            </div>
                            </>
                            }
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
    );
}