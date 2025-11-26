import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrganizations } from '../../mocks/organizations';

export const fetchOrganizationsThunk = createAsyncThunk('organization/fetchOrganizations', async () => {
  const organizations = await fetchOrganizations();
  return organizations;
});

const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    organizations: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrganizationsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.organizations = action.payload;
      })
      .addCase(fetchOrganizationsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default organizationSlice.reducer;