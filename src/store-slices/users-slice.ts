import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserData} from "../types";
import {USERS_SYMBOL} from "../constants";

export interface UsersState {
  value?: UserData[]
}

export const usersSlice = createSlice({
  name: USERS_SYMBOL,
  initialState: {
    value: null
  } as UsersState,
  reducers: {
    /**
     * Takes one user, at a time, and updates users list.
     *
     * @param {UsersState} state
     * @param {UserData} data
     */
    updateUser: (state: UsersState, data: PayloadAction<UserData>) => {
      console.log(state);
    }
  }
});

export const {actions: {updateUser}} = usersSlice;

export default usersSlice.reducer;
