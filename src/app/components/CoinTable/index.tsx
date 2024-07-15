/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import handleTableProgressBar from "@/app/utils/handleTableProgressBar";
import handleMarketTrendColor from "@/app/utils/handleMarketTrendColor";
import handleCurrency from "@/app/utils/handleCurrency";
import CoinChart from "../CoinChart";
import { fetchCoinTableList } from "@/app/lib/features/coinTableList/coinTableListSlice";
import useScroll from "@/app/hooks/useScroll";
import { RootState } from "@/app/lib/store";
import { CoinTableCoin } from "@/app/types/types";
import PriceAscendingIcon from "../Svgs/PriceAscendingIcon";
import PriceDescendingIcon from "../Svgs/PriceDescendingIcon";
const currencySelect = (state: RootState) => state.currentCurrency;
const coinTableListSelect = (state: RootState) => state.coinTableList.data;
const coinsToDisplaySelect = (state: RootState) =>
  state.coinTableList.coinsToDisplay;
export default function CoinTable() {
  const currentCurrency = useAppSelector(currencySelect);
  const coinTableList = useAppSelector(coinTableListSelect);
  const coinsToDisplay = useAppSelector(coinsToDisplaySelect);
  const tableRef = useRef(null);
  const dispatch = useAppDispatch();
  const callMoreCoins = (): void => {
    dispatch({ type: "coinTableList/callCoins" });
  };
  useEffect(() => {
    dispatch(fetchCoinTableList());
  }, [coinsToDisplay, currentCurrency]);
  useScroll(tableRef?.current, callMoreCoins);
  return (
    <table ref={tableRef} className="w-full">
      <tbody>
        <tr className="">
          <th className="hidden lg:table-cell">#</th>
          <th className="w-1/4 lg:w-auto">Name</th>
          <th className="w-1/4 lg:w-auto">Price</th>
          <th className="w-1/4 lg:w-auto">1hr%</th>
          <th className="w-1/4 lg:w-auto">24hr%</th>
          <th className="hidden lg:table-cell">7d%</th>
          <th className="hidden lg:table-cell">24hr volume / Market Cap</th>
          <th className="hidden lg:table-cell">Circulating / Total Supply</th>
          <th className="hidden lg:table-cell">Last 7d</th>
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
              sparkline_in_7d: sparklineIn7D,
            }: CoinTableCoin,
            index: number
          ) => {
            return (
              <tr
                className="bg-[#FFFFFF] dark:bg-[#191925] m-b-2 lg:align-left border-solid border-t-8 border-b-8 border-[#F3F5F9] dark:border-[#13121A] w-full overflow-hidden"
                key={id}
              >
                <td className="hidden lg:table-cell lg:rounded-l-3xl">
                  {index + 1}
                </td>
                <td className="w-1/4 text-center lg:w-auto rounded-l-3xl lg:rounded-l-none">
                  <div className="flex justify-center items-center lg:flex lg:items-center">
                    <Image
                      src={image}
                      width={30}
                      height={30}
                      alt="Crypto-Coin-Image"
                    />
                    <div className="flex flex-col items-center lg:flex-row">
                      <Link className="block" href={`/coins/${id}`}>
                        {name}
                      </Link>
                      <span className="-order-1 lg:order-none">
                        {}({`${symbol.toUpperCase()}`})
                      </span>
                    </div>
                  </div>
                </td>
                <td className="w-1/4 lg:w-auto text-center">
                  {handleCurrencySymbol(currentCurrency)}
                  {currentPrice}
                </td>
                <td
                  className={`${
                    priceChangePercent1hInCurrency > 0
                      ? "text-green-400"
                      : "text-red-500"
                  } w-1/4 lg:w-auto`}
                >
                  <div className="flex items-center justify-center">
                    {priceChangePercent1hInCurrency > 0 ? (
                      <PriceAscendingIcon />
                    ) : (
                      <PriceDescendingIcon />
                    )}
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
                  }  w-1/4 text-center rounded-r-3xl lg:w-auto lg:rounded-r-none`}
                >
                  <div className="flex items-center justify-center">
                    {priceChangePercent24hInCurrency > 0 ? (
                      <PriceAscendingIcon />
                    ) : (
                      <PriceDescendingIcon />
                    )}
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
                  } hidden flex-1 lg:table-cell`}
                >
                  <div className="flex items-center">
                    {priceChangePercent7dInCurrency > 0 ? (
                      <PriceAscendingIcon />
                    ) : (
                      <PriceDescendingIcon />
                    )}
                    {Math.abs(
                      Math.round(priceChangePercent7dInCurrency * 100) / 100
                    )}
                    %
                  </div>
                </td>
                <td className="hidden flex-1 lg:table-cell">
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
                      className={"h-2 rounded-xl opacity-50 overflow-hidden"}
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
                <td className=" hidden flex-1 lg:table-cell">
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
                      className={
                        "w-full h-2 rounded-xl opacity-50 overflow-hidden"
                      }
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
                <td className={"relative rounded-r-3xl hidden lg:table-cell"}>
                  <CoinChart
                    chartColor={handleMarketTrendColor(
                      priceChangePercent1hInCurrency,
                      priceChangePercent24hInCurrency,
                      priceChangePercent7dInCurrency
                    )}
                    prices={sparklineIn7D.price}
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
