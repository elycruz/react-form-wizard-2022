import {configureStore, ThunkAction, Action, Dispatch} from '@reduxjs/toolkit'
import {USERS_SYMBOL} from "./constants";
import {log} from "./utils";
// import {createWrapper} from "next-redux-wrapper";
import {intakeFormApiSlice} from "./store-slices/intake-form-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      [intakeFormApiSlice.reducerPath]: intakeFormApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(intakeFormApiSlice.middleware)
  });
}

export type AppStore = ReturnType<typeof makeStore>;

export type AppState = ReturnType<AppStore['getState']>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

const store = makeStore();

// store.dispatch(updateUser(null));

store.subscribe(() => state => log('store state: ', structuredClone(state)));

export type AppDispatch = typeof store.dispatch;

export default store;

// export const storeWrapper = createWrapper<AppStore>(makeStore);
