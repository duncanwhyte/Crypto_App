"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import { useAppSelector } from "@/app/lib/hooks";
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
  return (
    <main>
      <div>
        <div className="bg-[#1E1932] px-8 py-10 rounded-xl">
          <div className="flex mb-8">
            <Image
              width={48}
              height={48}
              src={coinData?.image?.small}
              alt="crypto-symbol-image"
            />
            <div className="flex flex-col">
              <h3>
                {coinData?.name} ({coinData?.symbol.toUpperCase()})
              </h3>
              <a href={coinData?.links?.homepage[0]}>
                {coinData?.links?.homepage[0]}
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-2xl">
              {handleCurrencySymbol(currentCurrency)}
              {coinData?.market_data?.current_price[currentCurrency]}
            </h2>
          </div>
          <hr></hr>
          <div className="flex justify-between">
            <div>
              <h3>All Time High:</h3>
            </div>
            <h3>
              {handleCurrencySymbol(currentCurrency)}
              {coinData?.market_data?.ath[currentCurrency]}
            </h3>
          </div>
          <>
            {new Date(
              coinData?.market_data?.ath_date[currentCurrency]
            ).toString()}
          </>
          <div className="flex justify-between">
            <div className="flex">
              <h3>All Time Low:</h3>
            </div>
            <h3>
              {handleCurrencySymbol(currentCurrency)}
              {coinData?.market_data?.atl[currentCurrency]}
            </h3>
          </div>
          <>
            {new Date(
              coinData?.market_data?.atl_date[currentCurrency]
            ).toString()}
          </>
        </div>
        <div></div>
      </div>
    </main>
  );
}
