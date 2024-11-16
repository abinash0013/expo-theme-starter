import { Href, useRouter } from 'expo-router';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { ThemeProvider, useTheme } from './../context/ThemeContext';

import PrimaryButton from '@/components/button/PrimaryButton';
import SecondaryButton from '@/components/button/SecondaryButton';
import ImageViewer from '@/components/ImageViewer/ImageViewer';

const MainScreen: React.FC = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleRouter = () => {
    router.push("/test" as Href);
  };
 
  const handlePrimaryPress = () => {
    console.log("handlePrimaryPress Button Pressed");
  }

  const handleSecondaryPress = () => {
    console.log("handleSecondaryPress Button Pressed");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Pressable onPress={handleRouter}>
        <Text style={{ color: theme.textColor, textAlign:'center' }}>Go To Next..!</Text>
      </Pressable>
      <View style={{marginVertical: 10}} /> 
      <PrimaryButton
        title="Primary"
        onPress={handlePrimaryPress}
        buttonStyle={{ backgroundColor: theme.buttonColor, borderColor:theme.buttonColor, borderWidth:1 }}
        textStyle={{ color: theme.buttonText}}
      />
      <View style={{marginVertical: 10}} />
      <SecondaryButton
        title="Secondary"
        onPress={handleSecondaryPress}
        buttonStyle={{ backgroundColor: 'transparent', borderColor:theme.textColor, borderWidth:1 }}
        textStyle={{ color: theme.textColor}}
      /> 
      <ImageViewer
        imageUrl="https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/1-How-to-Create-an-Online-Course-Thumbnail.jpg"
        thumbnailUrl="https://instructor-academy.onlinecoursehost.com/content/images/size/w2000/2023/05/1-How-to-Create-an-Online-Course-Thumbnail.jpg"
        // onClose={() => console.log('ImageViewer closed')}
      />
    </View>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MainScreen />
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding:10
  },
});
