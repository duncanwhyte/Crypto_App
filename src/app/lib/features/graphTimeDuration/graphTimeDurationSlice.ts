import { createSlice, createAction} from "@reduxjs/toolkit";
const oneDay = createAction("oneDay");
const sevenDay = createAction("sevenDay");
const oneMonth = createAction("oneMonth");
const oneYear = createAction("oneYear");
const maxTime = createAction("maxTime");
const initialState = {
    graphTimeDuration: 1,
};
const graphTimeDurationSlice = createSlice({
    name: "graphTimeDuration",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(oneDay, (state) => {
            state.graphTimeDuration = 1;
        });
        builder.addCase(sevenDay, (state) => {
            state.graphTimeDuration = 7;
        });
        builder.addCase(oneMonth, (state) => {
            state.graphTimeDuration = 31;
        });
        builder.addCase(oneYear, (state) => {
            state.graphTimeDuration = 365;
        });
        builder.addCase(maxTime, (state) => {
            state.graphTimeDuration = 730;
        });
    }
});
export default graphTimeDurationSlice.reducer;