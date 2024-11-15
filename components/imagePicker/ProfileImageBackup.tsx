import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Alert, TouchableOpacity, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

interface ImagePickerComponentProps {
  onImagePicked: (uri: string) => void;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = ({ onImagePicked }) => {
  const [imageUri, setImageUri] = useState<string | null>('https://www.w3schools.com/w3images/avatar2.png'); // Default dummy profile image

  // Request permission to access camera and media library
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera and gallery access');
      return false;
    }

    return true;
  };

  // Function to pick image from camera
  const pickImageFromCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      setImageUri(result.assets[0].uri);
      onImagePicked(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.imageButton}
        onPress={pickImageFromCamera}
      >
        <Image 
          // source={{ uri: imageUri }}
          // source={{ uri: imageUri ?? 'https://www.w3schools.com/w3images/avatar2.png' }} 
          source={{ uri: imageUri || 'https://www.w3schools.com/w3images/avatar2.png' }} 
          style={styles.image}
        />
          <Ionicons name="camera" size={25} style={styles.cameraIcon} />
      </Pressable> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  imageButton: {
    backgroundColor: '#555',
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45, // Makes the image circular
  },
  cameraIcon: {
    position:"absolute",
    bottom: 5,
    right: 5,
    color:"#fff"
  }
});

export default ImagePickerComponent;
