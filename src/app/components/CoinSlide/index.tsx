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
export default function CoinSlide({
  handleAddCoin,
  coinData,
  selected,
  currency,
}: {
  handleAddCoin: (_coin: Coin) => void;
  coinData: Coin;
  selected: boolean | undefined;
  currency: string;
}) {
  return (
    <li
      onClick={() => handleAddCoin(coinData)}
      className={`${
        selected
          ? "bg-[#CCCCFA] dark:bg-[#6161D6] text-[#FFFFFF]"
          : "dark:bg-[#191925] bg-[#FFFFFF]"
      } rounded-xl flex p-3 hover:bg-[#CCCCFA] hover:dark:bg-[#6161D6] transition-all cursor-pointer`}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 mr-4">
          <Image
            width={36}
            height={36}
            className={`w-8 h-8 ${
              coinData.price_change_percentage_1h_in_currency > 0
                ? "fill-green-500"
                : "fill-red-500"
            }`}
            src={coinData.image}
            alt="coin-image"
          />
        </div>
        <div className="flex flex-col">
          <div>
            <h3>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </h3>
          </div>
          <div className="flex justify-around w-full">
            <h3>
              {handleCurrencySymbol(currency)}
              {coinData.current_price}
              {currency.toUpperCase()}
            </h3>
            <Image
              width={24}
              height={24}
              className={`${
                coinData.price_change_percentage_1h_in_currency > 0 &&
                "rotate-180"
              }`}
              src={priceChangeIcon}
              alt="price-change-icon"
            />
            <p
              className={`${
                coinData.price_change_percentage_1h_in_currency > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {Math.abs(
                coinData.price_change_percentage_1h_in_currency
              ).toFixed(2)}
              %
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
