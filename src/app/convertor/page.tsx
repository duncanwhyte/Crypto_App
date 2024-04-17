"use client";
import HomePageNavigator from "../components/HomePageNavigator";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { useEffect} from "react";
import { fetchCoinList } from "../lib/features/coinList/coinListSlice";
import CoinName from "../components/CoinName";
import TimeDurationSelector from "../components/TimeDurationSelector";
import { CoinConvertor } from "../components/Convertors";
const selectCoinList = (state) => state.coinList.data;
const selectCurrentCurrency = (state) => state.currentCurrency;
export default function Convertor() {
    const coinList = useAppSelector(selectCoinList);
    const currentCurrency = useAppSelector(selectCurrentCurrency);
    const dispatch = useAppDispatch();
    const newDate = new Date();
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
            <div className="flex flex-col justify-between sm:flex-col md:flex-col lg:flex-row">
                <CoinConvertor selling={true} sellingCoin={coinList[0]} buyingCoin={false} />
                <CoinConvertor selling={false} sellingCoin={false} buyingCoin={coinList[1]} />
            </div>
            <div>
                <div className="bg-[#191932] p-6 rounded-xl">
                    <div className="space-x-3">
                    <CoinName id={coinList[0]?.id} name={coinList[0]?.name} symbol={coinList[0]?.symbol} />
                    <span>to</span>
                    <CoinName id={coinList[1]?.id} name={coinList[1]?.name} symbol={coinList[1]?.symbol} />
                    </div>
                </div>
            </div>
            <div>
                <TimeDurationSelector />
            </div>
        </main>
    );
}