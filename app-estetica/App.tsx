import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { Routes} from './src/Routes';
import 'react-native-gesture-handler';
import AnimatedSplash from "react-native-animated-splash-screen";
import Logo from "./src/images/logo.png";


export default function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
      setTimeout(() => {
          setIsLoaded(true);
      }, 2000)
  });

  return (
    <AnimatedSplash
                translucent={true}
                isLoaded={isLoaded}
                logoImage={Logo}
                backgroundColor={"white"}
                logoHeight={300}
                logoWidth={300}
            >
    <NativeBaseProvider>
      <Routes/>
    </NativeBaseProvider>
    </AnimatedSplash>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
