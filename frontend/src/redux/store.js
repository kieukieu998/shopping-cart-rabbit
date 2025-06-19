import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReduce from "./slices/productsSlice"
import cartReduce from "./slices/cartSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReduce,
    cart: cartReduce
  },
});

export default store;
