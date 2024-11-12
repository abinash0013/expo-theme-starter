import { Text, View, StyleSheet, Pressable } from 'react-native';
import { ThemeProvider, useTheme } from './../context/ThemeContext';
import { useRouter } from 'expo-router';

function MainScreen() {
  const theme = useTheme();
  const router = useRouter();

  const handleRouter = async () => {
    router.push("/test")
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Pressable onPress={handleRouter}>
      <Text style={{ color: theme.textColor }}>Hello, World!</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainScreen />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
