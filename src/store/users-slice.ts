import {createSlice} from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: null
  },
  reducers: {
    add: state => {
      console.log(state);
    },
    update: state => {
      console.log(state);
    },
  }
});
