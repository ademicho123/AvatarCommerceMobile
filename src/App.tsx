// App.tsx - Main app component
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { AppNavigator } from './navigation/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from './store/store';

const App = () => {
  useEffect(() => {
    // Check for stored user data on app load
    const checkUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          store.dispatch(setUser(JSON.parse(userData)));
        }
      } catch (error) {
        console.log('Error restoring user session:', error);
      }
    };
    
    checkUser();
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </Provider>
  );
};

export default App;