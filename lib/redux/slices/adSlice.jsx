
import { createSlice } from '@reduxjs/toolkit';

const adSlice = createSlice({
  name: 'ads',
  initialState: {
    ads: [],
  },
  reducers: {
    setAds: (state, action) => {
      state.ads = action.payload;
    },
  },
});

export const { setAds } = adSlice.actions;
export default adSlice.reducer;
