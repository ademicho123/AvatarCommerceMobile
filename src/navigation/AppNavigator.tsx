import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

// Influencer Screens
import DashboardScreen from '../screens/influencer/DashboardScreen';
import AvatarCreateScreen from '../screens/influencer/AvatarCreateScreen';
import StatisticsScreen from '../screens/influencer/StatisticsScreen';

// Customer Screens
import ChatScreen from '../screens/customer/ChatScreen';
import ProductsScreen from '../screens/customer/ProductsScreen';

// Settings
import SettingsScreen from '../screens/settings/SettingsScreen';

// Types
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type InfluencerTabParamList = {
  Dashboard: undefined;
  CreateAvatar: undefined;
  Statistics: undefined;
  Settings: undefined;
};

export type CustomerTabParamList = {
  Products: undefined;
  Chat: { influencerId: string };
  Settings: undefined;
};

// Create stacks/tabs
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const InfluencerTab = createBottomTabNavigator<InfluencerTabParamList>();
const CustomerTab = createBottomTabNavigator<CustomerTabParamList>();
const RootStack = createNativeStackNavigator();

// Auth Stack Navigator
const AuthNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

// Influencer Tab Navigator
const InfluencerNavigator = () => {
  return (
    <InfluencerTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'CreateAvatar') {
            iconName = 'person-add';
          } else if (route.name === 'Statistics') {
            iconName = 'bar-chart';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Icon name={iconName || 'circle'} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0066cc',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <InfluencerTab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Dashboard' }}
      />
      <InfluencerTab.Screen
        name="CreateAvatar"
        component={AvatarCreateScreen}
        options={{ title: 'Create Avatar' }}
      />
      <InfluencerTab.Screen
        name="Statistics"
        component={StatisticsScreen}
        options={{ title: 'Statistics' }}
      />
      <InfluencerTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </InfluencerTab.Navigator>
  );
};

// Customer Tab Navigator
const CustomerNavigator = () => {
  return (
    <CustomerTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Products') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Chat') {
            iconName = 'chat';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Icon name={iconName || 'circle'} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0066cc',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <CustomerTab.Screen
        name="Products"
        component={ProductsScreen}
        options={{ title: 'Products' }}
      />
      <CustomerTab.Screen
        name="Chat"
        component={ChatScreen}
        initialParams={{ influencerId: 'default_influencer' }}
        options={{ title: 'Chat with Avatar' }}
      />
      <CustomerTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </CustomerTab.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  // This could be determined by checking authentication status
  const isAuthenticated = false; // Placeholder, would be from auth state
  const userType = 'influencer'; // Placeholder, would be from user data

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : userType === 'influencer' ? (
          <RootStack.Screen name="InfluencerApp" component={InfluencerNavigator} />
        ) : (
          <RootStack.Screen name="CustomerApp" component={CustomerNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;