import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/Product/Product-Slice';
import authReducer from '../features/auth/authslice'
import cartReducer from '../features/cart/CartSlice'
import orderReducer from '../features/order/orderSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
