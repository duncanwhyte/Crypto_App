import { createSlice , createAsyncThunk, createAction } from "@reduxjs/toolkit";
export const changeOrder = createAction("coinTableList/changeOrder");
export const fetchCoinTableList = createAsyncThunk("coinTableList/fetchCoinTableList", async (arg, thunkApi) => {
    const {currentCurrency} = thunkApi.getState();
    const {coinTableList} = thunkApi.getState();
        const coinReq = await fetch(`https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q&vs_currency=${currentCurrency}${coinTableList.order && `&order=${coinTableList.order}`}&price_change_percentage=1h,24h,7d&per_page=${coinTableList.coinsToDisplay}`);
        const coinData = await coinReq.json();
        return coinData;
});
interface CoinTableListState {
    data: any[];
    isLoading: "idle" | "pending" | "success" | "failed";
    error: boolean | string;
    coinsToDisplay: number;
    order: string;
}
const initialState : CoinTableListState = {
    data: [],
    isLoading: "idle",
    error: false,
    coinsToDisplay: 10,
    order: "",
};
const coinTableListSlice = createSlice({
    name: "coinTableList",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchCoinTableList.pending, (state) => {
            state.isLoading = "pending";
        });
        builder.addCase(fetchCoinTableList.fulfilled, (state, action) => {
            state.isLoading = "success";
            state.data = action.payload;
            state.isLoading = "idle";
        });
        builder.addCase(fetchCoinTableList.rejected, (state) => {
            state.isLoading = "failed";
        });
        builder.addCase(changeOrder , (state, action) => {
            state.order = action.payload;
        });
        builder.addCase("coinTableList/callCoins", (state) => {
            state.coinsToDisplay += 10;
        });
    },
});
export default coinTableListSlice;