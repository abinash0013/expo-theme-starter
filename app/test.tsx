import { useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

import Dropdown from '@/components/dropdown/Dropdown';
import InputTypeText from '@/components/inputType/InputTypeText';
import Modal from '@/components/modal/Modal';  
import ImagePickerComponent from '@/components/imagePicker/ProfileImageBackup';

interface Theme {
  backgroundColor: string;
  textColor: string;
}

export default function AnyComponent() {
  const theme = useTheme() as Theme;
  if (!theme) return null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [error, setError] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>(''); 
  const [countryError, setCountryError] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePicked = (uri: string) => {
    setSelectedImage(uri);
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    setCountryError(undefined);
  };

  const handleImageSelected = (uri: string) => {
    console.log('Selected Image URI:', uri);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {/* <InputTypeText
        label="Name"
        value={name}
        onChangeText={setName}
        error={error}
        placeholder="Enter your name" // Add placeholder here
        keyboardType="default"
        autoCapitalize="none"
        style={{ color: theme.textColor }}
      />
      <InputTypeText
        label="Email"
        value={email}
        onChangeText={setEmail}
        error={error}
        placeholder="Enter Email" // Add placeholder here
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ color: theme.textColor }}
      />
      <InputTypeText
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        error={error}
        placeholder="Enter Phone" // Add placeholder here
        keyboardType="numeric"
        autoCapitalize="none"
        style={[styles.parallelInput, { color: theme.textColor }]}
      /> 
      <InputTypeText
        label="Alternate Phone"
        value={alternatePhone}
        onChangeText={setAlternatePhone}
        error={error}
        placeholder="Enter Alternate Phone" // Add placeholder here
        keyboardType="numeric"
        autoCapitalize="none"
        style={[styles.parallelInput, { color: theme.textColor }]}
      />
      <Dropdown
        label="Select Country"
        placeholder="Choose a country" // Add placeholder here
        options={['USA', 'Canada', 'Mexico']}
        selectedValue={selectedCountry}
        onValueChange={handleCountryChange}
        error={countryError}
      /> */}
      <Button title="Open Modal" onPress={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="My Modal"
      >
        <Text style={{color: theme.textColor}}>This is the modal content</Text> 
      </Modal>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Select an Image:</Text>
      <ImagePickerComponent onImagePicked={handleImagePicked} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: 600,
    // justifyContent: 'center',
    padding: 10,
  },
  parallelInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    flex: 1,
  },
  parallelInput: {
    // flex: 1,
    marginHorizontal: 5, // Space between inputs
    // width: '100%'
  },
  buttonText: {
    fontSize: 18,
  },
});