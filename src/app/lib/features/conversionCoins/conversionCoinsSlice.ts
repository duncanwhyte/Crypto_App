import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import handleCoinDates from "@/app/utils/handleCoinDates";
const initialState = {
    conversionCoins: {
        sellingCoin: null,
        buyingCoin: null
    },
    isLoading: "idle",
    error: false,
};
const callConversionData = async (arg, thunkApi) => {
    const {currentCurrency} = thunkApi.getState();
    const {graphTimeDuration} = thunkApi.getState();
    const [currentTime, pastTime] = handleCoinDates(graphTimeDuration.graphTimeDuration);
    const coinDataReq = await fetch(`https://api.coingecko.com/api/v3/coins/${arg.id}/market_chart/range?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q&vs_currency=${currentCurrency}&from=${pastTime}&to=${currentTime}`);
    const coinData = await coinDataReq.json();
    return {
        name: arg.name,
        prices: coinData.prices
    };
};
export const fetchSellingCoinData = createAsyncThunk("conversionCoins/getSellingCoinPrices", callConversionData);
export const fetchBuyingCoinData = createAsyncThunk("conversionCoins/getBuyingCoinPrices", callConversionData);
const conversionCoinsSlice = createSlice({
    name: "conversionCoins",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSellingCoinData.pending, (state) => {
            state.isLoading = "pending";
        });
        builder.addCase(fetchSellingCoinData.fulfilled, (state,action) => {
            state.isLoading = "success";
            state.conversionCoins.sellingCoin = action.payload;
            state.isLoading = "idle";
        });
        builder.addCase(fetchSellingCoinData.rejected, (state) => {
            state.isLoading = "idle";
            state.error = true;
        });
        builder.addCase(fetchBuyingCoinData.pending, (state) => {
            state.isLoading = "pending";
        });
        builder.addCase(fetchBuyingCoinData.fulfilled, (state,action) => {
            state.isLoading = "success";
            state.conversionCoins.buyingCoin = action.payload;
            state.isLoading = "idle";
        });
        builder.addCase(fetchBuyingCoinData.rejected, (state) => {
            state.isLoading = "idle";
            state.error = true;
        });
    }
});
export default conversionCoinsSlice;