import {configureStore, ThunkAction, Action, Dispatch} from '@reduxjs/toolkit'
import usersReducer, {updateUser, UsersState} from "./store-slices/users-slice";
import {USERS_SYMBOL} from "./constants";
// import {createWrapper} from "next-redux-wrapper";

export function makeStore() {
  return configureStore({
    reducer: {
      [USERS_SYMBOL]: usersReducer
    },
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

store.dispatch(updateUser(null));

export type AppDispatch = typeof store.dispatch;

export default store;

// export const storeWrapper = createWrapper<AppStore>(makeStore);
