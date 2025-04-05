// navigation.tsx - All navigation logic
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { LoginScreen, SignupScreen } from '../screens/auth_screens';
import { ChatScreen, ProductsScreen } from '../screens/customer_screens';
import { AvatarCreateScreen, DashboardScreen, StatisticsScreen } from '../screens/influencer_screens';
import { SettingsScreen } from '../screens/settings_screens';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

// Customer Tab Navigator
const CustomerTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Chat') {
          iconName = focused ? 'chatbubble' : 'chatbubble-outline';
        } else if (route.name === 'Products') {
          iconName = focused ? 'cart' : 'cart-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Products" component={ProductsScreen} />
  </Tab.Navigator>
);

// Influencer Tab Navigator
const InfluencerTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Dashboard') {
          iconName = focused ? 'grid' : 'grid-outline';
        } else if (route.name === 'Avatar') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Statistics') {
          iconName = focused ? 'stats-chart' : 'stats-chart-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Avatar" component={AvatarCreateScreen} />
    <Tab.Screen name="Statistics" component={StatisticsScreen} />
    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
);

// Main Navigator
export const AppNavigator = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  
  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthNavigator />
      ) : (
        user.isInfluencer ? <InfluencerTabNavigator /> : <CustomerTabNavigator />
      )}
    </NavigationContainer>
  );
};