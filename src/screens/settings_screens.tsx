import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/store';
import { RootState } from '../App';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  
  // State for settings toggles
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  
  // Handle toggle changes
  const toggleNotifications = () => setNotificationsEnabled(prev => !prev);
  const toggleDarkMode = () => setDarkModeEnabled(prev => !prev);
  const toggleBiometric = () => setBiometricEnabled(prev => !prev);
  
  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => dispatch(logout()),
          style: 'destructive',
        },
      ]
    );
  };
  
  // Render a settings item with a toggle switch
  const renderToggleSetting = (
    title: string,
    description: string,
    value: boolean,
    onToggle: () => void,
    iconName: string
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIconContainer}>
        <Icon name={iconName} size={24} color="#0066cc" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#e0e0e0', true: '#bbd6fb' }}
        thumbColor={value ? '#0066cc' : '#f5f5f5'}
      />
    </View>
  );
  
  // Render a settings item with an arrow
  const renderNavigationSetting = (
    title: string,
    description: string,
    onPress: () => void,
    iconName: string
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingIconContainer}>
        <Icon name={iconName} size={24} color="#0066cc" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* User profile section */}
        <View style={styles.profileSection}>
          <Image
            source={require('../../assets/images/placeholder.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'email@example.com'}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={20} color="#0066cc" />
          </TouchableOpacity>
        </View>
        
        {/* Settings sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          
          {renderToggleSetting(
            'Notifications',
            'Receive updates and alerts',
            notificationsEnabled,
            toggleNotifications,
            'notifications'
          )}
          
          {renderToggleSetting(
            'Dark Mode',
            'Switch to dark theme',
            darkModeEnabled,
            toggleDarkMode,
            'nightlight'
          )}
          
          {renderToggleSetting(
            'Biometric Login',
            'Use fingerprint or face recognition',
            biometricEnabled,
            toggleBiometric,
            'fingerprint'
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          {renderNavigationSetting(
            'Personal Information',
            'Manage your personal details',
            () => {},
            'person'
          )}
          
          {renderNavigationSetting(
            'Security',
            'Password and authentication',
            () => {},
            'lock'
          )}
          
          {user?.userType === 'influencer' && renderNavigationSetting(
            'API Keys',
            'Manage integration keys',
            () => {},
            'vpn-key'
          )}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          {renderNavigationSetting(
            'Help Center',
            'Get help with the app',
            () => {},
            'help'
          )}
          
          {renderNavigationSetting(
            'Privacy Policy',
            'Read our privacy policy',
            () => {},
            'privacy-tip'
          )}
          
          {renderNavigationSetting(
            'Terms of Service',
            'Read our terms of service',
            () => {},
            'description'
          )}
        </View>
        
        {/* Logout button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Icon name="logout" size={20} color="#f44336" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        {/* App version */}
        <Text style={styles.versionText}>AvatarCommerce v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 8,
  },
  section: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 20,
    marginVertical: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f44336',
  },
  versionText: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
    fontSize: 12,
    color: '#999',
  },
});

export default SettingsScreen;