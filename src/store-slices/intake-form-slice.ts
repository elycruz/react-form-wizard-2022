import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {IntakeFormData, UserData} from "../types";
import {USERS_SYMBOL} from "../constants";

export interface IntakeState {
  value?: IntakeFormData[]
}

export const intakeFormApiSlice = createApi({
  reducerPath: 'api/intake',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/intake'
  }),
  endpoints(builder) {
    return {
      intakeIndex: builder.query<IntakeFormData[], number | void>({
        query: (limit) => ({url: ``})
      })
    }
  }
});

export const intakeFormSlice = createSlice({
  name: USERS_SYMBOL,
  initialState: {
    value: null
  } as IntakeState,
  reducers: {
    /**
     * Takes one user, at a time, and updates users list.
     *
     * @param {IntakeState} state
     * @param {UserData} data
     */
    updateUser: (state: IntakeState, data: PayloadAction<UserData>) => {
      console.log(state);
    }
  }
});

export const {actions: {updateUser}} = intakeFormSlice;

export default intakeFormSlice.reducer;
