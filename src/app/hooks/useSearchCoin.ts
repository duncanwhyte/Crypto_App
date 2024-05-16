/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
export default function useSearchCoin(searchValue, timerRef): [] | null {
  const [searchedCoins, setSearchedCoins] = useState(null);
  const searchCoins = async () => {
    const coinsReq = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${searchValue}&x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
    );
    const searchedCoinsData = await coinsReq.json();
    const filteredCoins = searchedCoinsData.coins.filter((coin) =>
      coin.id.startsWith(searchValue)
    );
    setSearchedCoins(filteredCoins);
  };
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      searchCoins();
    }, 500);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [searchValue]);
  return searchedCoins;
}
