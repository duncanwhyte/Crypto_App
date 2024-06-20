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
      uniqueId: Math.random() - Math.random(),
      id: arg.coin.id,
      coinAmount: arg.coinAmount,
      purchasedDate: arg.purchasedDate,
      purchasedDateData: historicalData,
    };
    return newCoin;
  }
);
export const callCurrentDateData = createAsyncThunk(
  "portfolio/getCurrentPriceData",
  async (arg, thunkApi) => {
    const { portfolioCoins } = thunkApi.getState();
    if (portfolioCoins.length === 0) {
      return;
    }
    const ids = portfolioCoins.coins.map((coin) => coin.purchasedDateData.id);
    const uniqueIds = Array.from(new Set(ids));
    const currentDataReq = uniqueIds.map(async (id) => {
      const request = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
      );
      const response = await request.json();
      return response;
    });
    const currentDateData = await Promise.all(currentDataReq);
    return currentDateData;
  }
);
export const updateCurrentCoinData = createAsyncThunk(
  "portfolio/updatePortfolioCoin",
  async (arg, thunkApi) => {
    const { portfolioCoins } = thunkApi.getState();
    const coinToUpdate = portfolioCoins.coins.filter(
      (coin) => coin.uniqueId === arg.uniqueId
    );
    const updatedCoin = {};
    if (
      coinToUpdate[0].purchasedDateData.id !== arg.id ||
      coinToUpdate[0].purchasedDate !== arg.date
    ) {
      const date = arg.date.split("-").reverse().join("-");
      const historicalDataReq = await fetch(
        `https://api.coingecko.com/api/v3/coins/${arg.id}/history?date=${date}&x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
      );
      const historicalData = await historicalDataReq.json();
      updatedCoin.uniqueId = arg.uniqueId;
      updatedCoin.id = arg.id;
      updatedCoin.coinAmount = arg.amount;
      updatedCoin.purchasedDate = arg.date;
      updatedCoin.purchasedDateData = historicalData;
      return updatedCoin;
    } else {
      updatedCoin.uniqueId = arg.uniqueId;
      updatedCoin.id = coinToUpdate[0].id;
      updatedCoin.coinAmount = arg.amount;
      updatedCoin.purchasedDate = coinToUpdate[0].purchasedDate;
      updatedCoin.purchasedDateData = coinToUpdate[0].purchasedDateData;
      return updatedCoin;
    }
  }
);
const initialState = {
  isLoading: false,
  coins: [],
  currentDateData: [],
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
    builder.addCase(callCurrentDateData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(callCurrentDateData.fulfilled, (state, action) => {
      state.currentDateData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(callCurrentDateData.rejected, (state) => {
      state.error = true;
      state.isLoading = false;
    });
    builder.addCase(updateCurrentCoinData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateCurrentCoinData.fulfilled, (state, action) => {
      const updatedCoins = state.coins.map((coin) => {
        if (coin.uniqueId === action.payload.uniqueId) {
          coin.coinAmount = action.payload.coinAmount;
          coin.purchasedDate = action.payload.purchasedDate;
          coin.purchasedDateData = action.payload.purchasedDateData;
        }
        return coin;
      });
      state.coins = updatedCoins;
      state.isLoading = false;
    });
    builder.addCase(updateCurrentCoinData.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
    builder.addCase("portfolioCoins/removeCoin", (state, action) => {
      state.coins = state.coins.filter(
        (coin) => coin.uniqueId !== action.payload
      );
    });
  },
});
export default portfolioCoinsSlice;
