import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import AppLoading from 'expo-app-loading'
import { useFonts, Assistant_700Bold } from '@expo-google-fonts/assistant'

const LogoGroup = () => {
  let [fontsLoaded, error] = useFonts({ Assistant_700Bold })
  

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    console.log(error)
  }

  return (
    <View style={s.logoBlock}>
      <Image style={s.logo} source={require('../Images/Logo1.png')} />
      <Text style={s.textGOODNESS}>GOODNESS</Text>
    </View>
  )
}

const s = StyleSheet.create({
  logoBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  logo: {
    width: 120,
    height: 120,
  },
  textGOODNESS: {
    fontFamily: 'Assistant_700Bold',
    color: 'white',
    marginTop: 5,
    fontSize: 36
  }
})

export default LogoGroup
