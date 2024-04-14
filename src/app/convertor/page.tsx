"use client";
import HomePageNavigator from "../components/HomePageNavigator";
import { useAppSelector, useAppDispatch } from "../lib/hooks";
import { useEffect } from "react";
import { fetchCoinList } from "../lib/features/coinList/coinListSlice";
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
            <div className="flex">
                {coinList && <CoinConvertor selling={true} sellingCoin={coinList[0]} buyingCoin={false} />}
                {coinList && <CoinConvertor selling={false} buyingCoin={coinList[1]} sellingCoin={false} />}
            </div>
            <div>
                <TimeDurationSelector />
            </div>
        </main>
    );
}