import { configureStore } from "@reduxjs/toolkit";
import usersliceReducers from "./slices/UserSlice";

const centralStore = configureStore({
  reducer: {
    user_slice: usersliceReducers,
  },
});

export default centralStore;
