import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReduce from "./slices/productsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReduce
  },
});

export default store;
