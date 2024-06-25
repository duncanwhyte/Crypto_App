"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import { useAppSelector } from "@/app/lib/hooks";
import CoinLink from "@/app/components/CoinLink";
import CoinStatisticCard from "@/app/components/CoinStatisticCard";
import CoinStatistic from "@/app/components/CoinStatistic";
import handleTableProgressBar from "@/app/utils/handleTableProgressBar";
import handleCoinDates from "@/app/utils/handleCoinDates";
import handleAllTimeDateDisplay from "@/app/utils/handleAllTimeDateDisplay";
const selectCurrentCurrency = (state) => state.currentCurrency;
const selectPortfolioCoins = (state) => state.portfolioCoins.coins;
export default function CoinPage({ coinId }: { coinId: string }) {
  const currentCurrency = useAppSelector(selectCurrentCurrency);
  const portfolioCoins = useAppSelector(selectPortfolioCoins);
  const [coinData, setCoinData] = useState(null);
  const [totalVolume24h, setTotalVolume24h] = useState(null);
  const handleHTML = () => {
    return { __html: coinData?.description?.en };
  };
  useEffect(() => {
    const callCoinData = async () => {
      const coinDataReq = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
      );
      const coinData = await coinDataReq.json();
      setCoinData(coinData);
    };
    const call24hrTotalVolume = async () => {
      const [currentTime, pastTime] = handleCoinDates(1);
      const totalVolumeReq = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q&vs_currency=${currentCurrency}&from=${pastTime}&to=${currentTime}`
      );
      const totalVolumeData = await totalVolumeReq.json();
      const totalVolume = totalVolumeData.total_volumes.reduce(
        (init: number, currVal: number[]) => (init += currVal[1]),
        0
      );
      setTotalVolume24h(totalVolume);
    };
    callCoinData();
    call24hrTotalVolume();
  }, [coinId, currentCurrency]);
  const athDate =
    coinData && new Date(coinData?.market_data?.ath_date[currentCurrency]);
  const atlDate =
    coinData && new Date(coinData?.market_data?.atl_date[currentCurrency]);
  const storedCoins = portfolioCoins.filter((coin) => coin.id === coinId);
  const profit =
    storedCoins.length > 0 &&
    storedCoins.reduce((init: number, currVal) => {
      return (init +=
        (coinData?.market_data?.current_price[currentCurrency] -
          currVal.purchasedDateData?.market_data?.current_price[
            currentCurrency
          ]) *
        currVal.coinAmount);
    }, 0);
  return (
    <main className="">
      <div className="mb-8 xl:flex xl:gap-4">
        <div className="bg-[#FFFFFF] dark:bg-[#1E1932] px-8 py-10 rounded-xl mx-auto mb-4 max-w-[560px] xl:mx-0 xl:mb-0 xl:max-w-[564px] xl:w-[40%] xl:flex xl:flex-col xl:justify-around">
          <div className="flex mb-8">
            <Image
              className="mr-[24px]"
              width={48}
              height={48}
              src={coinData?.image?.small}
              alt="crypto-symbol-image"
            />
            <div className="flex flex-col">
              <h3 className="text-bold text-lg">
                {coinData?.name} ({coinData?.symbol?.toUpperCase()})
              </h3>
              <a href={coinData?.links?.homepage[0]}>
                {coinData?.links?.homepage[0]}
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <>
              <h2 className="text-2xl">
                {handleCurrencySymbol(currentCurrency)}
                {coinData?.market_data?.current_price[currentCurrency]}
              </h2>
            </>
            {profit && (
              <div className="flex items-center gap-4">
                <p className="text-xl text-black dark:text-[#FFFFFF]">
                  Profit:
                </p>
                <span
                  className={profit > 0 ? "text-[#01F1E3]" : "text-[#FE2264]"}
                >
                  {handleCurrencySymbol(currentCurrency)}
                  {Math.abs(profit).toFixed(2)}
                </span>
              </div>
            )}
          </div>
          <hr className="mb-8"></hr>
          <div className="flex justify-between xl:mb-6">
            <div className="flex items-center gap-2">
              <svg
                className="self-start mt-[4px]"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.16795 3.24807C7.56377 2.65434 8.43623 2.65434 8.83205 3.24808L14.9635 12.4453C15.4066 13.1099 14.9302 14 14.1315 14H1.86852C1.06982 14 0.59343 13.1099 1.03647 12.4453L7.16795 3.24807Z"
                  fill="#01F1E3"
                />
              </svg>
              <div className="flex flex-col justify-start self-start items-start">
                <h3 className="text-lg">All Time High:</h3>
                <p className="text-[#B9B9BA]">
                  {athDate && handleAllTimeDateDisplay(athDate)}
                </p>
              </div>
            </div>
            <>
              <h3 className="text-lg">
                {handleCurrencySymbol(currentCurrency)}
                {coinData?.market_data?.ath[currentCurrency]}
              </h3>
            </>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <svg
                className="self-start mt-[4px]"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.83205 12.7519C8.43623 13.3457 7.56377 13.3457 7.16795 12.7519L1.03647 3.5547C0.59343 2.89014 1.06982 2 1.86852 2H14.1315C14.9302 2 15.4066 2.89015 14.9635 3.5547L8.83205 12.7519Z"
                  fill="#FE2264"
                />
              </svg>
              <div className="flex flex-col items-start self-start">
                <h3 className="text-lg">All Time Low:</h3>
                <p className="text-[#B9B9BA]">
                  {atlDate && handleAllTimeDateDisplay(atlDate)}
                </p>
              </div>
            </div>
            <>
              <h3 className="text-lg">
                {handleCurrencySymbol(currentCurrency)}
                {coinData?.market_data?.atl[currentCurrency]}
              </h3>
            </>
          </div>
        </div>
        <div className="xl:w-[60%]">
          <p
            dangerouslySetInnerHTML={handleHTML()}
            className="data-html text-sm text-center max-w-[600px] mx-auto mb-5 xl:text-left xl:mx-0 xl:mb-4 xl:mx-0 xl:max-w-full"
          ></p>
          <div className="flex flex-col gap-2 max-w-[560px] mx-auto xl:flex-row xl:flex-wrap xl:max-w-full xl:mx-0">
            {coinData?.links?.blockchain_site
              .filter((link: string) => link.length)
              .slice(0, 3)
              .map((link: string) => (
                <CoinLink key={link} link={link} />
              ))}
          </div>
        </div>
      </div>
      <hr className="mb-8"></hr>
      <div className="xl:flex xl:flex-wrap xl:gap-6">
        <CoinStatisticCard className="bg-[#1E1932] rounded-xl max-w-[560px] mx-auto mb-4 px-8 py-10 xl:mx-0 xl:max-w-none xl:basis-[calc(50%-12px)] xl:mb-0">
          <CoinStatistic
            statisticText="Total Volume"
            statisticData={coinData?.market_data?.total_volume[currentCurrency]}
            coinSymbol={null}
            currentCurrency={currentCurrency}
          />
          {totalVolume24h && (
            <CoinStatistic
              statisticText="Volume 24h"
              statisticData={totalVolume24h}
              coinSymbol={null}
              currentCurrency={currentCurrency}
            />
          )}
          <CoinStatistic
            statisticText="Volume/Market"
            statisticData={(
              coinData?.market_data?.total_volume[currentCurrency] /
              coinData?.market_data?.market_cap[currentCurrency]
            ).toFixed(5)}
            coinSymbol={null}
            currentCurrency={null}
          />
        </CoinStatisticCard>
        <CoinStatisticCard>
          <CoinStatistic
            statisticText="Max Supply"
            statisticData={coinData?.market_data?.max_supply || "N/A"}
            coinSymbol={coinData?.symbol.toUpperCase()}
            currentCurrency={null}
          />
          <CoinStatistic
            statisticText="Circulating Supply"
            statisticData={coinData?.market_data?.circulating_supply}
            coinSymbol={coinData?.symbol.toUpperCase()}
            currentCurrency={null}
          />
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <span className="text-sm">
                {handleTableProgressBar(
                  coinData?.market_data?.circulating_supply,
                  coinData?.market_data?.total_supply
                )}
                %
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <span className="text-sm">100%</span>
            </div>
          </div>
          <div className="relative bg-white w-full h-2 rounded-xl">
            <div
              style={{
                width: `${Math.min(
                  handleTableProgressBar(
                    coinData?.market_data?.circulating_supply,
                    coinData?.market_data?.total_supply
                  ),
                  100
                )}%`,
              }}
              className="absolute bg-red-400 h-full top-0 left-0 rounded-xl"
            ></div>
          </div>
        </CoinStatisticCard>
        <CoinStatisticCard>
          <CoinStatistic
            statisticText="Market Cap"
            statisticData={coinData?.market_data?.market_cap[currentCurrency]}
            coinSymbol={null}
            currentCurrency={currentCurrency}
          />
          <CoinStatistic
            statisticText="Fully Diluted Valuation"
            statisticData={
              coinData?.market_data?.fully_diluted_valuation[currentCurrency]
            }
            coinSymbol={null}
            currentCurrency={currentCurrency}
          />
        </CoinStatisticCard>
      </div>
    </main>
  );
}
