// auth_screens.tsx - Login and Signup screens
import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../api/api';
import { Button, Input } from '../components/components';
import { setUser } from '../store/store';

// Login Screen
export const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({ username, password });
      dispatch(setUser(response.data.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Login Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <Text style={styles.title}>Login</Text>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title={loading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          disabled={loading}
        />
        <Button
          title="Create Account"
          onPress={() => navigation.navigate('Signup')}
          type="secondary"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Signup Screen
export const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({ username, email, password });
      Alert.alert('Success', 'Account created successfully', [
        { text: 'Login', onPress: () => navigation.navigate('Login') }
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Registration Failed', error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        <Text style={styles.title}>Create Account</Text>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title={loading ? "Creating Account..." : "Sign Up"}
          onPress={handleSignup}
          disabled={loading}
        />
        <Button
          title="Back to Login"
          onPress={() => navigation.navigate('Login')}
          type="secondary"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});