"use client";
import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchGlobalData } from "@/app/lib/features/globalCoinData/globalDataSlice";
import coinsImg from "@/app/assets/flash-circle.svg";
import marketsImg from "@/app/assets/recovery-convert.svg";
import bitcoinImg from "@/app/assets/btc.svg";
import ethereumImg from "@/app/assets/ETH (blue).svg";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import handleCurrency from "@/app/utils/handleCurrency";
interface State {
  currentCurrency: string;
  globalData: any;
}
const currencySelector = (state: State) => state.currentCurrency;
const globalDataSelector = (state: State) => state.globalData.data;
export default function GlobalCoinMarketDisplay() {
  const { data: globalData } = useAppSelector(globalDataSelector);
  const currentCurrency = useAppSelector(currencySelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGlobalData());
  }, [dispatch, currentCurrency]);
  return (
    <div className="bg-[#353570] text-[#FFFFFF] dark:bg-[#1E1932]">
      <ul className="flex items-center justify-center space-x-8 py-5">
        <li className="flex items-center">
          <Image className="w-5 h-5 mr-1" src={coinsImg} alt="coins-image" />
          Coins {globalData?.active_cryptocurrencies}
        </li>
        <li className="flex items-center">
          <Image
            className="w-5 h-5 mr-1"
            src={marketsImg}
            alt="markets-image"
          />
          Markets {globalData?.markets}
        </li>
        <li>
          {handleCurrencySymbol(currentCurrency)}
          {handleCurrency(globalData?.total_market_cap[`${currentCurrency}`])}
        </li>
        <li className="flex items-center">
          <span className="mr-1">
            {handleCurrencySymbol(currentCurrency)}
            {handleCurrency(globalData?.total_volume[`${currentCurrency}`])}
          </span>
          <div className="w-12 h-2 overflow-hidden rounded-xl bg-neutral-400">
            <div
              style={{
                width: `${Math.round(
                  (globalData?.total_volume[`${currentCurrency}`] /
                    globalData?.total_market_cap[`${currentCurrency}`]) *
                    100
                )}%`,
              }}
              className="h-full rounded-xl bg-white"
            ></div>
          </div>
        </li>
        <li className="flex items-center">
          <Image className="mr-1" src={bitcoinImg} alt="bitcoin-image" />
          <span className="mr-1">
            {Math.round(globalData?.market_cap_percentage["btc"])}%
          </span>
          <div className="w-12 h-2 overflow-hidden rounded-xl bg-neutral-400">
            <div
              style={{
                width: `${Math.round(
                  globalData?.market_cap_percentage["btc"]
                )}%`,
              }}
              className="h-full rounded-xl bg-[#F7931A]"
            ></div>
          </div>
        </li>
        <li className="flex items-center">
          <Image className="mr-1" src={ethereumImg} alt="ethereum-image" />
          <span className="mr-1">
            {Math.round(globalData?.market_cap_percentage["eth"])}%
          </span>
          <div className="w-12 h-2 overflow-hidden rounded-xl bg-neutral-400">
            <div
              style={{
                width: `${Math.round(
                  globalData?.market_cap_percentage["eth"]
                )}%`,
              }}
              className="h-full rounded-xl bg-[#849DFF]"
            ></div>
          </div>
        </li>
      </ul>
    </div>
  );
}
