import { useTheme } from '@/context/ThemeContext';
import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
// import Ionicons from 'react-native-ionicons'


interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  iconSize?: number; 
}

const InputTypeText: React.FC<InputProps> = ({
  label,
  error,
  inputStyle,
  labelStyle,
  errorStyle,
  iconSize = 24,
  placeholder,
  ...props
}) => {
  const theme = useTheme();

  if (!theme) return null;

  return (
    <View style={styles.container}>
      {/* <View style={{flex:1}}> */}
        <Text style={[styles.label, labelStyle, { color: theme.textColor }]}>{label}</Text>
        <View style={[styles.inputContainer, inputStyle, { borderColor: theme.textColor }]}>
          {/* <Ionicons name="mail-outline" size={iconSize} color={theme.textColor} style={styles.icon} />
          <Ionicons name="add" /> */}
          <TextInput
            {...props}
            placeholder={placeholder}
            style={[styles.input, { color: theme.textColor }]}
            placeholderTextColor={theme.placeholderColor}
          />
        </View>
        {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
      {/* </View> */}
    </View>
  );
};

export default InputTypeText;

const styles = StyleSheet.create({
  container: {
    // flex:1,
    marginVertical: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 45,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    // flex: 1,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
