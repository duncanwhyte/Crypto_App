import Image from "next/image";
import CoinName from "../CoinName";
import { useAppSelector } from "@/app/lib/hooks";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
const selectCurrentCurrency = (state) => state.currentCurrency;
export function CoinConvertor({ selling, sellingCoin, buyingCoin}: { selling: boolean , sellingCoin: any , buyingCoin: any }) {
    const currentCurrency = useAppSelector(selectCurrentCurrency);
    return (
        <div className="flex flex-col p-6 bg-[#191932] rounded-xl">
        <div>
        <p>You {selling ? "selling" : "buy"}</p>
        </div>
        <div>
            <div>
            <div className="flex items-center">
                <Image width={24} height={24} src={selling ? sellingCoin?.image : buyingCoin?.image} alt="crypto-image" />
                <CoinName id={selling ? sellingCoin?.id: buyingCoin?.id} name={selling ? sellingCoin?.name : buyingCoin?.name} symbol={selling ? sellingCoin?.name : buyingCoin?.name} />
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