import {  createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface CoinState {
    data: any[];
    isLoading: "idle" | "pending" | "success" | "failed";
    error: boolean | string;
    coinsToDisplay: number;
}
export const fetchCoinList = createAsyncThunk("coinList/getCoinList", async (arg, thunkApi) => {
    const {currentCurrency} = thunkApi.getState();
    const {coinList} = thunkApi.getState();
        const coinReq = await fetch(`https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q&vs_currency=${currentCurrency}&price_change_percentage=1h,24h,7d&per_page=${coinList.coinsToDisplay}`);
        const coinData = await coinReq.json();
        return coinData;
});
const initialState: CoinState = {
    data: [],
    isLoading: "idle",
    error: false,
    coinsToDisplay: 10,
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
    }
});
export default coinListSlice;