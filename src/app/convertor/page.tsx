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
const selectCoinList = (state) => state.coinList.data;
const selectCurrentCurrency = (state) => state.currentCurrency;
export default function Convertor() {
  const coinList = useAppSelector(selectCoinList);
  const currentCurrency = useAppSelector(selectCurrentCurrency);
  const dispatch = useAppDispatch();
  const [sellingCoin, setSellingCoin] = useState(null);
  const [buyingCoin, setBuyingCoin] = useState(null);
  const [sellingAmount, setSellingAmount] = useState(0);
  const [buyingAmount, setBuyingAmount] = useState(0);
  const newDate = new Date();
  const handleSellingCoin = (coin) => {
    setSellingCoin(coin);
  };
  const handleBuyingCoin = (coin) => {
    setBuyingCoin(coin);
  };
  const handleCoinSwitch = () => {
    const sellCoin = sellingCoin || coinList[0];
    const buyCoin = buyingCoin || coinList[1];
    const tempAmount = sellingAmount;
    setSellingCoin(buyCoin);
    setBuyingCoin(sellCoin);
    setSellingAmount(buyingAmount);
    setBuyingAmount(tempAmount);
  };
  const handleSellingAmount = (e, sellingCoin, buyingCoin) => {
    setSellingAmount(e.target.value);
    const sellingPrice =
      e.target.value === ""
        ? 0
        : parseFloat(e.target.value) * sellingCoin.current_price;
    setBuyingAmount(sellingPrice / buyingCoin.current_price);
  };
  const handleBuyingAmount = (e, buyingCoin, sellingCoin) => {
    setBuyingAmount(e.target.value);
    const buyingPrice =
      e.target.value === ""
        ? 0
        : parseFloat(e.target.value) * buyingCoin.current_price;
    setSellingAmount(buyingPrice / sellingCoin.current_price);
  };
  useEffect(() => {
    dispatch(fetchCoinList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCurrency]);
  return (
    <main className="px-20">
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
            handleBuyingCoin={false}
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
            handleSellingCoin={false}
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
