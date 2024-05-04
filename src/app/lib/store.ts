import { configureStore } from "@reduxjs/toolkit";
import coinListSlice from "./features/coinList/coinListSlice";
import globalDataSlice from "./features/globalCoinData/globalDataSlice";
import {currencyReducer} from "../lib/features/currency/currencySlice";
import { themeReducer } from "./features/theme/themeSlice";
import graphTimeDurationReducer from "./features/graphTimeDuration/graphTimeDurationSlice";
import selectedCoinsSlice from "./features/selectedCoins/selectedCoinsSlice";
import conversionCoinsSlice from "./features/conversionCoins/conversionCoinsSlice";
import coinTableListSlice from "./features/coinTableList/coinTableListSlice";
export const makeStore = () => {
    return configureStore({
        reducer: {
            currentCurrency: currencyReducer,
            darkTheme: themeReducer,
            coinList: coinListSlice.reducer,
            coinTableList: coinTableListSlice.reducer,
            globalData: globalDataSlice.reducer,
            selectedCoins: selectedCoinsSlice.reducer,
            graphTimeDuration: graphTimeDurationReducer,
            conversionCoins: conversionCoinsSlice.reducer
        },
    } );
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];