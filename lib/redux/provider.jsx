'use client';

import { Provider } from 'react-redux';
import store from './store';
import { SyncCart } from './slices/cartSlice';
import { SyncWishlist } from './slices/wishlistSlice';

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <SyncCart />
      <SyncWishlist />
      {children}
    </Provider>
  );
}

