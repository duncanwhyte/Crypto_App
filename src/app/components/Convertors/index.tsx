import Image from "next/image";
import CoinName from "../CoinName";
import priceChangeIcon from "@/app/assets/price-change-icon.svg";
import { useAppSelector } from "@/app/lib/hooks";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import { useState } from "react";
const selectCurrentCurrency = (state) => state.currentCurrency;
const selectCoinList = (state) => state.coinList.data;
export function CoinConvertor({ selling, sellingCoin, buyingCoin}: { selling: boolean , sellingCoin: any , buyingCoin: any}) {
    const currentCurrency = useAppSelector(selectCurrentCurrency);
    const coinList = useAppSelector(selectCoinList);
    const [showCoinList, setShowCoinList] = useState(false);
    const handleShowCoinList = () => {
        setShowCoinList(!showCoinList);
    };
    return (
        <div className="flex flex-col p-6 bg-[#191932] max-w-[50%] rounded-xl">
        <div>
        <p>You {selling ? "selling" : "buy"}</p>
        </div>
        <div>
            <div>
            <div className="flex justify-between items-center relative">
                <div className={"flex items-center"}>
                <Image width={24} height={24} src={selling ? sellingCoin?.image : buyingCoin?.image} alt="crypto-image" />
                <CoinName id={selling ? sellingCoin?.id: buyingCoin?.id} name={selling ? sellingCoin?.name : buyingCoin?.name} symbol={selling ? sellingCoin?.symbol : buyingCoin?.symbol} />
                <Image onClick={handleShowCoinList} className={"cursor-pointer"} src={priceChangeIcon} width={24} height={24} alt="drop-down-icon"/>
                </div>
                <>
                <input placeholder="" />
                </>
                <ul className="absolute w-full rounded-xl z-10 px-6 top-4 bg-[#232336]">
                    {showCoinList && coinList.map((coin) => <li key={coin.id}>{coin.name}</li>)}
                </ul>
            </div>
            <button>
            </button>
            <div>
            <hr></hr>
            </div>
            <div>
                <p>1 {selling ? sellingCoin?.symbol : buyingCoin?.symbol} = {handleCurrencySymbol(currentCurrency)}{selling ? sellingCoin?.current_price : buyingCoin?.current_price}</p>
            </div>
            </div>
            <div>
            </div>
        </div>
    </div>
    );
}