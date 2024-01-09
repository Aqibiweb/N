
import { RootNavigator } from './app/navigation';
import { useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View,StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    'LibreBaskervilleRegularBold': require('./assets/fonts/LibreBaskerville-Bold.ttf'),
    'InterBold': require('./assets/fonts/Inter-Bold.ttf'),
    'InterMedium': require('./assets/fonts/Inter-Medium.ttf'),
    'InterRegular': require('./assets/fonts/Inter-Regular.ttf'),
  });
  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <View style={{flex:1}} onLayout={onLayoutRootView}>
  <RootNavigator/>
  <StatusBar barStyle="light-content" />
  </View>
  );
}

