import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import arrowImg from "@/app/assets/arrow-right.svg";
import CoinSlide from "../CoinSlide";
import { useEffect } from "react";
import { fetchCoinList } from "@/app/lib/features/coinList/coinListSlice";
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
const selectCoinList = (state) => state.coinList.data;
const selectCurrency = (state) => state.currentCurrency;
export default function CoinSlider() {
    const coinList = useAppSelector(selectCoinList);
    const currentCurrency = useAppSelector(selectCurrency);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCoinList());
    },[dispatch, currentCurrency]);
    return (
        <div className="mb-10">
        <div className="mb-6">
            <h3>Select the currency to view the statistics</h3>
        </div>
        <div className="relative overflow-hidden h-20">
        <ul className="list-none w-full h-full flex space-x-2 transition-all">
            {coinList.map((coin: Coin) => <CoinSlide key={coin.id} currency={currentCurrency} coinData={coin} />)}
        </ul>
        <button className="absolute top-2 right-0 rounded-full p-4 bg-[#6161D6]">
                <Image src={arrowImg} alt="arrow-image"/>
            </button>
        </div>
        </div>
    );
}