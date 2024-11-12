// app/test.js or AnyComponent.js
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from './../context/ThemeContext';

export default function AnyComponent() {
  const theme = useTheme();
  if (!theme) return null; // Prevent rendering if theme is undefined

  return (
    <View style={{ backgroundColor: theme.backgroundColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.textColor }}>This is a themed component!</Text>
    </View>
  );
}
