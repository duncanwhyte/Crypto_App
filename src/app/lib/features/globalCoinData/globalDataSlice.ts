import { GlobalDataResponse } from "@/app/types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const fetchGlobalData = createAsyncThunk(
  "globalData/getGlobalData",
  async () => {
    const globalDataReq = await fetch(
      "https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=CG-BGo9877QbEt6dRKHM2YL7z2q"
    );
    const globalData = await globalDataReq.json();
    return globalData;
  }
);
interface State {
  isLoading: "idle" | "pending" | "success" | "failed";
  data: GlobalDataResponse[];
  error: boolean | string;
}
const initialState: State = {
  isLoading: "idle",
  data: [],
  error: false,
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
      state.error = "Global Data Not Found...";
    });
  },
});
export default globalDataSlice;
