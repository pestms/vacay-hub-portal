
import { createSlice, PayloadAction } from '@reduxjs/toolkit/dist/createSlice';
import { AuthState, User } from '../types';

// Mock function to simulate loading user from localStorage
const loadUserFromStorage = (): { user: User | null, token: string | null } => {
  try {
    const userString = localStorage.getItem('user');
    const tokenString = localStorage.getItem('token');
    return {
      user: userString ? JSON.parse(userString) : null,
      token: tokenString || null
    };
  } catch {
    return { user: null, token: null };
  }
};

const { user, token } = loadUserFromStorage();

const initialState: AuthState = {
  user,
  token,
  isAuthenticated: Boolean(user && token),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { loginStart, loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;
