import {configureStore, ThunkAction, Action, Dispatch} from '@reduxjs/toolkit'
import {createWrapper} from "next-redux-wrapper";

import {intakeFormApiSlice} from "./store-slices/intake-form-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      [intakeFormApiSlice.reducerPath]: intakeFormApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(intakeFormApiSlice.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export const storeWrapper = createWrapper<AppStore>(makeStore);
