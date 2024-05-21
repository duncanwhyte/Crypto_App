import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const callPortfolioCoinData = createAsyncThunk(
  "portfolioCoins/getPurchaseDate",
  async (arg) => {
    const date = arg.purchasedDate.split("-").reverse().join("-");
    const historicalDataReq = await fetch(
      `https://api.coingecko.com/api/v3/coins/${arg.coin.id}/history?date=${date}&x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
    );
    const currentDataReq = await fetch(
      `https://api.coingecko.com/api/v3/coins/${arg.coin.id}?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
    );
    const historicalData = await historicalDataReq.json();
    const currentData = await currentDataReq.json();
    const newCoin = {
      id: Math.random() - Math.random(),
      purchasedDate: arg.purchasedDate,
      coinAmount: arg.coinAmount,
      currentDateData: currentData,
      purchasedDateData: historicalData,
    };
    return newCoin;
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
  },
});
export default portfolioCoinsSlice;
