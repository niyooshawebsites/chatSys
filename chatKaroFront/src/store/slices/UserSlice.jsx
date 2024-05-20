import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user_slice",
  initialState: {
    username: "",
    userEmail: "",
    userPassword: "",
  },
  reducers: {
    signup: (state, action) => {
      console.log("Signup successful");
      console.log(action.payload);
      state.username = action.payload.username;
      state.userEmail = action.payload.userEmail;
      state.userPassword = action.payload.userPassword;
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
