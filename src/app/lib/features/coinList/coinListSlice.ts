import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchCoinList = createAsyncThunk("coinList/getCoinList", async (arg: string, thunkApi) => {
    const {currentCurrency} = thunkApi.getState();
    if (arg === "navbar") {
        const coinReq = await fetch(`https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q&vs_currency=${currentCurrency}&price_change_percentage=1h,24h,7d`);
        const coinData = await coinReq.json();
        return coinData;
    } else {
        const coinReq = await fetch(`https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q&vs_currency=${currentCurrency}&price_change_percentage=1h,24h,7d&per_page=9`);
        const coinData = await coinReq.json();
        return coinData;
    }
});
interface CoinState {
    data: any[];
    isLoading: "idle" | "pending" | "success" | "failed";
    error: boolean | string;
}
const initialState: CoinState = {
    data: [],
    isLoading: "idle",
    error: false
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
    }
});
export default coinListSlice;