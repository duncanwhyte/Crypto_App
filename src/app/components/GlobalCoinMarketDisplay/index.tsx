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
        <div className="bg-[#1E1932] mb-5">
    <ul className="flex items-center justify-center space-x-5 py-5">
        <li>Coins {globalData?.active_cryptocurrencies}</li>
        <li>Exchanges {globalData?.markets}</li>
        <li>{handleCurrencySymbol(currentCurrency)}{handleCurrency(globalData?.total_market_cap[`${currentCurrency}`])}</li>
        <li className="flex items-center">
        <span className="mr-1">{handleCurrencySymbol(currentCurrency)}{handleCurrency(globalData?.total_volume[`${currentCurrency}`])}</span>
            <div className="w-12 h-2 rounded-xl bg-neutral-400">
            <div style={{width: `${Math.round(globalData?.total_volume[`${currentCurrency}`] / globalData?.total_market_cap[`${currentCurrency}`] * 100)}%`}} className="h-full rounded-xl bg-white"></div>
            </div>
        </li>
        <li className="flex items-center">
            <span className="mr-1">{Math.round(globalData?.market_cap_percentage["btc"])}%</span>
            <div className="w-12 h-2 rounded-xl bg-neutral-400">
            <div style={{width: `${Math.round(globalData?.market_cap_percentage["btc"])}%`}} className="h-full rounded-xl bg-[#F7931A]"></div>
            </div>
        </li>
        <li className="flex items-center">
            <span className="mr-1">{Math.round(globalData?.market_cap_percentage["eth"])}%</span>
            <div className="w-12 h-2 rounded-xl bg-neutral-400">
                <div style={{width: `${Math.round(globalData?.market_cap_percentage["eth"])}%`}} className="h-full rounded-xl bg-[#849DFF]"></div>
            </div>
        </li>
    </ul>
    </div>
    );
}