"use client";
import { useEffect } from "react";
import HomePageNavigator from "./components/HomePageNavigator";
import CoinSlider from "./components/CoinSlider";
import { useAppSelector, useAppDispatch } from "./lib/hooks";
import { fetchCoinList } from "./lib/features/coinList/coinListSlice";
import CoinTable from "./components/CoinTable";
import SelectedCoinsCharts from "./components/SelectedCoinCharts";
import TimeDurationSelector from "./components/TimeDurationSelector";
import { RootState } from "./lib/store";
const selectCurrency = (state: RootState) => state.currentCurrency;
export default function Home() {
  const currentCurrency: string = useAppSelector(selectCurrency);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCoinList());
  }, [currentCurrency, dispatch]);
  return (
    <main className="px-20 pt-14 dark:text-white text-black">
      <HomePageNavigator />
      <CoinSlider />
      <div className="">
        <SelectedCoinsCharts />
        <TimeDurationSelector />
        <CoinTable />
      </div>
    </main>
  );
}
