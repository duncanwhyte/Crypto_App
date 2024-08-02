"use client";
import HomePageNavigator from "../components/HomePageNavigator";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { useEffect, useState } from "react";
import { fetchCoinList } from "../lib/features/coinList/coinListSlice";
import CoinName from "../components/CoinName";
import TimeDurationSelector from "../components/TimeDurationSelector";
import { CoinConvertor } from "../components/Convertors";
import ConversionChart from "../components/ConversionChart";
import CoinConvertorSwitch from "../components/Svgs/CoinConvertorSwitch";
import { RootState } from "../lib/store";
import { CoinTableCoin } from "../types/types";
const selectCoinList = (state: RootState) => state.coinList.data;
const selectCurrentCurrency = (state: RootState) => state.currentCurrency;
export default function Convertor() {
  const coinList: CoinTableCoin[] = useAppSelector(selectCoinList);
  const currentCurrency = useAppSelector(selectCurrentCurrency);
  const dispatch = useAppDispatch();
  const [sellingCoin, setSellingCoin] = useState<CoinTableCoin | null>(null);
  const [buyingCoin, setBuyingCoin] = useState<CoinTableCoin | null>(null);
  const [sellingAmount, setSellingAmount] = useState<number | string>(0);
  const [buyingAmount, setBuyingAmount] = useState<number | string>(0);
  const newDate = new Date();
  const handleSellingCoin = (coin: CoinTableCoin): void => {
    setSellingCoin(coin);
  };
  const handleBuyingCoin = (coin: CoinTableCoin): void => {
    setBuyingCoin(coin);
  };
  const handleCoinSwitch = (): void => {
    const sellCoin = sellingCoin || coinList[0];
    const buyCoin = buyingCoin || coinList[1];
    const tempAmount = sellingAmount;
    setSellingCoin(buyCoin);
    setBuyingCoin(sellCoin);
    setSellingAmount(buyingAmount);
    setBuyingAmount(tempAmount);
  };
  const handleSellingAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    sellingCoin: CoinTableCoin,
    buyingCoin: CoinTableCoin
  ): void => {
    setSellingAmount(e.target.value);
    if (!isNaN(parseFloat(e.target.value)) && parseFloat(e.target.value) > 0) {
      setBuyingAmount(
        (parseFloat(e.target.value) * sellingCoin.current_price) /
          buyingCoin.current_price
      );
    }
  };
  const handleBuyingAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    buyingCoin: CoinTableCoin,
    sellingCoin: CoinTableCoin
  ): void => {
    setBuyingAmount(e.target.value);
    if (!isNaN(parseFloat(e.target.value)) && parseFloat(e.target.value) > 0) {
      setSellingAmount(
        (parseFloat(e.target.value) * buyingCoin.current_price) /
          sellingCoin.current_price
      );
    }
  };
  useEffect(() => {
    dispatch(fetchCoinList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCurrency]);
  return (
    <main className="px-4 lg:px-20">
      <HomePageNavigator />
      <div className="mt-10 mb-6">
        <h3 className="text-xl text-[#424286] dark:text-[#FFFFFF]">
          Online currency convertor
        </h3>
        <p className="text-base text-[#424286] dark:text-[#9E9E9E]">
          {newDate.toLocaleDateString()}{" "}
          {Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          }).format(newDate)}
        </p>
      </div>
      <div className="mb-16 mx-auto relative">
        <div className="flex flex-col md:flex-row md:justify-between md:mx-auto">
          <CoinConvertor
            selling={true}
            sellingCoin={sellingCoin || coinList[0]}
            buyingCoin={buyingCoin || coinList[1]}
            sellingAmount={sellingAmount}
            buyingAmount={buyingAmount}
            handleSellingCoin={handleSellingCoin}
            handleBuyingCoin={handleBuyingCoin}
            handleSellingAmount={handleSellingAmount}
            handleBuyingAmount={handleBuyingAmount}
          />
          <div className="md:px-3"></div>
          <CoinConvertorSwitch handleCoinSwitch={handleCoinSwitch} />
          <CoinConvertor
            selling={false}
            sellingCoin={sellingCoin || coinList[0]}
            buyingCoin={buyingCoin || coinList[1]}
            sellingAmount={sellingAmount}
            buyingAmount={buyingAmount}
            handleBuyingCoin={handleBuyingCoin}
            handleSellingCoin={handleSellingCoin}
            handleBuyingAmount={handleBuyingAmount}
            handleSellingAmount={handleSellingAmount}
          />
        </div>
      </div>
      <div>
        <div className="bg-[#FFFFFF] text-[#353570] dark:bg-[#191932] dark:text-[#FFFFFF] p-6 rounded-xl mb-10">
          <div className="space-x-3">
            <CoinName
              id={sellingCoin?.id || coinList[0]?.id}
              name={sellingCoin?.name || coinList[0]?.name}
              symbol={sellingCoin?.symbol || coinList[0]?.symbol}
            />
            <span className="text-[#A7A7CC]">to</span>
            <CoinName
              id={buyingCoin?.id || coinList[1]?.id}
              name={buyingCoin?.name || coinList[1]?.name}
              symbol={buyingCoin?.symbol || coinList[1]?.symbol}
            />
          </div>
          <ConversionChart
            sellingCoin={sellingCoin || coinList[0]}
            buyingCoin={buyingCoin || coinList[1]}
          />
        </div>
      </div>
      <div>
        <TimeDurationSelector />
      </div>
    </main>
  );
}
