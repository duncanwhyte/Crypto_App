"use client";
import HomePageNavigator from "../components/HomePageNavigator";
import SwitchIcon from "@/app/assets/switchIcon.svg";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { useEffect, useState} from "react";
import { fetchCoinList } from "../lib/features/coinList/coinListSlice";
import CoinName from "../components/CoinName";
import TimeDurationSelector from "../components/TimeDurationSelector";
import { CoinConvertor } from "../components/Convertors";
import Image from "next/image";
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
        const sellingPrice = e.target.value === "" ? 0  : parseFloat(e.target.value) * sellingCoin.current_price;
        setBuyingAmount(sellingPrice / buyingCoin.current_price);
    };
    const handleBuyingAmount = (e, buyingCoin, sellingCoin) => {
        setBuyingAmount(e.target.value);
        const buyingPrice = e.target.value === "" ? 0 : parseFloat(e.target.value) * buyingCoin.current_price;
        setSellingAmount(buyingPrice / sellingCoin.current_price);
    };
    useEffect(() => {
        dispatch(fetchCoinList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentCurrency]);
    return (
        <main>
            <HomePageNavigator />
            <div>
                <h3 className="text-xl">Online currency convertor</h3>
                <p className="text-base text-[]">{newDate.toLocaleDateString()} {Intl.DateTimeFormat("en-GB", {hour: "2-digit", minute: "2-digit"}).format(newDate)}</p>
            </div>
            <div className="mb-16 xl:max-w-[1296px] mx-auto">
                <div className="flex flex-col justify-around sm:flex-col md:flex-row lg:flex-row sm:mx-auto md:mx-auto relative">
                <CoinConvertor selling={true} sellingCoin={sellingCoin || coinList[0]} buyingCoin={buyingCoin || coinList[1]} sellingAmount={sellingAmount} buyingAmount={buyingAmount} handleSellingCoin={handleSellingCoin} handleBuyingCoin={false} handleSellingAmount={handleSellingAmount} handleBuyingAmount={handleBuyingAmount} />
                <div className="absolute top-1/2 left-1/2 -ml-[26px] -mt-[26px]">
                <Image onClick={handleCoinSwitch} className="cursor-pointer" src={SwitchIcon} alt="switch-coin-button" />
                </div>
                <CoinConvertor selling={false}  sellingCoin={sellingCoin || coinList[0]} buyingCoin={buyingCoin || coinList[1]} sellingAmount={sellingAmount} buyingAmount={buyingAmount} handleBuyingCoin={handleBuyingCoin} handleSellingCoin={false} handleBuyingAmount={handleBuyingAmount} handleSellingAmount={handleSellingAmount} />
                </div>
            </div>
            <div>
                <div className="bg-[#191932] p-6 rounded-xl">
                    <div className="space-x-3">
                    <CoinName id={sellingCoin?.id || coinList[0]?.id} name={sellingCoin?.name || coinList[0]?.name} symbol={sellingCoin?.symbol || coinList[0]?.symbol} />
                    <span className="text-[#A7A7CC]">to</span>
                    <CoinName id={buyingCoin?.id || coinList[1]?.id} name={buyingCoin?.name || coinList[1]?.name} symbol={buyingCoin?.symbol || coinList[1]?.symbol} />
                    </div>
                    <div></div>
                </div>
            </div>
            <div>
                <TimeDurationSelector />
            </div>
        </main>
    );
}