import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSpecialists } from '../../mocks/clinic';

export const fetchSpecialistsThunk = createAsyncThunk('clinic/fetchSpecialists', async () => {
  const specialists = await fetchSpecialists();
  return specialists;
});

const clinicSlice = createSlice({
  name: 'clinic',
  initialState: {
    specialists: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialistsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSpecialistsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.specialists = action.payload;
      })
      .addCase(fetchSpecialistsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default clinicSlice.reducer;