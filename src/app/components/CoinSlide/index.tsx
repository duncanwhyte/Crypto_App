import Image from "next/image";
import priceChangeIcon from "@/app/assets/price-change-icon.svg";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
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
export default function CoinSlide({coinData, currency} : {coinData: Coin, currency: string}) {
    return (
        <li className="bg-[#191925] w-90 rounded-xl flex p-3 hover:bg-[#6161D6] transition-all cursor-pointer">
            <div className="w-60 flex items-center">
        <div className="w-8 h-8 mr-4">
            <Image width={36} height={36} className="w-8 h-8" src={coinData.image} alt="coin-image" />
        </div>
        <div className="flex flex-col">
        <div>
            <h3>{coinData.name} ({coinData.symbol.toUpperCase()})</h3>
        </div>
        <div className="flex">
            <h3>{handleCurrencySymbol(currency)}{coinData.current_price}{currency.toUpperCase()}</h3>
            <Image width={16} height={16} className="" src={priceChangeIcon} alt="price-change-icon" />
            <p>2.35%</p>
        </div>
        </div>
        </div>
    </li>
    );
}