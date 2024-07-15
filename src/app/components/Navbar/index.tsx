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
import useWindowWidth from "@/app/hooks/useWindowWidth";
import handleCurrencySymbol from "@/app/utils/handleCurrencySymbol";
import { changeCurrency } from "@/app/lib/features/currency/currencySlice";
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
  const windowWidth = useWindowWidth();
  const [coinSearchVal, setCoinSearchVal] = useState("");
  const [debouncedCoinVal, setDebouncedCoinVal] = useState("");
  const [openMobileInput, setOpenMobileInput] = useState(false);
  const [openCurrencyDropdown, setOpenCurrencyDropdown] = useState(false);
  const currentCurrency = useAppSelector(selectCurrency);
  const coinList = useAppSelector(selectCoinList);
  const dispatch = useAppDispatch();
  const handleOpenMobileInput = () => {
    setOpenMobileInput(!openMobileInput);
  };
  const handleSearchCoin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoinSearchVal(e.target.value);
  };
  const handleCurrencyChange = (e) => {
    dispatch(changeCurrency(e.target.innerText.toLowerCase()));
  };
  const handleCurrencyDropdown = () => {
    setOpenCurrencyDropdown(!openCurrencyDropdown);
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
    <nav className="bg-[#FFFFFF] dark:bg-[#13121A] px-4 md:px-6 lg:px-20 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-[#353570] dark:text-[#FFFFFF] text-base md:text-xl font-bold">
          CoinMon
        </h1>
      </div>
      <div className="flex lg:space-x-4">
        <div
          className={`flex gap-1 items-center rounded-lg p-2 lg:dark:bg-[#6161D6] ${
            pathName === "/" || pathName === "/convertor"
              ? "bg-[#6161D6] lg:bg-transparent lg:dark:bg-transparent bg-opacity-50"
              : "bg-transparent dark:bg-[#232336] lg:bg-transparent lg:dark:bg-transparent"
          }`}
        >
          <HomeIcon pathName={pathName} />
          <Link
            className={`flex items-center gap-1 dark:text-[#FFFFFF] ${
              pathName === "/" || pathName === "/convertor"
                ? "text-[#FFFFF] hidden lg:inline"
                : "text-[#808080] dark:text-[FFFFF] dark:text-opacity-50"
            }`}
            href={"/"}
          >
            Home
          </Link>
        </div>
        <div
          className={`flex gap-1 items-center rounded-lg p-2 lg:dark:bg-[#6161D6] ${
            pathName === "/portfolio"
              ? "bg-[#6161D6] bg-opacity-50 lg:bg-transparent lg:dark:bg-transparent bg-opacity-50"
              : "dark:bg-[#232336] lg:dark:bg-transparent"
          }`}
        >
          {pathName === "/portfolio" ? (
            <PortfolioActiveIcon />
          ) : (
            <PortfolioIcon />
          )}
          <Link
            className={`flex items-center gap-1 text-[#353570] dark:text-[#FFFFFF] ${
              pathName === "/portfolio"
                ? "text-[#FFFFF] hidden lg:inline"
                : "text-[#80FFFFF] dark:text-[#FFFFFF] dark:text-opacity-50"
            }`}
            href={"/portfolio"}
          >
            Portfolio
          </Link>
        </div>
      </div>
      <div className="flex items-center relative lg:gap-4">
        <div className="md:relative">
          {windowWidth >= 768 && (
            <input
              onChange={(e) => handleSearchCoin(e)}
              className={`inline-block md:px-12 md:py-3 text-black placeholder-black dark:text-[#FFFFFF] dark:placeholder-[#FFFFFF]  ${
                coinSearchVal && coinList ? "rounded-t-xl" : "rounded-xl"
              }  bg-[#CCCCFA] dark:bg-[#232334] outline-none`}
              placeholder={`${windowWidth < 768 ? "" : "Search..."}`}
              value={coinSearchVal}
            />
          )}
          {openMobileInput && (
            <input
              onChange={(e) => handleSearchCoin(e)}
              className={`${
                openMobileInput
                  ? "inline-block absolute top-16 min-w-16 z-10"
                  : "hidden"
              } transition-all md:px-12 md:py-3 text-black placeholder-black dark:text-[#FFFFFF] dark:placeholder-[#FFFFFF]  ${
                coinSearchVal && coinList ? "rounded-t-xl" : "rounded-xl"
              }  bg-[#CCCCFA] dark:bg-[#232334] outline-none`}
              placeholder={`${windowWidth < 768 ? "Search..." : ""}`}
              value={coinSearchVal}
            />
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="hidden md:inline w-5 h-5 stroke-black dark:stroke-[#FFFFFF] cursor-pointer absolute top-3.5 left-1 z-10 md:top-3.5 md:left-4 md:cursor-auto"
            onClick={handleOpenMobileInput}
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
          <div className="flex items-center py-3 px-4 md:px-4 rounded-xl bg-[#CCCCFA] dark:bg-[#232334]">
            {windowWidth < 768 ? (
              <div onClick={handleOpenMobileInput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 stroke-black dark:stroke-[#FFFFFF] cursor-pointer md:top-3.5 md:left-4 md:cursor-auto"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </div>
            ) : (
              <div className="px-2 flex items-center justify-center rounded-full bg-[#424286] dark:bg-[#FFFFFF] text-[#CCCCFA66] dark:text-[#13121A]">
                {handleCurrencySymbol(currentCurrency)}
              </div>
            )}
            <div
              className="flex items-center cursor-pointer"
              onClick={handleCurrencyDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 top-4 right-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
              <ul
                onClick={handleCurrencyChange}
                className={`absolute transition-all ${
                  openCurrencyDropdown
                    ? "opacity-100 z-10 top-[100%]"
                    : "opacity-0 -z-10 top-0"
                }`}
              >
                <li value={"gbp"}>GBP</li>
                <li value={"usd"}>USD</li>
                <li value={"eur"}>EUR</li>
                <li value={"btc"}>BTC</li>
                <li value={"eth"}>ETH</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ThemeToggle />
    </nav>
  );
}
