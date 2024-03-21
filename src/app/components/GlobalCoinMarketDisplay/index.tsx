"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { fetchGlobalData } from "@/app/lib/features/globalCoinData/globalDataSlice";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import handleCurrency from "@/app/utils/handleCurrency";
const currencySelector = (state) => state.currentCurrency;
const globalDataSelector = (state) => state.globalData.data;
export default function GlobalCoinMarketDisplay() {
    const {data: globalData} = useAppSelector(globalDataSelector);
    const currentCurrency = useAppSelector(currencySelector);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchGlobalData());
    }, [dispatch, currentCurrency]);
    return (
        <div className="bg-[#1E1932]">
    <ul className="flex items-center justify-center space-x-5 py-5">
        <li>Coins {globalData?.active_cryptocurrencies}</li>
        <li>{handleCurrencySymbol(currentCurrency)}{handleCurrency(globalData?.total_volume[`${currentCurrency}`])}</li>
        <li></li>
        <li className="flex items-center">
            {Math.round(globalData?.market_cap_percentage["btc"])}%
            <div className="w-12 h-2 rounded-xl bg-neutral-400">
            <div style={{width: `${Math.round(globalData?.market_cap_percentage["btc"])}%`}} className="h-full rounded-xl bg-[#F7931A]"></div>
            </div>
        </li>
        <li className="flex items-center">
            {Math.round(globalData?.market_cap_percentage["eth"])}%
            <div className="w-12 h-2 rounded-xl bg-neutral-400">
                <div style={{width: `${Math.round(globalData?.market_cap_percentage["eth"])}%`}} className="h-full rounded-xl bg-[#849DFF]"></div>
            </div>
        </li>
    </ul>
    </div>
    );
}