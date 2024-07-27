import { createAction, createReducer } from "@reduxjs/toolkit";
export const changeCurrency = createAction<string>("currency/change");
const initialCurrency: string = "usd";
export const currencyReducer = createReducer(initialCurrency, (builder) => {
  builder.addCase(changeCurrency, (state, action) => (state = action.payload));
});
