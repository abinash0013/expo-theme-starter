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
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ImageViewerProps {
  imageUrl: string;
  thumbnailUrl?: string;
  onClose?: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ imageUrl, thumbnailUrl, onClose }) => {
    const theme = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePinch = (event: any) => {
        if (event.nativeEvent.scale > 1) {
            scale.value = withSpring(event.nativeEvent.scale);
        }
    };

    const handlePinchEnd = () => {
        scale.value = withSpring(1); // Reset scale after gesture ends
    };

    const handleOpen = () => setModalVisible(true);
    const handleClose = () => {
        setModalVisible(false);
        onClose?.();
    };

    if (!theme) return null; 

    console.log("themebackground", theme.colors.background);
    

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
            <Modal visible={modalVisible} transparent={true} animationType="fade"> 
                <View style={[styles.modalBackground, {backgroundColor: '#888', opacity: 1}]}>
                    <TouchableWithoutFeedback>
                    <PinchGestureHandler onGestureEvent={handlePinch} onHandlerStateChange={handlePinchEnd}>
                        <Animated.Image
                            source={{ uri: imageUrl }}
                            style={[styles.fullImage, animatedStyle]}
                            resizeMode="contain"
                            onError={() => console.error('Failed to load full image')}
                        />
                    </PinchGestureHandler>
                    </TouchableWithoutFeedback>
                    <Ionicons name="close-circle" size={24} color={"#fff"} onPress={handleClose} style={styles.closeButton}/>
                </View> 
            </Modal>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imageInnerContainer: { 
    padding: 10, 
    flexDirection:"row", 
    borderRadius:10
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
  },
  fullImage: {
    width: '90%',
    height: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20, 
  },
  closeText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ImageViewer;