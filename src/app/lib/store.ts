import { configureStore } from "@reduxjs/toolkit";
import coinListSlice from "./features/coinList/coinListSlice";
import {currencyReducer} from "../lib/features/currency/currencySlice";
import { themeReducer } from "./features/theme/themeSlice";
export const makeStore = () => {
    return configureStore({
        reducer: {
            currentCurrency: currencyReducer,
            darkTheme: themeReducer,
            coinList: coinListSlice.reducer
        },
    } );
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];