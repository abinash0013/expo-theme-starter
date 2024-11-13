import { useTheme } from '@/context/ThemeContext';
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo

interface DropdownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  placeholderColor?: string; // Add placeholder color prop
  dropdownStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  iconSize?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  error,
  placeholder = 'Select an option',
  placeholderColor = '#999', // Default placeholder color
  dropdownStyle,
  labelStyle,
  errorStyle,
  iconSize = 24,
}) => {
  const theme = useTheme();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  if (!theme) return null;

  const toggleDropdown = () => {
    if (isDropdownVisible) {
      // Collapse dropdown
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsDropdownVisible(false));
    } else {
      // Expand dropdown
      setIsDropdownVisible(true);
      Animated.timing(animatedHeight, {
        toValue: options.length * 40, // Adjust height based on the number of items
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSelectOption = (value: string) => {
    onValueChange(value);
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle, { color: theme.textColor }]}>{label}</Text>
      <TouchableOpacity
        style={[styles.dropdown, dropdownStyle, { borderColor: theme.textColor }]}
        onPress={toggleDropdown}
      >
        <Text
          style={[
            styles.selectedText,
            { color: selectedValue ? theme.textColor : placeholderColor },
          ]}
        >
          {selectedValue || placeholder}
        </Text>
        <Ionicons
          name={isDropdownVisible ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={iconSize}
          color={theme.textColor}
          style={styles.icon}
        />
      </TouchableOpacity>
      {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}

      {isDropdownVisible && (
        <Animated.View
          style={[
            styles.optionsContainer,
            {
              height: animatedHeight,
              backgroundColor: theme.backgroundColor,
              borderWidth: 1,
              borderColor: theme.textColor,
            },
          ]}
        >
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelectOption(item)}
                style={[styles.option, { backgroundColor: theme.backgroundColor }]}
              >
                <Text style={[styles.optionText, { color: theme.textColor }]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 45,
    justifyContent: 'space-between',
  },
  selectedText: {
    fontSize: 16,
  },
  icon: {
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  optionsContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    position: 'absolute',
    top: 70,
    zIndex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  option: {
    padding: 10,
  },
  optionText: {
    fontSize: 16,
  },
});
