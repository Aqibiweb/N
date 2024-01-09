import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/home-screen/home-screen"
import { Text,StyleSheet } from "react-native"
import { color } from "../theme"
// import NewScreen from "../screens/news-screen/news-screen"
export type RootParamList = {
  home: undefined
  news: undefined
}

const Stack = createNativeStackNavigator<RootParamList>()

const RootStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
      }}
    >
  <Stack.Screen name="home" component={Home}  options={{
      title: '',
      headerStyle: {
        backgroundColor: 'black',
      },
      headerLeft: () => (
          <Text style={styles.header_text}>N</Text>
      ),
  }}/>
  
  {/* <Stack.Screen name="news" component={NewScreen} /> */}
    </Stack.Navigator>
  )
}

export const RootNavigator :React.FC=(props, ref) => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  )
}

RootNavigator.displayName = "RootNavigator"

const styles = StyleSheet.create({
  header_text: {
    // fontFamily:'LibreBaskervilleRegular',
    fontSize:24,
    color:color.text
  }
});
