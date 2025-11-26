
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/products';

export const getProducts = createAsyncThunk('products/fetch', async () => {
  const response = await fetchProducts();
  return response;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    comparison: [],
    isModalOpen: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    addToComparison: (state, action) => {
      if (state.comparison.length < 4 && !state.comparison.some((item) => item.id === action.payload.id)) {
        state.comparison.push(action.payload);
      }
    },
    removeFromComparison: (state, action) => {
      state.comparison = state.comparison.filter((item) => item.id !== action.payload);
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToComparison, removeFromComparison, setModalOpen } = productSlice.actions;
export default productSlice.reducer;

