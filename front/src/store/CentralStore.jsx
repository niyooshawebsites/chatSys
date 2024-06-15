import { configureStore } from "@reduxjs/toolkit";
import usersliceReducers from "./slices/UserSlice";
import loggedinUserSliceReducers from "./slices/LoggedinUserSlice";

const centralStore = configureStore({
  reducer: {
    user_slice: usersliceReducers,
    loggedin_user_slice: loggedinUserSliceReducers,
  },
});

export default centralStore;
