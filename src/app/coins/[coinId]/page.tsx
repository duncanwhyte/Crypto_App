"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import { useAppSelector } from "@/app/lib/hooks";
import CoinLink from "@/app/components/CoinLink";
import CoinStatistic from "@/app/components/CoinStatistic";
const selectCurrentCurrency = (state) => state.currentCurrency;
export default function Coin({ params }: { params: { coinId: string } }) {
  const currentCurrency = useAppSelector(selectCurrentCurrency);
  const [coinData, setCoinData] = useState(null);
  useEffect(() => {
    const callCoinData = async () => {
      const coinDataReq = await fetch(
        `https://api.coingecko.com/api/v3/coins/${params.coinId}?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
      );
      const coinData = await coinDataReq.json();
      setCoinData(coinData);
    };
    callCoinData();
  }, [params.coinId]);
  const athDate =
    coinData && new Date(coinData?.market_data?.ath_date[currentCurrency]);
  const atlDate =
    coinData && new Date(coinData?.market_data?.atl_date[currentCurrency]);
  return (
    <main>
      <div className="flex space-x-6 mb-8">
        <div className="bg-[#1E1932] flex flex-col px-8 py-10 rounded-xl w-[40%]">
          <div className="flex mb-8">
            <Image
              width={48}
              height={48}
              src={coinData?.image?.small}
              alt="crypto-symbol-image"
            />
            <div className="flex flex-col">
              <h3 className="text-bold text-lg">
                {coinData?.name} ({coinData?.symbol.toUpperCase()})
              </h3>
              <a href={coinData?.links?.homepage[0]}>
                {coinData?.links?.homepage[0]}
              </a>
            </div>
          </div>
          <>
            <h2 className="text-2xl mb-8">
              {handleCurrencySymbol(currentCurrency)}
              {coinData?.market_data?.current_price[currentCurrency]}
            </h2>
          </>
          <hr className="mb-8"></hr>
          <div className="flex justify-between mb-6">
            <div className="flex items-center space-x-2">
              <svg
                className="self-start"
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
                  {coinData &&
                    Intl.DateTimeFormat("en-GB", {
                      weekday: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZoneName: "short",
                      month: "short",
                    }).format(athDate)}
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
            <div className="flex items-center">
              <svg
                className="self-start"
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
                  {coinData &&
                    Intl.DateTimeFormat("en-GB", {
                      weekday: "short",
                      day: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      timeZoneName: "short",
                      month: "short",
                    }).format(atlDate)}
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
        <div className="w-[60%]">
          <p className="text-sm mb-5">{coinData?.description?.en}</p>
          <div className="flex flex-wrap gap-2">
            {coinData?.links?.blockchain_site.map((link: string) => {
              if (link === "") {
                return;
              } else {
                return <CoinLink key={link} link={link} />;
              }
            })}
          </div>
        </div>
      </div>
      <hr className="mb-8"></hr>
      <div className="flex">
        <div className="bg-[#1E1932] rounded-xl px-8 py-10 w-1/2">
          <CoinStatistic
            statisticText="Total Volume"
            statisticData={coinData?.market_data?.total_volume[currentCurrency]}
            currentCurrency={currentCurrency}
          />
        </div>
        <div></div>
      </div>
    </main>
  );
}
