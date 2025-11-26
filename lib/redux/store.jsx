import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import adReducer from './slices/adSlice';
import authReducer from './slices/authSlice';
import clinicReducer from './slices/clinicSlice';
import organizationReducer from './slices/organizationSlice';
import wishlistReducer from './slices/wishlistSlice';

export default configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    ads: adReducer,
    auth: authReducer,
    clinic: clinicReducer,
    organization: organizationReducer,
    wishlist: wishlistReducer,
  },
});

