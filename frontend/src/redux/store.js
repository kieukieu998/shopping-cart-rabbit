import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReduce from "./slices/productsSlice"
import cartReduce from "./slices/cartSlice"
import checkoutReduce from "./slices/checkoutSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReduce,
    cart: cartReduce,
    checkout: checkoutReduce
  },
});

export default store;
