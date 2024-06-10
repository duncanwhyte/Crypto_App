import handleCoinDates from "@/app/utils/handleCoinDates";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface State {
  selectedCoins: any[];
  isLoading: boolean;
  error: boolean | string;
}
const deselectCoin = createAction<string>("selectedCoins/deselectCoin");
const callCoinData = async (arg: any, thunkApi: any) => {
  const { currentCurrency } = thunkApi.getState();
  const { graphTimeDuration } = thunkApi.getState();
  const [currentTime, pastTime] = handleCoinDates(
    graphTimeDuration.graphTimeDuration
  );
  const coinDataReq = await fetch(
    `https://api.coingecko.com/api/v3/coins/${arg.id}/market_chart/range?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q&vs_currency=${currentCurrency}&from=${pastTime}&to=${currentTime}`
  );
  const coinData = await coinDataReq.json();
  const newCoin = {
    id: arg.id,
    name: arg.name,
    symbol: arg.symbol,
    // eslint-disable-next-line
    total_volume: arg.total_volume,
    // eslint-disable-next-line
    current_price: arg.current_price,
    coinData: {
      prices: coinData.prices,
      total_volumes: coinData.total_volumes, //eslint-disable-line
    },
  };
  return newCoin;
};
export const fetchCoinData = createAsyncThunk(
  "selectedCoins/getCoinData",
  callCoinData
);
export const updateCoinData = createAsyncThunk(
  "selectedCoins/updateCoinData",
  callCoinData
);
const initialState: State = {
  selectedCoins: [],
  isLoading: false,
  error: false,
};
const selectedCoinsSlice = createSlice({
  name: "selectedCoins",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCoinData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCoinData.fulfilled, (state, action) => {
      state.isLoading = true;
      if (state.selectedCoins.length >= 3) {
        state.selectedCoins.shift();
      }
      state.selectedCoins.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(fetchCoinData.rejected, (state) => {
      state.isLoading = false;
      state.error = "Could't fetch coin...";
    });
    builder.addCase(updateCoinData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCoinData.fulfilled, (state, action) => {
      state.isLoading = true;
      state.selectedCoins = state.selectedCoins.map((coin) => {
        if (coin.id === action.payload.id) {
          coin = action.payload;
        }
        return coin;
      });
      state.isLoading = false;
    });
    builder.addCase(updateCoinData.rejected, (state) => {
      state.isLoading = false;
      state.error = "Could't update coin...";
    });
    builder.addCase(deselectCoin, (state, action) => {
      state.selectedCoins = state.selectedCoins.filter(
        (coin) => coin.id !== action.payload
      );
    });
  },
});
export default selectedCoinsSlice;
