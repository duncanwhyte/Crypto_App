"use client";
import { useEffect } from "react";
import HomePageNavigator from "./components/HomePageNavigator";
import CoinSlider from "./components/CoinSlider";
import { useAppSelector, useAppDispatch } from "./lib/hooks";
import { fetchCoinList } from "./lib/features/coinList/coinListSlice";
import CoinTable from "./components/CoinTable";
import SelectedCoinsCharts from "./components/SelectedCoinCharts";
import TimeDurationSelector from "./components/TimeDurationSelector";
interface State {
  darkTheme: boolean;
  currentCurrency: string;
  coinList: any;
  selectedCoins: any;
  graphTimeDuration: any;
}
const selectCurrency = (state: State) => state.currentCurrency;
const selectCoinList = (state: State) => state.coinList.data;
const selectCoinsToDisplay = (state: State) => state.coinList.coinsToDisplay;
export default function Home() {
  const currentCurrency = useAppSelector(selectCurrency);
  const coinList = useAppSelector(selectCoinList);
  const coinsToDisplay = useAppSelector(selectCoinsToDisplay);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCoinList());
  }, [currentCurrency, dispatch, coinsToDisplay]);
  return (
    <main className="px-20 pt-14 dark:text-white text-black">
      <HomePageNavigator />
      <CoinSlider />
      <div className="">
        <SelectedCoinsCharts />
        <TimeDurationSelector />
        {coinList && <CoinTable />}
      </div>
    </main>
  );
}
