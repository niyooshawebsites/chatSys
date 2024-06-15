import { createSlice } from "@reduxjs/toolkit";

const loggedinUserSlice = createSlice({
  name: "loggedin_user_slice",
  initialState: {
    loggedinUsername: "",
  },
  reducers: {
    usersLoggedin: (state, action) => {
      state.loggedinUsername = action.payload.loggedinUsername;
    },
  },
});

const loggedinUserSliceReducers = loggedinUserSlice.reducer;
export const loggedinUserSliceActions = loggedinUserSlice.actions;

export default loggedinUserSliceReducers;
