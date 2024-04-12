import { createSlice} from "@reduxjs/toolkit";
export const initialState = {
    graphTimeDuration: 1,
};
const graphTimeDurationSlice = createSlice({
    name: "graphTimeDuration",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase("oneHour", (state) => {
            state.graphTimeDuration = 0.0416666666666667;
        });
        builder.addCase("oneDay", (state) => {
            state.graphTimeDuration = 1;
        });
        builder.addCase("sevenDay", (state) => {
            state.graphTimeDuration = 7;
        });
        builder.addCase("fourteenDays", (state) => {
            state.graphTimeDuration = 14;
        });
        builder.addCase("oneMonth", (state) => {
            state.graphTimeDuration = 31;
        });
        builder.addCase("oneYear", (state) => {
            state.graphTimeDuration = 365;
        });
    }
});
export default graphTimeDurationSlice.reducer;