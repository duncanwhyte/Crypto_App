import { configureStore } from "@reduxjs/toolkit";
import {currencyReducer} from "../lib/features/currency/currencySlice";
export const makeStore = () => {
    return configureStore({
        reducer: {
            currentCurrency: currencyReducer
        }
    });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];