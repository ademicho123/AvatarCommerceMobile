import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, launchCamera, ImagePickerResponse } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createAvatar } from '../../api/avatarApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AvatarCreateScreen = () => {
  const navigation = useNavigation();
  const [imageSource, setImageSource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get influencer ID from storage (would be set during login)
  const getInfluencerId = async () => {
    try {
      const id = await AsyncStorage.getItem('influencer_id');
      if (!id) {
        throw new Error('No influencer ID found');
      }
      return id;
    } catch (error) {
      console.error('Error getting influencer ID:', error);
      Alert.alert('Error', 'Please log in again to continue');
      return null;
    }
  };

  // Handle avatar image selection
  const selectImage = () => {
    const options = {
      title: 'Select Avatar Image',
      mediaType: 'photo',
      quality: 1,
      maxWidth: 1000,
      maxHeight: 1000,
    };

    Alert.alert(
      'Choose an option',
      'Would you like to take a photo or select from gallery?',
      [
        {
          text: 'Take Photo',
          onPress: () => openCamera(options),
        },
        {
          text: 'Select from Gallery',
          onPress: () => openGallery(options),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  // Open camera
  const openCamera = (options: any) => {
    launchCamera(options, handleImagePickerResponse);
  };

  // Open image gallery
  const openGallery = (options: any) => {
    launchImageLibrary(options, handleImagePickerResponse);
  };

  // Handle image picker response
  const handleImagePickerResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
      Alert.alert('Error', response.errorMessage || 'Unknown error occurred');
    } else if (response.assets && response.assets.length > 0) {
      const source = { uri: response.assets[0].uri };
      setImageSource(source);
    }
  };

  // Submit avatar creation
  const handleCreateAvatar = async () => {
    if (!imageSource?.uri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    const influencerId = await getInfluencerId();
    if (!influencerId) return;

    setIsLoading(true);
    
    try {
      const fileName = imageSource.uri.split('/').pop() || 'avatar.jpg';
      const mediaType = 'image/jpeg'; // Default to JPEG
      
      const result = await createAvatar(
        imageSource.uri,
        influencerId,
        fileName,
        mediaType
      );
      
      Alert.alert(
        'Success',
        'Your digital avatar has been created!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
      
    } catch (error) {
      console.error('Error creating avatar:', error);
      Alert.alert('Error', 'Failed to create avatar. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Your Digital Avatar</Text>
        <Text style={styles.subtitle}>
          Upload a clear photo of yourself to create your digital twin for product recommendations.
        </Text>
        
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={selectImage}
          disabled={isLoading}
        >
          {imageSource ? (
            <Image source={imageSource} style={styles.image} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Icon name="add-a-photo" size={50} color="#aaa" />
              <Text style={styles.placeholderText}>Tap to select image</Text>
            </View>
          )}
        </TouchableOpacity>
        
        <View style={styles.guidelines}>
          <Text style={styles.guidelineTitle}>Guidelines:</Text>
          <Text style={styles.guidelineText}>• Use a clear, well-lit photo</Text>
          <Text style={styles.guidelineText}>• Face should be clearly visible</Text>
          <Text style={styles.guidelineText}>• Neutral expression works best</Text>
          <Text style={styles.guidelineText}>• Solid background recommended</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.createButton, (!imageSource || isLoading) && styles.disabledButton]}
          onPress={handleCreateAvatar}
          disabled={!imageSource || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.createButtonText}>Create Avatar</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  imageContainer: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 10,
    color: '#999',
  },
  guidelines: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  guidelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  createButton: {
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AvatarCreateScreen;