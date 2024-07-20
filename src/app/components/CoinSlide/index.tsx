import Image from "next/image";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import useWindowWidth from "@/app/hooks/useWindowWidth";
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
  const windowWidth = useWindowWidth();
  return (
    <li
      onClick={() => handleAddCoin(coinData)}
      className={`${
        selected
          ? "bg-[#CCCCFA] dark:bg-[#6161D6] text-[#FFFFFF]"
          : "dark:bg-[#191925] bg-[#FFFFFF]"
      } rounded-xl text-xs p-2.5 hover:bg-[#CCCCFA] md:p-4 hover:dark:bg-[#6161D6] transition-all cursor-pointer`}
    >
      <div className="flex justify-between items-center">
        <div className="w-8 h-8 mr-4 flex items-center gap-2">
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
          <div className="md:flex md:flex-col">
            <div className="flex md:flex md:gap-2">
              <h3 className="text-sm lg:text-base md:hidden">
                {coinData.symbol.toUpperCase()}
              </h3>
              {windowWidth >= 768 && coinData.name}
              {windowWidth >= 768 && (
                <span>({coinData.symbol.toUpperCase()})</span>
              )}
            </div>
            <div className="hidden md:w-full md:gap-2 md:flex md:justify-between">
              <p>
                {handleCurrencySymbol(currency)}
                {coinData.current_price.toFixed(2)}
                {currency.toUpperCase()}
              </p>
              <div className="hidden items-center gap-2 md:flex">
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
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center md:flex md:justify-around w-full">
            <h3 className="hidden md:hidden">
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </h3>
            <h3 className="md:hidden">
              {handleCurrencySymbol(currency)}
              {coinData.current_price.toFixed(2)}
              {windowWidth >= 768 && currency.toUpperCase()}
            </h3>
            <div className="flex items-center gap-2 md:hidden">
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
