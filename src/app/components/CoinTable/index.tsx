"use client";
import Image from "next/image";
import handleTableProgressBar from "@/app/utils/handleTableProgressBar";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import { useAppSelector } from "@/app/lib/hooks";
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
  interface State {
    currentCurrency: string;
  }
  const currencySelect = (state: State) => state.currentCurrency;
export default function CoinTable({coinList}) {
    const currentCurrency = useAppSelector(currencySelect);
    return (
        <table>
            <tbody>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>1hr%</th>
                <th>24hr%</th>
                <th>7d%</th>
                <th>24hr volume / Market Cap</th>
                <th>Circulating Total Supply</th>
                <th>Last 7d</th>
            </tr>
            {coinList.map((coin: Coin, index: number) => {
                if (index === 10) return;
                return (
                    <tr className="bg-[#191925] m-b-2 align-left border-solid border-t-8 border-b-8 border-[#13121A] overflow-hidden rounded-xl" key={coin.id}>
                        <td>{index + 1}</td>
                        <td className="flex"><Image src={`${coin.image}`} width={30} height={30} alt="Crypto-Coin-Image"/>{coin.name}({`${coin.symbol.toUpperCase()}`})</td>
                        <td>{handleCurrencySymbol(currentCurrency)}{coin.current_price}</td>
                        <td className={`${coin.price_change_percentage_1h_in_currency > 0 ? "text-green-400" : "text-red-500"} p-5`}>{Math.abs(Math.round(coin.price_change_percentage_1h_in_currency * 100) / 100)}%</td>
                        <td className={`${coin.price_change_percentage_24h_in_currency > 0 ? "text-green-400" : "text-red-500"} p-5`}>{Math.abs(Math.round(coin.price_change_percentage_24h_in_currency * 100) / 100)}%</td>
                        <td className={`${coin.price_change_percentage_7d_in_currency > 0 ? "text-green-400" : "text-red-500"} p-5`}>{Math.abs(Math.round(coin.price_change_percentage_7d_in_currency * 100) / 100)}%</td>
                        <td>
                            <div className={"w-full h-2 bg-[#AFE5E5] rounded-xl"}>
                                <div style={{width: `${Math.min(handleTableProgressBar(coin.total_volume, coin.market_cap), 100)}%`}} className="bg-red-400 h-full rounded-xl"></div>
                            </div>
                        </td>
                        <td>
                            <div className={"w-full h-2 bg-[#AFE5E5] rounded-xl"}>
                                <div>
                                </div>
                                <div style={{width: `${Math.min(handleTableProgressBar(coin.total_volume, coin.market_cap), 100)}%`}} className={"bg-[#00B1A7] h-full rounded-xl"}></div>
                            </div>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}