"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import handleCurrency from "@/app/utils/handleCurrency";
import {
  Chart as ChartJs,
  CategoryScale,
  LogarithmicScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  Scale,
  CoreScaleOptions,
} from "chart.js";
import { CrosshairPlugin } from "chartjs-plugin-crosshair";
import { Line, Bar } from "react-chartjs-2";
import handleCoinDateDisplay from "@/app/utils/handleCoinDateDisplay";
import handleCoinLabelCount from "@/app/utils/handleCoinLabelCount";
import useWindowWidth from "@/app/hooks/useWindowWidth";
import Slider from "react-slick";
import { SliderNextArrow, SliderPrevArrow } from "../SliderArrows/SliderArrows";
import { updateCoinData } from "@/app/lib/features/selectedCoins/selectedCoinsSlice";
import { useTheme } from "next-themes";
import SelectedCoinStatistic from "../SelectedCoinStatistic";
ChartJs.register(
  CategoryScale,
  LogarithmicScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  CrosshairPlugin
);
interface State {
  currentCurrency: string;
  coinList: any;
  selectedCoins: any;
  graphTimeDuration: any;
}
const selectCurrency = (state: State) => state.currentCurrency;
const selectGraphTimeDuration = (state: State) =>
  state.graphTimeDuration.graphTimeDuration;
const selectUserCoins = (state: State) => state.selectedCoins.selectedCoins;
export default function SelectedCoinsCharts() {
  const currentCurrency = useAppSelector(selectCurrency);
  const windowWidth = useWindowWidth();
  const [coin1, coin2, coin3] = useAppSelector(selectUserCoins);
  const { theme } = useTheme();
  const sliderRef = useRef<Slider | null>(null);
  const coin1PriceRef = useRef<HTMLParagraphElement | null>(null);
  const coin1VolumeRef = useRef<HTMLParagraphElement | null>(null);
  const graphTimeDuration = useAppSelector(selectGraphTimeDuration);
  const [labelCount, setLabelCount] = useState(7);
  const dispatch = useAppDispatch();
  const next = (): void => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  const prev = (): void => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  const sliderSettings = {
    speed: 300,
    slidesToShow: 1,
    sliderToScroll: 1,
    infinite: false,
    nextArrow: <SliderNextArrow chartArrow={true} next={next} />,
    prevArrow: <SliderPrevArrow chartArrow={true} prev={prev} />,
    responsive: [],
  };
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
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0.6, "#7878FA");
          gradient.addColorStop(1, "#7474F203");
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
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0.6, "#9D62D9");
          gradient.addColorStop(1, "#B374F203");
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
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0.6, "#4DEEE5");
          gradient.addColorStop(1, "#4DEEEA03");
          return gradient;
        },
        borderWidth: 3,
        pointRadius: 0,
        fill: true,
      },
    ],
  };
  const barConfig = {
    labels: coin1?.coinData.total_volumes.map((volume: number[]) => {
      return handleCoinDateDisplay(new Date(volume[0]), graphTimeDuration);
    }),
    datasets: [
      {
        id: 1,
        label: coin1?.id || "Coin 1",
        data: coin1?.coinData?.total_volumes.map(
          (volume: number[]) => volume[1]
        ),
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) return;
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0.6, "#7878FA");
          gradient.addColorStop(1, "#7474F203");
          return gradient;
        },
        borderRadius: 3,
        barThickness: graphTimeDuration === 0.0416666666666667 ? 15 : 1,
      },
      {
        id: 2,
        label: coin2?.id || "Coin 2",
        data: coin2?.coinData?.total_volumes.map(
          (volume: number[]) => volume[1]
        ),
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) return;
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0.6, "#9D62D9");
          gradient.addColorStop(1, "#B374F203");
          return gradient;
        },
        borderRadius: 3,
        barThickness: graphTimeDuration === 0.0416666666666667 ? 15 : 1,
      },
      {
        id: 3,
        label: coin3?.id || "Coin 3",
        data: coin3?.coinData?.total_volumes.map(
          (volume: number[]) => volume[1]
        ),
        backgroundColor: (context: any) => {
          if (!context.chart.chartArea) return;
          const {
            ctx,
            chartArea: { top, bottom },
          } = context.chart;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0.6, "#4DEEE5");
          gradient.addColorStop(1, "#4DEEEA03");
          return gradient;
        },
        borderRadius: 3,
        barThickness: graphTimeDuration === 0.0416666666666667 ? 15 : 1,
      },
    ],
  };
  const lineChartOptions = {
    responsiveness: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    onHover: (_: any, activeEls: any, __: any) => {
      if (coin1PriceRef.current && activeEls[0]) {
        coin1PriceRef.current.textContent =
          handleCurrencySymbol(currentCurrency) +
          activeEls[0].element.$context.raw.toFixed(2);
      }
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { formattedValue: string }) => {
            context.formattedValue = `${handleCurrencySymbol(currentCurrency)}${
              context.formattedValue
            }`;
          },
        },
      },
      crosshair: {
        line: {
          color: theme === "dark" ? "#FFF" : "",
          dashPattern: [5, 5],
          width: 1,
        },
        sync: {
          enabled: false,
        },
        zoom: {
          enabled: false,
        },
      },
    },
    scales: {
      x: {
        beforeFit: (axis: Scale<CoreScaleOptions>) => {
          const labels = axis.chart.config.data.labels;
          const length = labels && labels.length - 1;
          if (labels && length) {
            axis.ticks.push({
              label: handleCoinDateDisplay(
                coin1?.coinData?.prices[length][0],
                graphTimeDuration
              ),
              value: length,
            });
          }
        },
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          maxTicksLimit: labelCount,
          align: "inner",
        },
      },
      y: {
        type: "logarithmic",
        display: false,
        beginAtZero: true,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };
  const barChartOptions = {
    responsiveness: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    onHover: (_: any, activeEls: any, __: any) => {
      if (
        coin1VolumeRef.current &&
        coin1VolumeRef.current.textContent &&
        activeEls[0]
      ) {
        coin1VolumeRef.current.textContent =
          handleCurrencySymbol(currentCurrency) +
          activeEls[0].element.$context.raw.toFixed(2);
      }
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { formattedValue: string }) => {
            context.formattedValue = `${handleCurrencySymbol(currentCurrency)}${
              context.formattedValue
            }`;
          },
        },
      },
      crosshair: {
        line: {
          color: theme === "dark" ? "#FFF" : "",
          dashPattern: [5, 5],
          width: 1,
        },
        sync: {
          enabled: false,
        },
        zoom: {
          enabled: false,
        },
      },
    },
    scales: {
      y: {
        display: false,
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      x: {
        beforeFit: (axis: Scale<CoreScaleOptions>) => {
          const labels = axis.chart.config.data.labels;
          const length = labels && labels.length - 1;
          if (labels && length) {
            axis.ticks.push({
              label: handleCoinDateDisplay(
                coin1?.coinData?.prices[length][0],
                graphTimeDuration
              ),
              value: length,
            });
          }
        },
        stacked: true,
        grid: {
          display: false,
          drawBorder: false,
        },
        barPercentage: 0.5,
        ticks: {
          maxTicksLimit: labelCount,
          align: "inner",
        },
      },
    },
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
  }, [graphTimeDuration, currentCurrency]);
  useEffect(() => {
    const labels = handleCoinLabelCount(window.innerWidth);
    setLabelCount(labels);
    const handleLabelCount = () => {
      const labels = handleCoinLabelCount(document.documentElement.clientWidth);
      setLabelCount(labels);
    };
    window.addEventListener("resize", handleLabelCount);
    return () => {
      window.removeEventListener("resize", handleLabelCount);
    };
  }, []);
  const currentDate = new Date().toDateString();
  return (
    <div className="overflow-hidden">
      <ul className="relative md:hidden mb-3 ">
        <Slider
          className="md:hidden"
          ref={(slider: Slider) => {
            sliderRef.current = slider;
          }}
          {...sliderSettings}
        >
          <div className="flex flex-col p-4 md:p-6 items-start w-full bg-[#FFFFFF] dark:bg-[#191932] rounded-xl">
            <div className="mb-6">
              <div
                className={`${coin1 && !coin2 && !coin3 ? "block" : "hidden"}`}
              >
                <h3 className="text-xl text-[#191932] dark:text-[#D1D1D1]">
                  {coin1?.name} ({coin1?.symbol.toUpperCase()})
                </h3>
                <SelectedCoinStatistic
                  priceRef={coin1PriceRef}
                  defaultPrice={
                    handleCurrencySymbol(currentCurrency) +
                    coin1?.current_price[currentCurrency]
                  }
                />
                <p className="text-[#424286] dark:text-[#D1D1D1]">
                  {currentDate}
                </p>
              </div>
              <div
                className={`${coin1 && !coin2 && !coin3 ? "hidden" : "block"}`}
              >
                <p
                  className={
                    "text-xl text-[#424286] dark:text-[#D1D1D1] font-bold"
                  }
                >
                  {currentDate}
                </p>
              </div>
            </div>
            <div
              className={` ${
                coin1 && coin2 && !coin3 ? "flex" : "hidden"
              } flex-col w-full`}
            >
              <div className={"flex items-center space-x-2"}>
                <div className="w-4 h-4 rounded-sm bg-[#7878FA] text-xl"></div>
                <span className="text-[#424286] dark:text-[#D1D1D1]">
                  {coin1?.symbol.toUpperCase()}
                </span>
                <p>
                  {handleCurrencySymbol(currentCurrency)}
                  {coin1?.current_price[currentCurrency]}
                </p>
              </div>
              <div className={"flex items-center space-x-2"}>
                <div className="w-4 h-4 rounded-sm bg-[#9D62D9] text-xl"></div>
                <span className="text-[#424286] dark:text-[#D1D1D1]">
                  {coin2?.symbol.toUpperCase()}
                </span>
                <p>
                  {handleCurrencySymbol(currentCurrency)}
                  {coin2?.current_price[currentCurrency]}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm md:text-base">
              <div
                className={`${
                  coin1 && coin2 && coin3 ? "flex" : "hidden"
                } flex-col gap-2 text-xs w-full`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-sm bg-[#7878FA] text-xl"></div>
                  <span className="text-[#424286] dark:text-[#D1D1D1]">
                    {coin1?.symbol.toUpperCase()}
                  </span>
                  <p key={3} className="text-[#424286] dark:text-[#D1D1D1]">
                    {handleCurrencySymbol(currentCurrency)}
                    {coin1?.current_price[currentCurrency]}
                  </p>
                </div>
                <div className={"flex items-center space-x-2"}>
                  <div className="w-4 h-4 rounded-sm bg-[#9D62D9] text-xl"></div>
                  <span className="text-[#424286] dark:text-[#D1D1D1]">
                    {coin2?.symbol.toUpperCase()}
                  </span>
                  <p key={4} className="text-[#424286] dark:text-[#D1D1D1]">
                    {handleCurrencySymbol(currentCurrency)}
                    {coin2?.current_price[currentCurrency]}
                  </p>
                </div>
                <div className={"flex items-center space-x-2"}>
                  <div className="w-4 h-4 rounded-sm bg-[#4DEEE5] text-xl"></div>
                  <span className="text-[#424286] dark:text-[#D1D1D1]">
                    {coin3?.symbol.toUpperCase()}
                  </span>
                  <p key={5} className="text-[#424286] dark:text-[#D1D1D1]">
                    {handleCurrencySymbol(currentCurrency)}
                    {coin3?.current_price[currentCurrency]}
                  </p>
                </div>
              </div>
            </div>
            <Line
              style={{ width: "100%" }}
              options={lineChartOptions as any}
              data={lineConfig}
            />
          </div>
          <div className="w-full flex flex-col relative p-4 bg-[#FFFFFF] dark:bg-[#191932] rounded-xl">
            <div className="mb-6">
              <div
                className={`${coin1 && !coin2 && !coin3 ? "hidden" : "block"}`}
              >
                <h3 className="text-xl font-bold text-[#191932] dark:text-[#D1D1D1]">
                  Volume 24h
                </h3>
                <p className="text-[#424286] dark:text-[#D1D1D1]">
                  {currentDate}
                </p>
              </div>
              <div
                className={`${coin1 && !coin2 && !coin3 ? "block" : "hidden"}`}
              >
                <h3 className="text-xl text-[#191932] dark:text-[#D1D1D1]">
                  Volume 24h
                </h3>
                <SelectedCoinStatistic
                  priceRef={coin1VolumeRef}
                  defaultPrice={
                    handleCurrencySymbol(currentCurrency) +
                    coin1?.total_volume[currentCurrency]
                  }
                />
                <p className="text-[#424286] dark:text-[#D1D1D1]">
                  {currentDate}
                </p>
              </div>
            </div>
            <div
              className={`${
                coin1 && coin2 && !coin3 ? "flex" : "hidden"
              } flex-col `}
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm bg-[#7878FA] text-xl"></div>
                <span className="text-[#424286] dark:text-[#D1D1D1]">
                  {coin1?.symbol.toUpperCase()}
                </span>
                <p key={7} className="text-[#424286] dark:text-[#D1D1D1]">
                  {handleCurrencySymbol(currentCurrency)}
                  {handleCurrency(coin1?.total_volume[currentCurrency])}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-sm bg-[#9D62D9] text-xl"></div>
                <span className="text-[#424286] dark:text-[#D1D1D1]">
                  {coin2?.symbol.toUpperCase()}
                </span>
                <p key={8} className="text-[#424286] dark:text-[#D1D1D1]">
                  {handleCurrencySymbol(currentCurrency)}
                  {handleCurrency(coin2?.total_volume[currentCurrency])}
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <div
                className={`${
                  coin1 && coin2 && coin3 ? "flex" : "hidden"
                } flex-col`}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-sm bg-[#7878FA] text-xl"></div>
                  <span className="text-[#424286] dark:text-[#D1D1D1]">
                    {coin1?.symbol.toUpperCase()}
                  </span>
                  <p key={9} className="text-[#424286] dark:text-[#D1D1D1]">
                    {handleCurrencySymbol(currentCurrency)}
                    {handleCurrency(coin1?.total_volume[currentCurrency])}
                  </p>
                </div>
                <div className={"flex items-center space-x-2"}>
                  <div className="w-4 h-4 rounded-sm bg-[#9D62D9] text-xl"></div>
                  <span className="text-[#424286] dark:text-[#D1D1D1]">
                    {coin2?.symbol.toUpperCase()}
                  </span>
                  <p key={10} className="text-[#424286] dark:text-[#D1D1D1]">
                    {handleCurrencySymbol(currentCurrency)}
                    {handleCurrency(coin2?.total_volume[currentCurrency])}
                  </p>
                </div>
                <div className={"flex items-center space-x-2"}>
                  <div className="w-4 h-4 rounded-sm bg-[#4DEEE5] text-xl"></div>
                  <span className="text-[#424286] dark:text-[#D1D1D1]">
                    {coin3?.symbol.toUpperCase()}
                  </span>
                  <p key={11} className="text-[#424286] dark:text-[#D1D1D1]">
                    {handleCurrencySymbol(currentCurrency)}
                    {handleCurrency(coin3?.total_volume[currentCurrency])}
                  </p>
                </div>
              </div>
            </div>
            <Bar data={barConfig} options={barChartOptions as any} />
          </div>
        </Slider>
      </ul>
      <div className="hidden md:flex md:flex-col md:items-center lg:flex-row lg:justify-center xl:flex-row xl:justify-between lg:gap-6 xl:gap-7 mb-14 relative">
        <div
          className="hidden md:flex md:flex-col md:max-w-[80%] md:mb-6 lg:max-w-[calc(50%-32px)] xl:max-w-none p-4 xl:p-6 items-start
         w-full bg-[#FFFFFF] dark:bg-[#191932] rounded-xl"
        >
          <div className="mb-6">
            <div
              className={`${coin1 && !coin2 && !coin3 ? "block" : "hidden"}`}
            >
              <h3 className="text-xl text-[#191932] dark:text-[#D1D1D1]">
                {coin1?.name} ({coin1?.symbol.toUpperCase()})
              </h3>
              {windowWidth >= 768 && (
                <SelectedCoinStatistic
                  priceRef={coin1PriceRef}
                  defaultPrice={
                    handleCurrencySymbol(currentCurrency) +
                    coin1?.current_price[currentCurrency]
                  }
                />
              )}
              <p className="text-[#424286] dark:text-[#D1D1D1]">
                {currentDate}
              </p>
            </div>
            <p
              className={`text-2xl text-[#424286] dark:text-[#D1D1D1] font-bold ${
                coin1 && !coin2 && !coin3 ? "hidden" : "block"
              }`}
            >
              {currentDate}
            </p>
          </div>
          <Line
            className="w-full"
            options={lineChartOptions as any}
            data={lineConfig}
          />
          <div>
            <div className="flex items-center  md:text-base">
              <div
                className={`${
                  coin1 && coin2 && !coin3 ? "flex" : "hidden"
                } text-xs space-x-1 justify-center w-full`}
              >
                <div className={"flex items-center space-x-1"}>
                  <div className="w-4 h-4 rounded-sm bg-[#7878FA]"></div>
                  <span className="text-[#424286] dark:text-[#D1D1D1]">
                    {coin1?.name}
                  </span>
                  <p key={13} className="text-[#424286] dark:text-[#D1D1D1]">
                    {handleCurrencySymbol(currentCurrency)}
                    {coin1?.current_price[currentCurrency]}
                  </p>
                </div>
                <div className={"flex items-center space-x-1"}>
                  <div className="w-4 h-4 rounded-sm bg-[#9D62D9]"></div>
                  <span className="text-[#424286] dark:text-[#D1D1D1]">
                    {coin2?.name}
                  </span>
                  <p key={14} className="text-[#424286] dark:text-[#D1D1D1]">
                    {handleCurrencySymbol(currentCurrency)}
                    {coin2?.current_price[currentCurrency]}
                  </p>
                </div>
              </div>
              {coin1 && coin2 && coin3 && (
                <div className={"flex justify-center w-full space-x-1 text-xs"}>
                  <div className={"flex items-center space-x-1"}>
                    <div className="w-4 h-4 rounded-sm bg-[#7878FA]"></div>
                    <span className="text-[#424286] dark:text-[#D1D1D1]">
                      {coin1?.name}
                    </span>
                    <p key={15} className="text-[#424286] dark:text-[#D1D1D1]">
                      {handleCurrencySymbol(currentCurrency)}
                      {coin1?.current_price[currentCurrency]}
                    </p>
                  </div>
                  <div className={"flex items-center space-x-1"}>
                    <div className="w-4 h-4 rounded-sm bg-[#9D62D9]"></div>
                    <span className="text-[#424286] dark:text-[#D1D1D1]">
                      {coin2?.name}
                    </span>
                    <p key={16} className="text-[#424286] dark:text-[#D1D1D1]">
                      {handleCurrencySymbol(currentCurrency)}
                      {coin2?.current_price[currentCurrency]}
                    </p>
                  </div>
                  <div className={"flex items-center space-x-1"}>
                    <div className="w-4 h-4 rounded-sm bg-[#4DEEE5]"></div>
                    <span className="text-[#424286] dark:text-[#D1D1D1]">
                      {coin3?.name}
                    </span>
                    <p key={17} className="text-[#424286] dark:text-[#D1D1D1]">
                      {handleCurrencySymbol(currentCurrency)}
                      {coin3?.current_price[currentCurrency]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col relative p-4 xl:p-6 md:max-w-[80%] md:mb-6 lg:max-w-[calc(50%-32px)] xl:max-w-none bg-[#FFFFFF] dark:bg-[#191932] rounded-xl">
          <div className={`${coin1 && !coin2 && !coin3 && "mb-6"}`}>
            {coin1 && !coin2 && !coin3 ? (
              <div>
                <h3 className="text-xl text-[#191932] dark:text-[#D1D1D1]">
                  Volume 24h
                </h3>
                {windowWidth >= 768 && (
                  <SelectedCoinStatistic
                    priceRef={coin1VolumeRef}
                    defaultPrice={
                      handleCurrencySymbol(currentCurrency) +
                      coin1?.total_volume[currentCurrency]
                    }
                  />
                )}
                <p className="text-[#424286] dark:text-[#D1D1D1]">
                  {currentDate}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-2xl text-[#191932] dark:text-[#D1D1D1]">
                  Volume 24h
                </h3>
                <p className="text-[#424286] dark:text-[#D1D1D1]">
                  {currentDate}
                </p>
              </div>
            )}
          </div>
          <Bar
            className="w-full"
            data={barConfig}
            options={barChartOptions as any}
          />
          <div>
            <div className="flex items-center space-x-1">
              {coin1 && coin2 && !coin3 && (
                <div className="flex items-center space-x-1 text-xs">
                  <div className={"flex items-center space-x-1"}>
                    <div className="w-4 h-4 rounded-sm bg-[#7878FA]"></div>
                    <span className="text-[#424286] dark:text-[#D1D1D1]">
                      {coin1?.name}
                    </span>
                    <p key={19} className="text-[#424286] dark:text-[#D1D1D1]">
                      {handleCurrencySymbol(currentCurrency)}
                      {handleCurrency(coin1?.total_volume[currentCurrency])}
                    </p>
                  </div>
                  <div className={"flex items-center space-x-1"}>
                    <div className="w-4 h-4 rounded-sm bg-[#9D62D9]"></div>
                    <span className="text-[#424286] dark:text-[#D1D1D1]">
                      {coin2?.name}
                    </span>
                    <p key={20} className="text-[#424286] dark:text-[#D1D1D1]">
                      {handleCurrencySymbol(currentCurrency)}
                      {handleCurrency(coin2?.total_volume[currentCurrency])}
                    </p>
                  </div>
                </div>
              )}
              {coin1 && coin2 && coin3 && (
                <div className="flex items-center space-x-1 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 rounded-sm bg-[#7878FA]"></div>
                    <span className="text-[#424286] dark:text-[#D1D1D1]">
                      {coin1?.name}
                    </span>
                    <p key={21} className="text-[#424286] dark:text-[#D1D1D1]">
                      {handleCurrencySymbol(currentCurrency)}
                      {handleCurrency(coin1?.total_volume[currentCurrency])}
                    </p>
                  </div>
                  <div className={"flex items-center space-x-1"}>
                    <div className="w-4 h-4 rounded-sm bg-[#9D62D9]"></div>
                    <span className="text-[#424286] dark:text-[#D1D1D1]">
                      {coin2?.name}
                    </span>
                    <p key={22} className="text-[#424286] dark:text-[#D1D1D1]">
                      {handleCurrencySymbol(currentCurrency)}
                      {handleCurrency(coin2?.total_volume[currentCurrency])}
                    </p>
                  </div>
                  <div className={"flex items-center space-x-1"}>
                    <div className="w-4 h-4 rounded-sm bg-[#4DEEE5] text-xl"></div>
                    <span className="text-[#424286] dark:text-[#D1D1D1]">
                      {coin3?.name}
                    </span>
                    <p key={23} className="text-[#424286] dark:text-[#D1D1D1]">
                      {handleCurrencySymbol(currentCurrency)}
                      {handleCurrency(coin3?.total_volume[currentCurrency])}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
