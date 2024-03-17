import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchGlobalData = createAsyncThunk("globalData/getGlobalData", async (arg, thunkApi) => {
    const {currentCurrency} = thunkApi.getState();
    const globalDataReq = await fetch("https://api.coingecko.com/api/v3/global?x_cg_pro_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q");
    const globalData = await globalDataReq.json();
    console.log(globalData);
});
const initialState = {
    isLoading: "idle",
    data: [],
};
const globalDataSlice = createSlice({
    name: "globalCoinData",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGlobalData.pending, (state) => {
            state.isLoading = "pending";
        });
        builder.addCase(fetchGlobalData.fulfilled, (state, action) => {
            state.isLoading = "success";
            state.data = action.payload;
            state.isLoading = "idle";
        });
        builder.addCase(fetchGlobalData.rejected, (state) => {
            state.isLoading = "failed";
        });
    }
});
export default globalDataSlice;