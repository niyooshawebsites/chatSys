import { createSlice } from "@reduxjs/toolkit";

const loggedinUserSlice = createSlice({
  name: "loggedin_user_slice",
  initialState: [],
  reducers: {
    loggedin: (state, action) => {},
  },
});

const loggedinUserSliceReducers = loggedinUserSlice.reducer;
export const userSliceActions = loggedinUserSlice.actions;

export default loggedinUserSliceReducers;
