import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert,
  Button,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native'
import { useSelector } from 'react-redux'

import Footer from '../footer/Footer'
import ArrowBack from '../../Images/ArrowBack.svg'
import Burger from '../../Images/Burger.svg'
import AvatarPlain from '../../Images/AvatarPlain.jpg'

import { g } from '../../styles/global'

import { useNavigation } from '@react-navigation/native'

import ButtonOrder from '../../components/buttons/ButtonYellowSearch'

export default function SearchLayout (props) {
  const scale = 1.2
  const navigation = useNavigation()
  const data = useSelector(state => state.all)  
  let path
  if (data.avatar) {
    path = data.avatar.path
  }

  return (
    <KeyboardAvoidingView style={s.containerMain} behavior='padding'>
      <View style={s.containerBlu}>
        <ImageBackground
          source={require('../../Images/Background.png')}
          resizeMode='cover'
          style={s.background}
        >
          <SafeAreaView style={s.safeContainer}>
            <View style={s.upper1}>
              <TouchableOpacity
                style={s.arrowContainer}
                onPress={() => navigation.goBack()}
              >
                <ArrowBack
                  style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={s.photoOuter}
                onPress={() => {
                  props.logged
                    ? navigation.navigate('Profile')
                    : Alert.alert(
                        'הודעת מערכת',
                        'על מנת להשתמש באפליקציה נא להירשם.',
                        [
                          {
                            text: 'Ok',
                            onPress: () => navigation.navigate('Registration')
                          }
                        ]
                      )
                }}
              >
                <View style={s.photoInner}>
                  <ImageBackground
                    source={
                      !!path
                        ? { uri: `http://52.48.233.122:3001/${path}` }
                        : AvatarPlain
                    }
                    style={s.avatar}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={s.logoBlock}>
              <Image
                style={s.logo}
                source={require('../../Images/Logo2.png')}
              />
              <Text style={g.text24_700_white}>{props.text}</Text>
            </View>
          </SafeAreaView>

          {props.children}
        </ImageBackground>
      </View>
      {!!props.chosenId && (
        <ButtonOrder
          name={'להזמין'}
          chosenId={props.chosenId}
          date={props.date}
          logged={props.logged}
          balance={data.balance}
        />
      )}
      <Footer />
    </KeyboardAvoidingView>
  )
}

const s = StyleSheet.create({
  upper1: {
    width: '100%',
    height: 60,
    //  backgroundColor: "yellow",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  //  backgroundColor: 'red'
  },

  containerBlu: {
    height: '90.5%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start'
    //  backgroundColor: "pink"
  },

  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden'
  },

  imageBack: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    resizeMode: 'cover'
  },

  safeContainer: {
    height: '20%',
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'lightblue'
    marginBottom: 10
  },

  arrowContainer: {
    width: 60,
    height: 40,
    //     backgroundColor: "maroon",
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  burgerContainer: {
    width: 60,
    height: 40,
    //       backgroundColor: "purple",
    alignItems: 'flex-start',
    justifyContent: 'flex-end'
  },

  logoBlock: {
    top: -60,
    alignItems: 'center'
  },

  logo: {
    width: 50,
    height: 50,
    marginBottom: 5
  },

  childrenBlockOuter: {
    width: '88%',
    height: Dimensions.get('window').height * 0.58 + 70,
    marginTop: -70,
    //   backgroundColor: "magenta",
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  photoOuter: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#FDC27A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  photoInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#034794',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },

  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})
