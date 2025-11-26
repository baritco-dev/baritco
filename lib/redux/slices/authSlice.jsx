import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    // شبیه‌سازی API ورود
    if (email === 'test@bariteco.ir' && password === 'password123') {
      return { id: 1, email, name: 'کاربر تست' };
    }
    return rejectWithValue('ایمیل یا رمز عبور اشتباه است');
  } catch (error) {
    return rejectWithValue('خطا در ورود');
  }
});

export const register = createAsyncThunk('auth/register', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    // شبیه‌سازی API ثبت‌نام
    return { id: Date.now(), name, email };
  } catch (error) {
    return rejectWithValue('خطا در ثبت‌نام');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;