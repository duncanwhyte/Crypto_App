import { configureStore, combineReducers } from "@reduxjs/toolkit";
import coinListSlice from "./features/coinList/coinListSlice";
import globalDataSlice from "./features/globalCoinData/globalDataSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import { currencyReducer } from "../lib/features/currency/currencySlice";
import { themeReducer } from "./features/theme/themeSlice";
import graphTimeDurationReducer from "./features/graphTimeDuration/graphTimeDurationSlice";
import selectedCoinsSlice from "./features/selectedCoins/selectedCoinsSlice";
import conversionCoinsSlice from "./features/conversionCoins/conversionCoinsSlice";
import coinTableListSlice from "./features/coinTableList/coinTableListSlice";
import portfolioCoinsSlice from "./features/portfolioCoins/portfolioCoinsSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem() {
      return Promise.resolve();
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["currentCurrency", "portfolioCoins"],
};
const rootReducer = {
  currentCurrency: currencyReducer,
  darkTheme: themeReducer,
  coinList: coinListSlice.reducer,
  coinTableList: coinTableListSlice.reducer,
  globalData: globalDataSlice.reducer,
  selectedCoins: selectedCoinsSlice.reducer,
  graphTimeDuration: graphTimeDurationReducer,
  conversionCoins: conversionCoinsSlice.reducer,
  portfolioCoins: portfolioCoinsSlice.reducer,
};
const userReducer = combineReducers(rootReducer);
export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return configureStore({
      reducer: userReducer,
      middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });
  } else {
    const persistedReducer = persistReducer(persistConfig, userReducer);
    const store = configureStore({
      reducer: persistedReducer,
    });
    return store;
  }
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
