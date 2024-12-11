import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import {
  View,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

interface ImageViewerProps {
  imageUrl: string;
  thumbnailUrl?: string;
  onClose?: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl, thumbnailUrl, onClose }) => {
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  // Animations
  const scale = useSharedValue(1); // For pinch zoom
  const modalScale = useSharedValue(0.8); // For opening/closing animation
  const modalOpacity = useSharedValue(0);

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedModalStyle = useAnimatedStyle(() => ({
    opacity: modalOpacity.value,
    transform: [{ scale: modalScale.value }],
  }));

  const handlePinch = (event: any) => {
    if (event.nativeEvent.scale > 1) {
      scale.value = withSpring(event.nativeEvent.scale);
    }
  };

  const handlePinchEnd = () => {
    scale.value = withSpring(1); // Reset scale after gesture ends
  };

  const handleOpen = () => {
    setModalVisible(true);
    modalScale.value = 0.8;
    modalOpacity.value = 0;

    // Animate modal to appear
    modalScale.value = withTiming(1, { duration: 300 });
    modalOpacity.value = withTiming(1, { duration: 300 });
  };

  const handleClose = () => { 
      setModalVisible(false);
      onClose?.();
  };

  if (!theme) return null;

  return (
    <GestureHandlerRootView style={styles.container}>
      {/* Thumbnail or Trigger */}
      <TouchableOpacity onPress={handleOpen}>
        <View style={styles.imageInnerContainer}>
          <Image
            source={{ uri: thumbnailUrl || imageUrl }}
            style={styles.thumbnail}
            onError={() => console.error('Image failed to load')}
          />
        </View>
      </TouchableOpacity>
      {/* Full-screen Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="none">
        <View style={[styles.modalBackground, { backgroundColor: '#000' }]}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
              <PinchGestureHandler onGestureEvent={handlePinch} onHandlerStateChange={handlePinchEnd}>
                <Animated.Image
                  source={{ uri: imageUrl }}
                  style={[styles.fullImage, animatedImageStyle]}
                  resizeMode="contain"
                  onError={() => console.error('Failed to load full image')}
                />
              </PinchGestureHandler>
              <Ionicons
                name="close-circle"
                size={30}
                color="#fff"
                onPress={handleClose}
                style={styles.closeButton}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageInnerContainer: {
    padding: 10,
    flexDirection: 'row',
    borderRadius: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContainer: {
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 10,
  },
});

export default ImageViewer;
