import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchProductBySlug } from '../../mocks/products';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const product = action.payload;
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity < product.stockQuantity) {
          existingItem.quantity += 1;
        } else {
          toast.error(`موجودی محصول ${product.title} کافی نیست`);
          return;
        }
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
      window.dispatchEvent(new Event('storage'));
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
      window.dispatchEvent(new Event('storage'));
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        const product = fetchProductBySlug(item.slug);
        if (item.quantity < product.stockQuantity) {
          item.quantity += 1;
          localStorage.setItem('cart', JSON.stringify(state.cart));
          window.dispatchEvent(new Event('storage'));
        } else {
          toast.error(`موجودی محصول ${item.title} کافی نیست`);
        }
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem('cart', JSON.stringify(state.cart));
        window.dispatchEvent(new Event('storage'));
      }
    },
    syncCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
      window.dispatchEvent(new Event('storage'));
    },
    initializeCart: (state) => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      state.cart = cart;
    },
  },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, syncCart, clearCart, initializeCart } = cartSlice.actions;

export default cartSlice.reducer;

export function SyncCart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCart());

    const handleStorageChange = (e) => {
      if (e.key === 'cart' || e.type === 'storage') {
        const newCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setTimeout(() => {
          dispatch(syncCart(newCart));
        }, 0);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [dispatch]);

  return null;
}


