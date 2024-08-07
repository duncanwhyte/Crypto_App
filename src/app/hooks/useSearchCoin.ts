/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { MutableRefObject, useEffect, useState } from "react";
import { SearchedCoin } from "../types/types";
export default function useSearchCoin(
  searchValue: string,
  focused: boolean,
  timerRef: MutableRefObject<number | undefined>
) {
  const [searchedCoins, setSearchedCoins] = useState<SearchedCoin[] | null>(
    null
  );
  const searchCoins = async (): Promise<void> => {
    if (!searchValue || !focused) {
      setSearchedCoins(null);
      return;
    }
    const coinsReq = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${searchValue}&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    const searchedCoinsData = await coinsReq.json();
    const filteredCoins: SearchedCoin[] = searchedCoinsData.coins.filter(
      (coin: SearchedCoin) => coin.id.startsWith(searchValue)
    );
    setSearchedCoins(filteredCoins);
  };
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      searchCoins();
    }, 500);
    return () => {
      clearTimeout(timerRef?.current);
    };
  }, [searchValue]);
  return [searchedCoins, setSearchedCoins] as const;
}
