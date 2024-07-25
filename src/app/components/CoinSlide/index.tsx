import Image from "next/image";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import PriceAscendingIcon from "../Svgs/PriceAscendingIcon";
import PriceDescendingIcon from "../Svgs/PriceDescendingIcon";
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
      } rounded-xl min-w-[75px] sm:min-w-[168px] lg:min-w-auto text-xs p-2.5 hover:bg-[#CCCCFA] md:p-4 hover:dark:bg-[#6161D6] transition-all cursor-pointer`}
    >
      <div className="flex justify-center sm:justify-around items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 mr-4 flex items-center gap-2 lg:flex-col lg:items-center ">
            <Image
              width={36}
              height={36}
              className={`md:w-8 md:h-8 ${
                coinData.price_change_percentage_1h_in_currency > 0
                  ? "fill-green-500"
                  : "fill-red-500"
              }`}
              src={coinData.image}
              alt="coin-image"
            />
          </div>
          <div className="lg:flex lg:flex-col ">
            <h3 className="text-sm lg:text-base">
              <span className="inline lg:hidden">
                {coinData.symbol.toUpperCase()}
              </span>
              <span className="hidden lg:block lg:text-xs">
                {coinData.name} ({coinData.symbol.toUpperCase()})
              </span>
            </h3>
            <div className="hidden text-[#424286] dark:text-[#E8E8E8] lg:flex lg:items-center lg:gap-2">
              <p>
                {handleCurrencySymbol(currency)}
                {coinData.current_price}
              </p>
              <div className="flex items-center gap-2">
                {coinData.price_change_percentage_1h_in_currency > 0 ? (
                  <PriceAscendingIcon />
                ) : (
                  <PriceDescendingIcon />
                )}
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
        </div>
        <div className="sm:flex sm:flex-col">
          <div className="hidden sm:text-sm sm:flex sm:flex-col sm:items-center">
            <p className="lg:hidden">
              {handleCurrencySymbol(currency)}
              {coinData.current_price.toFixed(2)}
              <span className="hidden md:inline">{currency.toUpperCase()}</span>
            </p>
            <div className="hidden sm:flex sm:items-center sm:gap-2 lg:gap-0 lg:hidden">
              {coinData.price_change_percentage_1h_in_currency > 0 ? (
                <PriceAscendingIcon />
              ) : (
                <PriceDescendingIcon />
              )}
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
      </div>
    </li>
  );
}
