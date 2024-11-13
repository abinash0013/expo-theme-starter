import { useRef } from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle, PressableProps, Animated, Platform } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

interface ButtonProps extends PressableProps {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const SecondaryButton: React.FC<ButtonProps> = ({ title, onPress, buttonStyle, textStyle, ...props }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 0.95, // Shrinks to 95%
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.8, // Slightly reduces opacity
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: 1, // Returns to original size
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 1, // Restores opacity
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], opacity: opacityValue }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          styles.button,
          buttonStyle,
          Platform.OS === 'android' && { overflow: 'hidden' }, // Required for ripple effect
          pressed && Platform.OS === 'ios' && styles.iosPressed,
        ]}
        android_ripple={{ color: 'rgba(0, 0, 0, 0.2)' }}
        {...props}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  
  button: {
    paddingVertical: responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(5),
    borderRadius: 5,
    // width: responsiveWidth(100),
    alignItems: 'center',
    backgroundColor: '#007bff',
  },
  iosPressed: {
    opacity: 0.8, // Dim effect on iOS when pressed
  },
  text: {
    color: '#ffffff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});