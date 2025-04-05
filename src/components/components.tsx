// components.tsx - All reusable components
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Video from 'react-native-video';

// Chat Bubble Component
export const ChatBubble = ({ message, isUser }) => (
  <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
    <Text style={styles.messageText}>{message}</Text>
  </View>
);

// Product Item Component
export const ProductItem = ({ product, onPress }) => (
  <TouchableOpacity style={styles.productItem} onPress={onPress}>
    <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
    <View style={styles.productInfo}>
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
    </View>
  </TouchableOpacity>
);

// Video Player Component
export const VideoPlayer = ({ videoUrl }) => (
  <View style={styles.videoContainer}>
    <Video
      source={{ uri: videoUrl }}
      style={styles.video}
      controls={true}
      resizeMode="contain"
    />
  </View>
);

// Button Component
export const Button = ({ title, onPress, type = 'primary' }) => (
  <TouchableOpacity 
    style={[styles.button, type === 'secondary' ? styles.secondaryButton : styles.primaryButton]} 
    onPress={onPress}
  >
    <Text style={[styles.buttonText, type === 'secondary' ? styles.secondaryButtonText : styles.primaryButtonText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

// Input Component
export const Input = ({ placeholder, value, onChangeText, secureTextEntry = false }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

// Styles
const styles = StyleSheet.create({
  // Common styles
  bubble: {
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  
  // Product styles
  productItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  productInfo: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  
  // Video styles
  videoContainer: {
    width: '100%',
    aspectRatio: 16/9,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
  
  // Button styles
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: 'white',
  },
  secondaryButtonText: {
    color: '#007AFF',
  },
  
  // Input styles
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
});