import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import addressReducer from "./addressSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    address: addressReducer,
  },
});
