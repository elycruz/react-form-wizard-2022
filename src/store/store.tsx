import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import {usersSlice} from "./users-slice";

export function makeStore() {
  return configureStore({
    reducer: {
      users: usersSlice.reducer
    },
  })
}

const store = makeStore();

store.subscribe(() => console.log(store.getState()));

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

store.dispatch(usersSlice.actions.add();

export default store
