/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import priceChangeIcon from "@/app/assets/price-change-icon.svg";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import handleTableProgressBar from "@/app/utils/handleTableProgressBar";
import handleMarketTrendColor from "@/app/utils/handleMarketTrendColor";
import handleCurrency from "@/app/utils/handleCurrency";
import CoinChart from "../CoinChart";
import { fetchCoinTableList } from "@/app/lib/features/coinTableList/coinTableListSlice";
import useScroll from "@/app/hooks/useScroll";
interface Coin {
  name: string;
  id: string;
  image: string;
  symbol: string;
  current_price: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}
interface CoinTableList {
  data: Coin[];
  isLoading: "idle" | "pending" | "success" | "failed";
  error: boolean | string;
  coinsToDisplay: number;
  order: string;
}
interface State {
  currentCurrency: string;
  coinTableList: CoinTableList;
}
const currencySelect = (state: State) => state.currentCurrency;
const coinTableListSelect = (state: State) => state.coinTableList.data;
const coinsToDisplaySelect = (state: State) =>
  state.coinTableList.coinsToDisplay;
export default function CoinTable() {
  const currentCurrency = useAppSelector(currencySelect);
  const coinTableList = useAppSelector(coinTableListSelect);
  const coinsToDisplay = useAppSelector(coinsToDisplaySelect);
  const tableRef = useRef(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCoinTableList());
  }, [coinsToDisplay]);
  useScroll(tableRef?.current, () => {
    dispatch({ type: "coinTableList/callCoins" });
  });
  return (
    <table ref={tableRef} className="w-full">
      <tbody>
        <tr>
          <th className="">#</th>
          <th>Name</th>
          <th>Price</th>
          <th>1hr%</th>
          <th>24hr%</th>
          <th>7d%</th>
          <th>24hr volume / Market Cap</th>
          <th>Circulating / Total Supply</th>
          <th>Last 7d</th>
        </tr>
        {coinTableList.map(
          (
            {
              id,
              name,
              symbol,
              image,
              current_price: currentPrice,
              price_change_percentage_1h_in_currency:
                priceChangePercent1hInCurrency,
              price_change_percentage_24h_in_currency:
                priceChangePercent24hInCurrency,
              price_change_percentage_7d_in_currency:
                priceChangePercent7dInCurrency,
              market_cap: marketCap,
              total_volume: totalVolume,
              circulating_supply: circulatingSupply,
              total_supply: totalSupply,
            }: Coin,
            index: number
          ) => {
            return (
              <tr
                className="bg-[#FFFFFF] dark:bg-[#191925] m-b-2 align-left  border-solid border-t-8 border-b-8 border-[#F3F5F9] dark:border-[#13121A] w-full overflow-hidden"
                key={id}
              >
                <td className="px-5 rounded-l-3xl">{index + 1}</td>
                <td className="pr-5">
                  <div className="flex items-center">
                    <Image
                      src={image}
                      width={30}
                      height={30}
                      alt="Crypto-Coin-Image"
                    />
                    <Link href={`/coins/${id}`}>{name}</Link>(
                    {`${symbol.toUpperCase()}`})
                  </div>
                </td>
                <td className="pr-5">
                  {handleCurrencySymbol(currentCurrency)}
                  {currentPrice}
                </td>
                <td
                  className={`${
                    priceChangePercent1hInCurrency > 0
                      ? "text-green-400"
                      : "text-red-500"
                  } pr-5 text-center`}
                >
                  <div className={"flex"}>
                    <Image
                      src={priceChangeIcon}
                      className={`${
                        priceChangePercent1hInCurrency > 0 && "rotate-180"
                      } w-6 h-6`}
                      alt="price-change-icon"
                    />
                    {Math.abs(
                      Math.round(priceChangePercent1hInCurrency * 100) / 100
                    )}
                    %
                  </div>
                </td>
                <td
                  className={`${
                    priceChangePercent24hInCurrency > 0
                      ? "text-green-400"
                      : "text-red-500"
                  } pr-5`}
                >
                  <div className={"flex"}>
                    <Image
                      src={priceChangeIcon}
                      className={`${
                        priceChangePercent24hInCurrency > 0 && "rotate-180"
                      } w-6 h-6`}
                      alt="price-change-icon"
                    />
                    {Math.abs(
                      Math.round(priceChangePercent24hInCurrency * 100) / 100
                    )}
                    %
                  </div>
                </td>
                <td
                  className={`${
                    priceChangePercent7dInCurrency > 0
                      ? "text-green-400"
                      : "text-red-500"
                  } pr-5`}
                >
                  <div className={"flex"}>
                    <Image
                      src={priceChangeIcon}
                      className={`${
                        priceChangePercent7dInCurrency > 0 && "rotate-180"
                      } w-6 h-6`}
                      alt="price-change-icon"
                    />
                    {Math.abs(
                      Math.round(priceChangePercent7dInCurrency * 100) / 100
                    )}
                    %
                  </div>
                </td>
                <td className="pr-5">
                  <div className={"rounded-xl"}>
                    <div className={"flex justify-between"}>
                      <span className={"shrink"}>
                        {handleCurrencySymbol(currentCurrency)}
                        {handleCurrency(totalVolume)}
                      </span>
                      <span className={"shrink"}>
                        {handleCurrencySymbol(currentCurrency)}
                        {handleCurrency(marketCap)}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: `${handleMarketTrendColor(
                          priceChangePercent1hInCurrency,
                          priceChangePercent24hInCurrency,
                          priceChangePercent7dInCurrency
                        )}`,
                      }}
                      className={"h-2 rounded-xl opacity-50"}
                    ></div>
                    <div
                      style={{
                        width: `${handleTableProgressBar(
                          totalVolume,
                          marketCap
                        )}%`,
                        backgroundColor: `${handleMarketTrendColor(
                          priceChangePercent1hInCurrency,
                          priceChangePercent24hInCurrency,
                          priceChangePercent7dInCurrency
                        )}`,
                      }}
                      className={"h-2 relative bottom-2 rounded-xl"}
                    ></div>
                  </div>
                </td>
                <td className="pr-5">
                  <div className={"rounded-xl"}>
                    <div className={"flex justify-between"}>
                      <span className={"shrink"}>
                        {handleCurrencySymbol(currentCurrency)}
                        {handleCurrency(circulatingSupply)}
                      </span>
                      <span className={"shrink"}>
                        {handleCurrencySymbol(currentCurrency)}
                        {handleCurrency(totalSupply)}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: `${handleMarketTrendColor(
                          priceChangePercent1hInCurrency,
                          priceChangePercent24hInCurrency,
                          priceChangePercent7dInCurrency
                        )}`,
                      }}
                      className={"w-full h-2 rounded-xl opacity-50"}
                    ></div>
                    <div
                      style={{
                        width: `${handleTableProgressBar(
                          circulatingSupply,
                          totalSupply
                        )}%`,
                        backgroundColor: `${handleMarketTrendColor(
                          priceChangePercent1hInCurrency,
                          priceChangePercent24hInCurrency,
                          priceChangePercent7dInCurrency
                        )}`,
                      }}
                      className={"h-2 relative bottom-2 rounded-xl"}
                    ></div>
                  </div>
                </td>
                <td className={"relative rounded-r-3xl"}>
                  <CoinChart
                    chartColor={handleMarketTrendColor(
                      priceChangePercent1hInCurrency,
                      priceChangePercent24hInCurrency,
                      priceChangePercent7dInCurrency
                    )}
                    id={id}
                  />
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
