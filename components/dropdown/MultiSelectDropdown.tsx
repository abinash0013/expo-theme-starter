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
import { Ionicons } from '@expo/vector-icons';

interface DropdownProps {
  label: string;
  options: string[];
  selectedValues: string[]; // Updated for multi-selection
  onValueChange: (values: string[]) => void;
  error?: string;
  placeholder?: string;
  placeholderColor?: string;
  dropdownStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  iconSize?: number;
}

const MultiSelectDropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValues,
  onValueChange,
  error,
  placeholder = 'Select options',
  placeholderColor = '#999',
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
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsDropdownVisible(false));
    } else {
      setIsDropdownVisible(true);
      Animated.timing(animatedHeight, {
        toValue: options.length * 40,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSelectOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter(item => item !== value)
      : [...selectedValues, value];

    onValueChange(newSelectedValues);
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
            { color: selectedValues.length > 0 ? theme.textColor : placeholderColor },
          ]}
        >
          {selectedValues.length > 0 ? `${selectedValues.length} item(s) selected` : placeholder}
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
                <Ionicons
                  name={
                    selectedValues.includes(item) ? 'checkbox' : 'checkbox-outline'
                  }
                  size={20}
                  color={theme.textColor}
                />
                <Text style={[styles.optionText, { color: theme.textColor }]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default MultiSelectDropdown;

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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
  },
});
