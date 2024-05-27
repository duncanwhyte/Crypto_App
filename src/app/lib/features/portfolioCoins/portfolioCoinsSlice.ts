import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const callPortfolioCoinData = createAsyncThunk(
  "portfolioCoins/getPurchaseDate",
  async (arg) => {
    const date = arg.purchasedDate.split("-").reverse().join("-");
    const historicalDataReq = await fetch(
      `https://api.coingecko.com/api/v3/coins/${arg.coin.id}/history?date=${date}&x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
    );
    const historicalData = await historicalDataReq.json();
    const newCoin = {
      id: Math.random() - Math.random(),
      coinAmount: arg.coinAmount,
      purchasedDateData: historicalData,
    };
    return newCoin;
  }
);
export const callCurrentDateData = createAsyncThunk(
  "portfolio/getCurrentPriceData",
  async (arg, thunkApi) => {
    const { portfolioCoins } = thunkApi.getState();
    const ids = portfolioCoins.coins.map((coin) => coin.purchasedDateData.id);
    const uniqueIds = Array.from(new Set(ids));
  }
);
const initialState = {
  isLoading: false,
  coins: [],
  error: false,
};
const portfolioCoinsSlice = createSlice({
  name: "portfolioCoins",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(callPortfolioCoinData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(callPortfolioCoinData.fulfilled, (state, action) => {
      state.coins = [...state.coins, action.payload];
      state.isLoading = false;
    });
    builder.addCase(callPortfolioCoinData.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(callCurrentDateData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(callCurrentDateData.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(callCurrentDateData.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase("portfolioCoins/removeCoin", (state, action) => {
      state.coins = state.coins.filter((coin) => coin.id !== action.payload);
    });
  },
});
export default portfolioCoinsSlice;
