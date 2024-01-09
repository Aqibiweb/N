import React from "react"

import { StatusBar, } from 'expo-status-bar';
import { useEffect,useCallback  } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { useFonts,loadAsync } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const HomeScreen=() =>{
    return (
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
        flex:1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default HomeScreen;