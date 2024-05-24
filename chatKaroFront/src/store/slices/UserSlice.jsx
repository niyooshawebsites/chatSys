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

    login: (state) => {
      console.log("Login successful");
    },

    logout: (state) => {
      console.log("Logout successful");
    },
  },
});

const usersliceReducers = userSlice.reducer;
export const userSliceActions = userSlice.actions;

export default usersliceReducers;
