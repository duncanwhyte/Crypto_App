import handleCoinDates from "@/app/utils/handleCoinDates";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface State {
    selectedCoins: any[],
    isLoading: boolean,
    error: boolean | string
}
const deselectCoin = createAction<string>("selectedCoins/deselectCoin");
export const fetchCoinData = createAsyncThunk("selectedCoins/getCoinData", async (arg: string, thunkApi: any) => {
    const {currentCurrency} = thunkApi.getState();
    const [currentTime, pastTime] = handleCoinDates();
    const coinDataReq = await fetch(`https://api.coingecko.com/api/v3/coins/${arg}/market_chart/range?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q&vs_currency=${currentCurrency}&from=${pastTime}&to=${currentTime}`);
    const coinData = await coinDataReq.json();
    const newCoin = {
        id: arg,
        coinData
    };
    return newCoin;
});
const initialState : State = {
    selectedCoins: [],
    isLoading: false,
    error: false,
};
const selectedCoinsSlice = createSlice({
    name: "selectedCoins",
    initialState: initialState,
    reducers: {
    },
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
        builder.addCase(deselectCoin, (state, action) => {
            state.selectedCoins = state.selectedCoins.filter((coin) => coin.id !== action.payload);
        });
    },
});
export default selectedCoinsSlice;