"use client";
import { useEffect } from "react";
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
import { Line } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import {
  fetchBuyingCoinData,
  fetchSellingCoinData,
} from "@/app/lib/features/conversionCoins/conversionCoinsSlice";
import handleCoinDateDisplay from "@/app/utils/handleCoinDateDisplay";
import handleCoinChartColor from "@/app/utils/handleCoinChartColor";
import handleRenderConversionData from "@/app/utils/handleRenderConversionData";
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
const conversionCoinsSelector = (state) =>
  state.conversionCoins.conversionCoins;
const selectGraphTimeDuration = (state) =>
  state.graphTimeDuration.graphTimeDuration;
export default function ConversionChart({ sellingCoin, buyingCoin }) {
  const graphTimeDuration = useAppSelector(selectGraphTimeDuration);
  const conversionCoins = useAppSelector(conversionCoinsSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    buyingCoin && dispatch(fetchBuyingCoinData(buyingCoin));
    sellingCoin && dispatch(fetchSellingCoinData(sellingCoin));
  }, [graphTimeDuration, dispatch, sellingCoin, buyingCoin]);
  const config = {
    labels: conversionCoins?.sellingCoin?.prices?.map((price) => {
      return handleCoinDateDisplay(new Date(price[0]), graphTimeDuration);
    }),
    datasets: [
      {
        id: 1,
        label: conversionCoins?.sellingCoin?.name,
        data: handleRenderConversionData(conversionCoins?.sellingCoin),
        backgroundColor: handleCoinChartColor("#7878FA", "#7474F203"),
        borderColor: "#7878FA",
        borderWidth: 3,
        pointRadius: 0,
        fill: true,
      },
      {
        id: 2,
        label: conversionCoins?.buyingCoin?.name,
        data: handleRenderConversionData(conversionCoins?.buyingCoin),
        backgroundColor: handleCoinChartColor("#9D62D9", "#B374F203"),
        borderColor: "#9D62D9",
        borderWidth: 3,
        pointRadius: 0,
        fill: true,
      },
    ],
  };
  const options = {
    responsiveness: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beforeFit(axis) {
          const labels = axis.chart.config._config.data.labels;
          const length = labels.length - 1;
          axis.ticks.push({
            value: length,
            label: handleCoinDateDisplay(
              conversionCoins?.sellingCoin?.prices[length][0],
              graphTimeDuration
            ),
          });
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: 5,
          align: "inner",
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };
  return (
    <div>
      <Line height={197} data={config} options={options} />
    </div>
  );
}
