"use client";
import Image from "next/image";
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
export default function CoinTable({coinList}) {
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
                    <tr className="bg-[#191925] m-b-2 align-left border-solid border-t-8 border-b-8 border-[#13121A]" key={coin.id}>
                        <td>{index + 1}</td>
                        <td className="flex justify-between items-center p-5"><Image src={`${coin.image}`} width={30} height={30} alt="Crypto-Coin-Image"/> ({`${coin.symbol}`})</td>
                        <td>{}{coin.current_price}</td>
                        <td className={`text-${coin.price_change_percentage_1h_in_currency > 0 ? "green" : "red"}-400 p-5`}>{Math.round(coin.price_change_percentage_1h_in_currency * 100) / 100}</td>
                        <td className={`text-${coin.price_change_percentage_24h_in_currency > 0 ? "green" : "red"}-400 p-5`}>{Math.round(coin.price_change_percentage_24h_in_currency * 100) / 100}</td>
                        <td className={`text-${coin.price_change_percentage_7d_in_currency > 0 ? "green" : "red"}-400 p-5`}>{Math.round(coin.price_change_percentage_7d_in_currency * 100) / 100}</td>
                        <td>
                            <div className={"w-full h-2 bg-[#AFE5E5] rounded-xl"}>
                                <div className={`bg-[#00B1A7] w-[${Math.round(coin.total_volume / coin.market_cap * 100)}%] h-full rounded-xl`}></div>
                            </div>
                        </td>
                        <td>
                            <div className={"w-full h-2 bg-[#AFE5E5] rounded-xl"}>
                                <div className="bg-[#00B1A7] h-full rounded-xl"></div>
                            </div>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}