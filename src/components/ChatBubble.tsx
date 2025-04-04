import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  videoUrl?: string;
}

interface ChatBubbleProps {
  message: Message;
  onVideoPress?: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onVideoPress }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Render message bubble with appropriate styling based on sender
  return (
    <View style={[
      styles.container,
      message.isUser ? styles.userContainer : styles.botContainer
    ]}>
      <View style={[
        styles.bubble,
        message.isUser ? styles.userBubble : styles.botBubble
      ]}>
        <Text style={[
          styles.text,
          message.isUser ? styles.userText : styles.botText
        ]}>
          {message.text}
        </Text>
        
        {/* Show video icon for bot messages with video */}
        {!message.isUser && message.videoUrl && (
          <TouchableOpacity 
            style={styles.videoButton}
            onPress={onVideoPress}
          >
            <Icon name="videocam" size={20} color="#0066cc" />
            <Text style={styles.videoText}>Watch Video</Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.timestamp}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  botContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userBubble: {
    backgroundColor: '#0084ff',
  },
  botBubble: {
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 16,
  },
  userText: {
    color: '#fff',
  },
  botText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: 'flex-end',
    opacity: 0.7,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 6,
    backgroundColor: 'rgba(0, 102, 204, 0.1)',
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  videoText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#0066cc',
  },
});

export default ChatBubble;