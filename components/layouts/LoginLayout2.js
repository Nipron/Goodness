import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Alert,
  Button,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native'
import ButtonBlue from '../../src/ButtonBlue'

import { useNavigation } from '@react-navigation/native'
import FooterHome from '../footer/FooterHome'

export default function LoginLayout2 (props) {
  const navigation = useNavigation()

  return (
    <View
      style={s.goodnessBlock}
     
    >
      <View style={s.containerBlu}>
        <ImageBackground
          source={require('../../Images/Background.png')}
          resizeMethod={'auto'}
          style={s.background}
        >
          {props.children}
        </ImageBackground>
      </View>

      <ButtonBlue
        name='הרשמה'
        bottom={0}
        onPress={() => navigation.navigate('Registration')}
      />
      <FooterHome/>
    </View>
  )
}

const s = StyleSheet.create({
  goodnessBlock: {
    height: Dimensions.get("window").height,
    alignItems: 'center',
    justifyContent: "flex-end"
  },

  containerBlu: {
    height: Dimensions.get("window").height*0.88,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  //     backgroundColor: "pink"
  },

  background: {
    height: Dimensions.get("window").height*0.88,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden'
  }
})
