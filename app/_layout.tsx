import { FC } from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';

const RootLayout: FC = () => {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}

export default RootLayout