import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "../screens/home-screen/home-screen"
import { Text,StyleSheet } from "react-native"
import { color, typography } from "../theme"
import NewScreen from "../screens/news-screen/news-screen"

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
        title: '',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerLeft: () => (
            <Text style={styles.header_text}>N</Text>
        ),
      }}
    >
  <Stack.Screen name="news" component={NewScreen}  />

  <Stack.Screen name="home" component={Home}  />

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
    fontFamily:typography.secondary,
    fontSize:24,
    color:color.text
  }
});
