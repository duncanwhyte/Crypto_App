import { createAction, createReducer } from "@reduxjs/toolkit";
export const changeTheme = createAction<boolean>("theme/change");
const initialDarkTheme: boolean = true;
export const themeReducer = createReducer(initialDarkTheme, (builder) => {
    builder.addCase(changeTheme, (state) => state = !state);
});
