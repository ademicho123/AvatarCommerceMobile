import apiClient from './apiClient';

interface ChatResponse {
  text: string;
  video_url: string;
}

/**
 * Sends a message to the chatbot and receives a response with video
 */
export const sendChatMessage = async (
  message: string,
  influencerId: string
): Promise<ChatResponse> => {
  const response = await apiClient.post('/chat', {
    message,
    influencer_id: influencerId
  });
  
  return response.data;
};

/**
 * Retrieves product recommendations based on query
 */
export const getProductRecommendations = async (
  query: string,
  influencerId: string
): Promise<ChatResponse> => {
  // The backend handles this through the same /chat endpoint
  // Just prepend "recommend" to the query as per the backend logic
  const message = `recommend ${query}`;
  
  const response = await apiClient.post('/chat', {
    message,
    influencer_id: influencerId
  });
  
  return response.data;
};