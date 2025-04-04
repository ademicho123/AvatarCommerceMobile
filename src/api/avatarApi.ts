import apiClient from './apiClient';
import { Platform } from 'react-native';

interface AvatarResponse {
  avatar_id: string;
  message: string;
  asset_path: string;
}

interface InfluencerData {
  id: string;
  heygen_avatar_id: string;
  original_asset_path: string;
  voice_id: string;
}

/**
 * Creates a digital avatar using HeyGen API
 */
export const createAvatar = async (
  imageUri: string, 
  influencerId: string,
  fileName: string,
  mediaType: string
): Promise<AvatarResponse> => {
  // Create form data for file upload
  const formData = new FormData();
  
  // Format URI for different platforms
  const uri = Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;
  
  // Append media file
  formData.append('file', {
    uri: uri,
    name: fileName || 'avatar.jpg',
    type: mediaType || 'image/jpeg',
  } as any);
  
  formData.append('influencer_id', influencerId);
  
  // Make API request
  const response = await apiClient.post('/create-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

/**
 * Retrieves influencer data including avatar information
 */
export const getInfluencerData = async (influencerId: string): Promise<InfluencerData> => {
  const response = await apiClient.get(`/influencers/${influencerId}`);
  return response.data;
};