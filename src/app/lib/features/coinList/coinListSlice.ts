import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCoinData } from "../selectedCoins/selectedCoinsSlice";
import { MarketData } from "@/app/types/types";
import { AppDispatch, RootState } from "../../store";
interface CoinState {
  data: any[];
  isLoading: "idle" | "pending" | "success" | "failed";
  error: boolean | string;
  coinsToDisplay: number;
}
export const fetchCoinList = createAsyncThunk<
  MarketData[],
  void,
  { state: RootState; dispatch: AppDispatch }
>("coinList/getCoinList", async (_, thunkApi) => {
  const { currentCurrency } = thunkApi.getState();
  const { coinList } = thunkApi.getState();
  const { selectedCoins } = thunkApi.getState();
  const coinReq = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}&vs_currency=${currentCurrency}&price_change_percentage=1h,24h,7d&per_page=${coinList.coinsToDisplay}`
  );
  const coinData = await coinReq.json();
  if (selectedCoins.selectedCoins.length === 0) {
    thunkApi.dispatch(fetchCoinData(coinData[0]));
  }
  return coinData;
});
const initialState: CoinState = {
  data: [],
  isLoading: "idle",
  error: false,
  coinsToDisplay: 40,
};
const coinListSlice = createSlice({
  name: "coinList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCoinList.pending, (state) => {
      state.isLoading = "pending";
    });
    builder.addCase(fetchCoinList.fulfilled, (state, action) => {
      state.isLoading = "success";
      state.data = action.payload;
      state.isLoading = "idle";
    });
    builder.addCase(fetchCoinList.rejected, (state) => {
      state.isLoading = "failed";
      state.error = "Couldn't Fetch Coins";
    });
    builder.addCase("coinList/callCoins", (state) => {
      state.coinsToDisplay += state.coinsToDisplay;
    });
  },
});
export default coinListSlice;
