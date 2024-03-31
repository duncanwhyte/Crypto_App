"use client";
import { useEffect} from "react";
import HomePageNavigator from "./components/HomePageNavigator";
import CoinSlider from "./components/CoinSlider";
import { useAppSelector, useAppDispatch } from "./lib/hooks";
import { fetchCoinList } from "./lib/features/coinList/coinListSlice";
import CoinTable from "./components/CoinTable";
import SelectedCoinsCharts from "./components/SelectedCoinCharts";
interface State {
  currentCurrency: string,
  coinList: any,
  selectedCoins: any
}
const selectCurrency = (state: State) => state.currentCurrency;
const selectCoinList = (state: State) => state.coinList.data;
export default function Home() {
  const currentCurrency = useAppSelector(selectCurrency);
  const coinList = useAppSelector(selectCoinList);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCoinList());
  }, [currentCurrency, dispatch]);
  return (
    <main className="">
      <HomePageNavigator />
      <CoinSlider />
      <div className="">
        <SelectedCoinsCharts />
        {coinList && <CoinTable coinList={coinList} />}
      </div>
    </main>
  );
}