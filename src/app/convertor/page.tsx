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
import ConversionChart from "../components/ConversionChart";
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
            <div className="mb-16 mx-auto relative">
                <div className="flex flex-col md:flex-row md:justify-between md:mx-auto">
                <CoinConvertor selling={true} sellingCoin={sellingCoin || coinList[0]} buyingCoin={buyingCoin || coinList[1]} sellingAmount={sellingAmount} buyingAmount={buyingAmount} handleSellingCoin={handleSellingCoin} handleBuyingCoin={false} handleSellingAmount={handleSellingAmount} handleBuyingAmount={handleBuyingAmount} />
                <div className="md:px-3"></div>
                <Image onClick={handleCoinSwitch} className="cursor-pointer p-3 bg-[#13121A] rounded-full w-[72px] h-[72px] left-1/2 top-1/2 -mt-[30px] -ml-[36px] md:p-3 md:bg-transparent md:-mt-[36px] md:-ml-[46px] 2xl:-ml-[36px] absolute" src={SwitchIcon} alt="switch-coin-button" />
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
                    <ConversionChart sellingCoin={sellingCoin || coinList[0]} buyingCoin={buyingCoin || coinList[1]} />
                </div>
            </div>
            <div>
                <TimeDurationSelector />
            </div>
        </main>
    );
}