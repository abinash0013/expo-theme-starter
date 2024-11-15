import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';

const AppStartupPermissions = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        // Request location permission
        const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
        if (locationStatus !== 'granted') {
          Alert.alert('Location permission required');
        }

        // Request media library permission
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaStatus !== 'granted') {
          Alert.alert('Media library access required');
        }

        // If all permissions are granted, update state
        setPermissionsGranted(locationStatus === 'granted' && mediaStatus === 'granted');
      } catch (error) {
        console.log('Error requesting permissions', error);
      }
    };

    requestPermissions();
  }, []);

  return (
    <View>
      {permissionsGranted ? (
        <Text>Permissions granted. You can access location and media files.</Text>
      ) : (
        <Text>Waiting for permissions...</Text>
      )}
    </View>
  );
};

export default AppStartupPermissions;
