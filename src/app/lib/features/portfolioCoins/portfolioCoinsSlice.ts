import {
  CoinData,
  CoinToAdd,
  PortfolioCoin,
  PortfolioSliceState,
  UpdatedCoinArgument,
} from "@/app/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
export const callPortfolioCoinData = createAsyncThunk<PortfolioCoin, CoinToAdd>(
  "portfolioCoins/getPurchaseDate",
  async (arg) => {
    const date = arg.purchasedDate.split("-").reverse().join("-");
    const historicalDataReq = await fetch(
      `https://api.coingecko.com/api/v3/coins/${arg.coin.id}/history?date=${date}&x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
    );
    const historicalData: CoinData = await historicalDataReq.json();
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
export const callCurrentDateData = createAsyncThunk<
  CoinData[],
  void,
  { state: RootState }
>("portfolio/getCurrentPriceData", async (_, thunkApi) => {
  try {
    const { portfolioCoins } = thunkApi.getState();
    if (portfolioCoins.coins.length === 0) {
      return;
    }
    const ids: string[] = portfolioCoins.coins.map(
      (coin: PortfolioCoin) => coin.purchasedDateData.id
    );
    const uniqueIds: string[] = Array.from(new Set(ids));
    const currentDataReq = uniqueIds.map(async (id) => {
      const request = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
      );
      const response = await request.json();
      return response;
    });
    const currentDateData: CoinData[] = await Promise.all(currentDataReq);
    return currentDateData;
  } catch (error) {
    return error;
  }
});
export const updateCurrentCoinData = createAsyncThunk<
  PortfolioCoin,
  UpdatedCoinArgument,
  { state: RootState }
>("portfolio/updatePortfolioCoin", async (arg, thunkApi) => {
  try {
    const { portfolioCoins } = thunkApi.getState();
    const coinToUpdate = portfolioCoins.coins.filter(
      (coin: PortfolioCoin) => coin.uniqueId === arg.uniqueId
    );
    if (
      coinToUpdate[0].purchasedDateData.id !== arg.id ||
      coinToUpdate[0].purchasedDate !== arg.purchasedDate
    ) {
      const date = arg.purchasedDate.split("-").reverse().join("-");
      const historicalDataReq = await fetch(
        `https://api.coingecko.com/api/v3/coins/${arg.id}/history?date=${date}&x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q`
      );
      const historicalData = await historicalDataReq.json();
      const updatedCoin = {
        uniqueId: arg.uniqueId,
        id: arg.id,
        coinAmount: arg.coinAmount,
        purchasedDate: arg.purchasedDate,
        purchasedDateData: historicalData,
      };
      return updatedCoin;
    } else {
      const updatedCoin = {
        uniqueId: arg.uniqueId,
        id: coinToUpdate[0].id,
        coinAmount: arg.coinAmount,
        purchasedDate: coinToUpdate[0].purchasedDate,
        purchasedDateData: coinToUpdate[0].purchasedDateData,
      };
      return updatedCoin;
    }
  } catch (error) {
    return error;
  }
});
const initialState: PortfolioSliceState = {
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
      state.coins = state.coins.filter((coin) => coin.id !== action.payload);
    });
  },
});
export default portfolioCoinsSlice;
