"use client";
import { useEffect, useState } from "react";
import HomePageNavigator from "./components/HomePageNavigator";
import { useAppSelector } from "./lib/hooks";
import CoinTable from "./components/CoinTable";
interface State {
  currentCurrency: string
}
const selectCurrency = (state: State) => state.currentCurrency;
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [coinList, setCoinList] = useState(null);
  const [error, setError] = useState("");
  const currentCurrency = useAppSelector(selectCurrency);
    useEffect(() => {
        const getCoins = async () => {
            try {
                setIsLoading(true);
                const coinReq = await fetch(`https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q&vs_currency=${currentCurrency}&price_change_percentage=1h,24h,7d&per_page=2`);
                const coinData = await coinReq.json();
                setCoinList(coinData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
        };
        getCoins();
    }, [currentCurrency]);
  return (
    <main className="">
      <HomePageNavigator />
      <div className="max-w-screen-xl m-auto">
        {error && error}
        {!isLoading && coinList && <CoinTable coinList={coinList} />}
      </div>
    </main>
  );
}