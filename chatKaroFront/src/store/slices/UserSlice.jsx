import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user_slice",
  initialState: {
    username: "",
    userEmail: "",
  },
  reducers: {
    signup: (state, action) => {
      state.username = action.payload.username;
      state.userEmail = action.payload.userEmail;
    },
  },
});

const usersliceReducers = userSlice.reducer;
export const userSliceActions = userSlice.actions;

export default usersliceReducers;
