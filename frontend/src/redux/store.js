import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReduce from "./slices/productsSlice"
import cartReduce from "./slices/cartSlice"
import checkoutReduce from "./slices/checkoutSlice"
import orderReduce from "./slices/orderSlice"
import adminReduce from "./slices/adminSlice"
import adminProductReduce from "./slices/adminProductSlice"
import adminOrderReduce from "./slices/adminOrderSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReduce,
    cart: cartReduce,
    checkout: checkoutReduce,
    orders: orderReduce,
    admin: adminReduce,
    adminProducts: adminProductReduce,
    adminOrders: adminOrderReduce,
  },
});

export default store;
