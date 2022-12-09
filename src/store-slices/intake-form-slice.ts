import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

import {IntakeFormData} from "../types";

export interface IntakeState {
  value?: IntakeFormData[]
}

export const intakeFormApiSlice = createApi({
  reducerPath: 'api/intake',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/intake-form'
  }),
  endpoints(builder) {
    return {
      intakeIndex: builder.query<IntakeFormData[], number | void>({
        query: (limit) => ({url: ``})
      }),
    }
  }
});

export const {useIntakeIndexQuery} = intakeFormApiSlice;
