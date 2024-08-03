import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleCoinDates from "@/app/utils/handleCoinDates";
import { CoinTableCoin, ConversionCoin } from "@/app/types/types";
import { RootState } from "../../store";
interface State {
  conversionCoins: any;
  isLoading: boolean;
  error:
    | ""
    | "Couldn't fetch selling coin data"
    | "Couldn't fetch buying coin data";
}
const initialState: State = {
  conversionCoins: {
    sellingCoin: null,
    buyingCoin: null,
  },
  isLoading: false,
  error: "",
};
const callConversionData = async (
  arg: CoinTableCoin,
  thunkApi: { getState: () => RootState }
) => {
  const { currentCurrency } = thunkApi.getState();
  const { graphTimeDuration } = thunkApi.getState();
  const [currentTime, pastTime] = handleCoinDates(
    graphTimeDuration.graphTimeDuration
  );
  const coinDataReq = await fetch(
    `https://api.coingecko.com/api/v3/coins/${arg.id}/market_chart/range?x_cg_demo_api_key=${process.env.NEXT_PUBLIC_API_KEY}&vs_currency=${currentCurrency}&from=${pastTime}&to=${currentTime}`
  );
  const coinData = await coinDataReq.json();
  const conversionCoin = {
    name: arg.name,
    prices: coinData.prices,
  };
  return conversionCoin;
};
export const fetchSellingCoinData = createAsyncThunk<
  ConversionCoin,
  CoinTableCoin,
  {
    state: RootState;
  }
>("conversionCoins/getSellingCoinPrices", callConversionData);
export const fetchBuyingCoinData = createAsyncThunk<
  ConversionCoin,
  CoinTableCoin,
  { state: RootState }
>("conversionCoins/getBuyingCoinPrices", callConversionData);
const conversionCoinsSlice = createSlice({
  name: "conversionCoins",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSellingCoinData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSellingCoinData.fulfilled, (state, action) => {
      state.isLoading = true;
      state.conversionCoins.sellingCoin = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchSellingCoinData.rejected, (state) => {
      state.isLoading = false;
      state.error = "Couldn't fetch selling coin data";
    });
    builder.addCase(fetchBuyingCoinData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBuyingCoinData.fulfilled, (state, action) => {
      state.isLoading = true;
      state.conversionCoins.buyingCoin = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchBuyingCoinData.rejected, (state) => {
      state.isLoading = false;
      state.error = "Couldn't fetch buying coin data";
    });
  },
});
export default conversionCoinsSlice;
