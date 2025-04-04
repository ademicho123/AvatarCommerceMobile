import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

interface VideoPlayerProps {
  url: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Handle video load start
  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  // Handle video loaded
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle video error
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Modal
      visible={true}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.9)" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.videoContainer}>
          {/* Video player */}
          <Video
            source={{ uri: url }}
            style={styles.video}
            resizeMode="contain"
            onLoadStart={handleLoadStart}
            onLoad={handleLoad}
            onError={handleError}
            paused={!isPlaying}
            repeat={true}
            controls={false}
          />

          {/* Loading indicator */}
          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}

          {/* Error message */}
          {hasError && (
            <View style={styles.errorContainer}>
              <Icon name="alert-circle" size={50} color="#ff6b6b" />
            </View>
          )}

          {/* Play/Pause button */}
          {!isLoading && !hasError && (
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={togglePlayPause}
            >
              <Icon
                name={isPlaying ? 'pause' : 'play'}
                size={30}
                color="rgba(255, 255, 255, 0.8)"
              />
            </TouchableOpacity>
          )}

          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    marginTop: 10,
  },
  playPauseButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPlayer;