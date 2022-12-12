import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {IntakeFormData} from "../types";
import {HYDRATE} from "next-redux-wrapper";
import {createAsyncThunk} from "@reduxjs/toolkit";

export interface IntakeState {
  value?: IntakeFormData[]
}

export const intakeFormApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api'
  }),
  endpoints(builder) {
    return {
      intakeIndex: builder.query<IntakeFormData[], number | void>({
        query: (limit) => ({url: `intake-form`})
      }),
    }
  },
  extractRehydrationInfo(action, {reducerPath}) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
});

export const getIntakeIndex = createAsyncThunk('api/intakeIndex', () => fetch(`/api/intake-form`, {})
  .then(resp => resp.json()));

export const {useIntakeIndexQuery} = intakeFormApiSlice;
