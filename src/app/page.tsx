"use client";
import { useEffect} from "react";
import HomePageNavigator from "./components/HomePageNavigator";
import { useAppSelector, useAppDispatch } from "./lib/hooks";
import { fetchCoinList } from "./lib/features/coinList/coinListSlice";
import CoinTable from "./components/CoinTable";
interface State {
  currentCurrency: string,
  coinList: any
}
const selectCurrency = (state: State) => state.currentCurrency;
const selectCoinList = (state: State) => state.coinList.data;
const selectCoinAmount = (state: State) => state.coinList.coinsToDisplay;
export default function Home() {
  const currentCurrency = useAppSelector(selectCurrency);
  const coinList = useAppSelector(selectCoinList);
  const coinsToDisplay = useAppSelector(selectCoinAmount);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCoinList());
  }, [currentCurrency, dispatch]);
  return (
    <main className="">
      <HomePageNavigator />
      <div className="">
        {coinList && <CoinTable coinsToDisplay={coinsToDisplay} coinList={coinList} />}
      </div>
    </main>
  );
}