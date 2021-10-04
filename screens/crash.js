import React, { useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { useNetInfo } from '@react-native-community/netinfo'

import LogoGroup from '../src/LogoGroup'
import g from '../styles/global'

export default function Crash () {
  const navigation = useNavigation()
  const netInfo = useNetInfo()

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true
      if (isActive) {
        if (netInfo.isConnected) navigation.navigate('Home')
      }

      return () => {
        isActive = false
      }
    }, [netInfo])
  )

  return (
    <SafeAreaView style={s.main}>
      <View style={s.logoBlock}>
        <LogoGroup />
      </View>
      <Text style={[g.text22_700_white, { textAlign: 'center', width: "75%" }]}>
        על מנת להשתמש באפליקציה נא להתחבר לאינטרנט.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Crash')}
        style={s.refresh}
      >
        <Text style={[g.text24_700_blue, { textAlign: 'center' }]}>
          נסה שוב
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: '#023374',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logoBlock: {
    height: '30%',
    //  backgroundColor: 'peru',
    alignItems: 'center',
    justifyContent: 'center'
  },
  refresh: {
    height: 52,
        width: "60%",
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FECB07",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        shadowOffset: {
            width: 3,
            height: 3
          },
          shadowOpacity: 0.3,
          // shadowColor: "blue",
          shadowRadius: 4
  }
})
