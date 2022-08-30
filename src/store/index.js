import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import orderSlice from "../slices/orderSlice";

// Initial Store configuration for connecting redux-toolkit
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    order: orderSlice.reducer,
  },
});



export default store;
