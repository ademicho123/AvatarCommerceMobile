import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  email: string;
  name: string;
  userType: 'influencer' | 'customer';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
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
      state.error = null;
      
      // Save auth data to AsyncStorage
      AsyncStorage.setItem('auth_token', action.payload.token);
      AsyncStorage.setItem('user_data', JSON.stringify(action.payload.user));
      
      // If user is influencer, store influencer ID for easy access
      if (action.payload.user.userType === 'influencer') {
        AsyncStorage.setItem('influencer_id', action.payload.user.id);
      }
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      // Clear auth data from AsyncStorage
      AsyncStorage.removeItem('auth_token');
      AsyncStorage.removeItem('user_data');
      AsyncStorage.removeItem('influencer_id');
    },
    clearError: (state) => {
      state.error = null;
    },
    restoreAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  restoreAuth,
} = authSlice.actions;

export default authSlice.reducer;