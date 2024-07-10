"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import HomeIcon from "../Svgs/HomeIcon/HomeIcon";
import PortfolioIcon from "../Svgs/PortfolioIcon/PortfolioIcon";
import PortfolioActiveIcon from "../Svgs/PortfolioActiveIcon/PortfolioActiveIcon";
import ThemeToggle from "../ThemeToggle";
interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
}
interface State {
  currentCurrency: string;
  darkTheme: boolean;
  coinList: any;
}
const selectCurrency = (state: State) => state.currentCurrency;
const selectCoinList = (state: State) => state.coinList.data;
export default function Navbar() {
  const pathName = usePathname();
  const [coinSearchVal, setCoinSearchVal] = useState("");
  const [debouncedCoinVal, setDebouncedCoinVal] = useState("");
  const currentCurrency = useAppSelector(selectCurrency);
  const coinList = useAppSelector(selectCoinList);
  const dispatch = useAppDispatch();
  const handleSearchCoin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoinSearchVal(e.target.value);
  };
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency: string = e.target.value;
    dispatch({ type: "currency/change", payload: newCurrency });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCoinVal(coinSearchVal);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [coinSearchVal]);
  return (
    <nav className="bg-[#FFFFFF] dark:bg-[#13121A] px-1 md:px-20 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-[#353570] dark:text-[#FFFFFF] text-xl font-bold">
          CoinMon
        </h1>
      </div>
      <div className="flex space-x-4">
        <div className="flex gap-1 items-center">
          <HomeIcon pathName={pathName} />
          <Link
            className={`flex items-center gap-1 text-[#353570] dark:text-[#FFFFFF] ${
              pathName === "/" || pathName === "/convertor"
                ? "text-[#FFFFF]"
                : "text-[#808080]"
            }`}
            href={"/"}
          >
            Home
          </Link>
        </div>
        <div>
          <Link
            className={`flex items-center gap-1 text-[#353570] dark:text-[#FFFFFF] ${
              pathName === "/portfolio"
                ? "text-[#FFFFF]  lg:inline"
                : "text-[#808080]"
            }`}
            href={"/portfolio"}
          >
            {pathName === "/portfolio" ? (
              <PortfolioActiveIcon />
            ) : (
              <PortfolioIcon />
            )}
            Portfolio
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            onChange={(e) => handleSearchCoin(e)}
            className={`inline-block px-12 py-3 text-black placeholder-black dark:text-[#FFFFFF] dark:placeholder-[#FFFFFF]  ${
              coinSearchVal && coinList ? "rounded-t-xl" : "rounded-xl"
            }  bg-[#CCCCFA] dark:bg-[#232334] outline-none`}
            placeholder="Search..."
            value={coinSearchVal}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5 stroke-black dark:stroke-[#FFFFFF] absolute top-3.5 left-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <ul
            className={`${
              coinList && coinSearchVal ? "opacity-100" : "opacity-0"
            } absolute w-full max-h-44 p-2 bg-[#CCCCFA] dark:bg-[#232334] rounded-b-xl overflow-x-hidden overflow-y-scroll scroll-smooth`}
          >
            {debouncedCoinVal &&
              coinList &&
              coinList
                .filter((coin: Coin) => coin.name.includes(debouncedCoinVal))
                .map((coin: Coin) => (
                  <Link
                    className="flex items-center gap-5"
                    key={coin.id}
                    href={`/coins/${coin.id}`}
                  >
                    <Image
                      width={24}
                      height={24}
                      src={`${coin.image}`}
                      alt="Coin Image"
                    />
                    {coin.name}
                  </Link>
                ))}
          </ul>
        </div>
        <div>
          <div className="min-w-24 relative">
            <select
              value={currentCurrency}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleCurrencyChange(e)
              }
              className="appearance-none bg-[#CCCCFA] dark:bg-[#232334] px-6 py-3 rounded-xl w-full focus:outline-none"
            >
              <option value="usd">USD</option>
              <option value="gbp">GBP</option>
              <option value="eur">EUR</option>
              <option value="btc">BTC</option>
              <option value="eth">ETH</option>
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 absolute top-4 right-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
