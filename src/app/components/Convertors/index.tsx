import Image from "next/image";
import { useState } from "react";
import { useAppSelector } from "@/app/lib/hooks";
import DropDownIcon from "../Svgs/DropDownIcon";
import CoinName from "../CoinName";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import { CoinTableCoin } from "@/app/types/types";
import { RootState } from "@/app/lib/store";
const selectCurrentCurrency = (state: RootState) => state.currentCurrency;
const selectCoinList = (state: RootState) => state.coinList.data;
export function CoinConvertor({
  selling,
  sellingCoin,
  buyingCoin,
  sellingAmount,
  buyingAmount,
  handleSellingCoin,
  handleBuyingCoin,
  handleSellingAmount,
  handleBuyingAmount,
}: {
  selling: boolean;
  sellingCoin: CoinTableCoin;
  buyingCoin: CoinTableCoin;
  sellingAmount: number;
  buyingAmount: number;
  handleSellingCoin: (_coin: CoinTableCoin) => void;
  handleBuyingCoin: (_coin: CoinTableCoin) => void;
  handleSellingAmount: (
    _e: React.ChangeEvent<HTMLInputElement>,
    _sellingCoin: CoinTableCoin,
    _buyingCoin: CoinTableCoin
  ) => void;
  handleBuyingAmount: (
    _e: React.ChangeEvent<HTMLInputElement>,
    _buyingCoin: CoinTableCoin,
    _sellingCoin: CoinTableCoin
  ) => void;
}) {
  const currentCurrency = useAppSelector(selectCurrentCurrency);
  const coinList: CoinTableCoin[] = useAppSelector(selectCoinList);
  const [showCoinList, setShowCoinList] = useState<boolean>(false);
  const handleShowCoinList = (): void => {
    setShowCoinList(!showCoinList);
  };
  return (
    <div
      className={`flex flex-col lg:basis-[525px] grow p-6 bg-[#FFFFFF] text-black dark:bg-[#191932] dark:text-[#FFFFFF]  ${
        selling ? "mb-6" : "bg-[#1E1932]"
      } md:m-0 2xl:basis-[636px] rounded-xl`}
    >
      <>
        <p className="mb-6 text-[#181825] dark:text-[#A7A7CC]">
          You {selling ? "selling" : "buy"}
        </p>
      </>
      <div>
        <div>
          <div className="flex justify-between items-center relative mb-6">
            <>
              <div className="flex items-center">
                <Image
                  width={24}
                  height={24}
                  src={selling ? sellingCoin?.image : buyingCoin?.image}
                  alt="crypto-image"
                />
                <CoinName
                  id={selling ? sellingCoin?.id : buyingCoin?.id}
                  name={selling ? sellingCoin?.name : buyingCoin?.name}
                  symbol={selling ? sellingCoin?.symbol : buyingCoin?.symbol}
                />
                <DropDownIcon handleShowCoinList={handleShowCoinList} />
              </div>
              <input
                onChange={
                  selling
                    ? (e) => handleSellingAmount(e, sellingCoin, buyingCoin)
                    : (e) => handleBuyingAmount(e, buyingCoin, sellingCoin)
                }
                className="bg-[#FFFFFF] dark:bg-[#191932] text-end max-w-[40%] focus:outline-0"
                value={selling ? sellingAmount : buyingAmount}
              />
            </>
            <ul
              className={`bg-[#CCCCFA] text-[#FFFFFF] dark:bg-[#232336] absolute w-full rounded-xl z-10 px-6 top-7 transition-all ${
                showCoinList ? "opacity-100" : "opacity-0"
              }`}
            >
              {showCoinList &&
                coinList.map((coin: CoinTableCoin) => (
                  <li
                    className="cursor-pointer"
                    onClick={() =>
                      selling ? handleSellingCoin(coin) : handleBuyingCoin(coin)
                    }
                    key={coin.id}
                  >
                    {coin.name}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <hr className=""></hr>
          </div>
          <div>
            <p className="text-[#353570] dark:text-[#FFFFFF]">
              1 {selling ? sellingCoin?.symbol : buyingCoin?.symbol} ={" "}
              {handleCurrencySymbol(currentCurrency)}
              {selling ? sellingCoin?.current_price : buyingCoin?.current_price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
