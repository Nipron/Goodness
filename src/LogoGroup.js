import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import AppLoading from 'expo-app-loading'
import { useFonts, Assistant_700Bold } from '@expo-google-fonts/assistant'
import Bell from '../Images/spinner.svg'
import { WebView } from 'react-native-webview'
import SvgComponent from '../assets/spinner'
import Spinner from 'react-native-loading-spinner-overlay'
import g from '../styles/global'

const LogoGroup = () => {
  let [fontsLoaded, error] = useFonts({ Assistant_700Bold })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    console.log(error)
  }

  return (
    <View style={s.logoBlock}>
      <Image style={s.logo} source={require('../Images/Logo2.png')} />
      <Text style={s.textGOODNESS}>GOODNESS</Text>
    </View>
  )
}

const s = StyleSheet.create({
  logoBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
    // backgroundColor: "pink"
  },
  logo: {
    width: 120,
    height: 120
  },
  textGOODNESS: {
    fontFamily: 'Assistant_700Bold',
    color: 'white',
    marginTop: 15,
    fontSize: 36
  }
})

export default LogoGroup
