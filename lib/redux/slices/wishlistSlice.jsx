// /lib/redux/slices/wishlistSlice.jsx
import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash'; // فرضاً lodash برای debouncing

const initialState = {
  wishlist: {
    products: [],
    ads: [],
    specialists: [],
    tenders: [],
  },
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { item, type } = action.payload;
      // اعتبارسنجی
      if (!item?.id || !type || !['products', 'ads', 'specialists', 'tenders'].includes(type)) {
        console.error('Invalid wishlist item or type:', { item, type });
        return;
      }
      if (!state.wishlist[type].some((i) => i.id === item.id)) {
        state.wishlist[type] = [...state.wishlist[type], item];
      }
      try {
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    },
    removeFromWishlist: (state, action) => {
      const { itemId, type } = action.payload;
      if (!itemId || !type) return;
      state.wishlist[type] = state.wishlist[type].filter((i) => i.id !== itemId);
      try {
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    },
    clearWishlist: (state, action) => {
      const { type } = action.payload;
      if (!type) return;
      state.wishlist[type] = [];
      try {
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
    },
    syncWishlist: (state, action) => {
      state.wishlist = action.payload || initialState.wishlist;
    },
    initializeWishlist: (state) => {
      try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || JSON.stringify(initialState.wishlist));
        state.wishlist = wishlist;
      } catch (error) {
        console.error('Error initializing wishlist:', error);
        state.wishlist = initialState.wishlist;
      }
    },
    updateWishlistItem: (state, action) => { // جدید
      const { item, type } = action.payload;
      if (!item?.id || !type) return;
      state.wishlist[type] = state.wishlist[type].map((i) =>
        i.id === item.id ? { ...i, ...item } : i
      );
      try {
        localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
        window.dispatchEvent(new Event('storage'));
      } catch (error) {
        console.error('Error updating wishlist:', error);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, syncWishlist, initializeWishlist, updateWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;

// SyncWishlist component
export function SyncWishlist() {
  const dispatch = useDispatch();

  const handleStorageChange = debounce((e) => {
    if (e.key === 'wishlist' || e.type === 'storage') {
      try {
        const newWishlist = JSON.parse(localStorage.getItem('wishlist') || JSON.stringify(initialState.wishlist));
        setTimeout(() => {
          dispatch(syncWishlist(newWishlist));
        }, 0);
      } catch (error) {
        console.error('Error syncing wishlist:', error);
      }
    }
  }, 100); // Debounce برای بهینه‌سازی

  useEffect(() => {
    dispatch(initializeWishlist());
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      handleStorageChange.cancel(); // Cleanup برای debounce
    };
  }, [dispatch]);

  return null;
}


