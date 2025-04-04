import React, { useEffect, useState } from 'react';
import { StatusBar, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import authReducer, { restoreAuth } from './store/authSlice';
import AppNavigator from './navigation/AppNavigator';

// Create Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here as needed
  },
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const App = () => {
  const [isReady, setIsReady] = useState(false);

  // Check for existing authentication on app start
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get stored auth data
        const token = await AsyncStorage.getItem('auth_token');
        const userData = await AsyncStorage.getItem('user_data');

        if (token && userData) {
          // Restore auth state if token and user data exist
          store.dispatch(
            restoreAuth({
              token,
              user: JSON.parse(userData),
            })
          );
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
      } finally {
        // Set app as ready regardless of auth state
        setIsReady(true);
      }
    };

    checkAuth();
  }, []);

  // Show loading screen while checking auth
  if (!isReady) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066cc" />
        <Text style={styles.loadingText}>Loading AvatarCommerce...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default App;