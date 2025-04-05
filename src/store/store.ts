// store.ts - Redux store and reducers
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { setAuthToken } from '../api/api';

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      setAuthToken(action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      setAuthToken(null);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

// Chat Slice
const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    loading: false
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setChatLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearChat: (state) => {
      state.messages = [];
    }
  }
});

// Products Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    recommendations: [],
    loading: false
  },
  reducers: {
    setRecommendations: (state, action) => {
      state.recommendations = action.payload;
    },
    setProductsLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

// Export actions
export const { setUser, logout, setLoading } = authSlice.actions;
export const { addMessage, setChatLoading, clearChat } = chatSlice.actions;
export const { setRecommendations, setProductsLoading } = productsSlice.actions;

// Configure store
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
    products: productsSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;