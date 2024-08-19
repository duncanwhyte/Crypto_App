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
    <div className="w-full">
      <table className="md:w-full text-xs sm:text-base " ref={tableRef}>
        <tbody>
          <tr className="">
            <th className="hidden xl:w-[5%] xl:table-cell xl:text-sm">#</th>
            <th className="w-[50%] sm:w-[25%] lg:w-[10%] xl:w-[10%] xl:text-sm">
              Name
            </th>
            <th className="w-[5%] sm:w-[25%] lg:w-[10%] xl:w-[10%] xl:text-sm">
              Price
            </th>
            <th className="hidden lg:table-cell lg:w-[10%] xl:w-[5%] xl:text-sm">
              1hr%
            </th>
            <th className="hidden sm:table-cell sm:w-[25%] lg:w-[10%] xl:w-[5%] xl:text-sm">
              24hr%
            </th>
            <th className="hidden xl:table-cell xl:w-[5%] xl:text-sm">7d%</th>
            <th className="hidden xl:table-cell xl:w-[10%] xl:text-sm">
              24hr volume / Market Cap
            </th>
            <th className="hidden xl:table-cell xl:w-[10%] xl:text-sm">
              Circulating / Total Supply
            </th>
            <th className="w-[40%] sm:w-[25%] lg:w-[10%] xl:w-[5%] xl:text-sm xl:table-cell">
              Last 7d
            </th>
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
                  className="bg-[#FFFFFF] dark:bg-[#191925] m-b-2 xl:align-left border-solid border-t-8 border-b-8 border-[#F3F5F9] dark:border-[#13121A] w-full"
                  key={id}
                >
                  <td className="hidden xl:table-cell xl:pl-[20px] xl:rounded-l-3xl">
                    {index + 1}
                  </td>
                  <td className="w-[50%] sm:w-[25%] lg:w-[10%] p-3 xl:px-0 xl:py-0 xl:pr-[20px] rounded-l-3xl xl:rounded-l-none">
                    <div className="flex gap-4 justify-around sm:justify-center items-center xl:flex-row">
                      <div className="w-7 h-7">
                        <Image
                          src={image}
                          width={28}
                          height={28}
                          alt="Crypto-Coin-Image"
                        />
                      </div>
                      <div className="w-1/2 flex flex-col flex-col-reverse lg:flex-row lg:items-center items-start">
                        <Link
                          className="text-xs sm:text-sm lg:text-base"
                          href={`/coins/${id}`}
                        >
                          {name}
                        </Link>
                        <span className="text-sm sm:text-base">
                          {}({`${symbol.toUpperCase()}`})
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="w-[10%] sm-[25%] lg:w-[10%] lg:text-base py-3 xl:w-[calc(10%-160px)] xl:pr-[20px] xl:py-0 text-center">
                    {handleCurrencySymbol(currentCurrency)}
                    {currentPrice.toFixed(2)}
                  </td>
                  <td
                    className={`${
                      priceChangePercent1hInCurrency > 0
                        ? "text-green-400"
                        : "text-red-500"
                    } hidden py-3 sm:w-[15%] lg:table-cell xl:w-[calc(10%-160px)] xl:py-0 xl:pr-[20px]`}
                  >
                    <div className="flex items-center gap-1 justify-center">
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
                    } hidden sm:table-cell sm:w-[25%] lg:w-[10%] py-3 pr-3 xl:w-[calc(10%-160px)] xl:pl-0 xl:pr-[20px] xl:py-0 xl:rounded-r-none`}
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
                    } hidden xl:w-[calc(10%-160px)] xl:pr-[20px] xl:table-cell`}
                  >
                    <div className="flex items-center justify-center">
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
                  <td className="hidden xl:w-[calc(10%-160px)] xl:pr-[20px] xl:table-cell">
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
                            priceChangePercent7dInCurrency,
                            true
                          )}`,
                        }}
                        className={"h-2 rounded-xl overflow-hidden"}
                      >
                        <div
                          style={{
                            width: `${handleTableProgressBar(
                              totalVolume,
                              marketCap
                            )}%`,
                            backgroundColor: `${handleMarketTrendColor(
                              priceChangePercent1hInCurrency,
                              priceChangePercent24hInCurrency,
                              priceChangePercent7dInCurrency,
                              false
                            )}`,
                          }}
                          className={"h-full rounded-xl"}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden xl:w-[calc(10%-100px)] xl:pr-[20px] xl:table-cell">
                    <div className={"rounded-xl"}>
                      <div className={"flex items-center justify-between"}>
                        <span>
                          {handleCurrencySymbol(currentCurrency)}
                          {handleCurrency(circulatingSupply)}
                        </span>
                        <span>
                          {handleCurrencySymbol(currentCurrency)}
                          {handleCurrency(totalSupply)}
                        </span>
                      </div>
                      <div
                        style={{
                          backgroundColor: `${handleMarketTrendColor(
                            priceChangePercent1hInCurrency,
                            priceChangePercent24hInCurrency,
                            priceChangePercent7dInCurrency,
                            true
                          )}`,
                        }}
                        className={"w-full h-2 rounded-xl overflow-hidden"}
                      >
                        <div
                          style={{
                            width: `${handleTableProgressBar(
                              circulatingSupply,
                              totalSupply
                            )}%`,
                            backgroundColor: `${handleMarketTrendColor(
                              priceChangePercent1hInCurrency,
                              priceChangePercent24hInCurrency,
                              priceChangePercent7dInCurrency,
                              false
                            )}`,
                          }}
                          className={"h-full rounded-xl"}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="relative p-3 rounded-r-3xl w-[40%] sm:w-[25%] lg:w-[10%] xl:pr-4 xl:pr-[20px] xl:w-auto xl:mx-auto xl:table-cell">
                    <CoinChart
                      symbol={symbol.toUpperCase()}
                      chartColor={handleMarketTrendColor(
                        priceChangePercent1hInCurrency,
                        priceChangePercent24hInCurrency,
                        priceChangePercent7dInCurrency,
                        false
                      )}
                      prices={sparklineIn7D.price}
                      currentCurrency={currentCurrency}
                    />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
}
