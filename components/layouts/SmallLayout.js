import React from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  Pressable,
  Alert,
  Button,
  TouchableWithoutFeedback,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'
import AvatarPlain from '../../Images/AvatarPlain.jpg'

import Footer from '../footer/Footer'
import ArrowBack from '../../Images/ArrowBack.svg'

import { g } from '../../styles/global'

export default function SmallLayout (props) {
  const navigation = useNavigation()
  const route = useRoute()
  const data = useSelector(state => state.all)

  const scale = 1.2

  const handleExit = async () => {
    await AsyncStorage.removeItem('token')
    navigation.navigate('Home')
    console.log('EXIT OK')
  }

  return (
    <KeyboardAvoidingView style={s.containerMain} behavior='padding'>
      <View style={s.background}>
        <ImageBackground
          source={require('../../Images/BackgroundSmall.png')}
          style={s.imageBack}
        >
          <SafeAreaView style={s.safeContainer}>
            <View style={s.upper1}>
              {route.name !== 'Profile' && (
                <TouchableOpacity
                  style={s.arrowContainer}
                  onPress={() => navigation.goBack()}
                >
                  <ArrowBack
                    style={{
                      transform: [{ scaleX: scale }, { scaleY: scale }]
                    }}
                  />
                </TouchableOpacity>
              )}

              {route.name === 'Profile' && (
                <TouchableOpacity style={s.arrowContainer} onPress={handleExit}>
                  <View style={s.exit}>
                    <Text style={g.text17_400_white}>יציאה</Text>
                  </View>
                </TouchableOpacity>
              )}

              {(route.name !== 'Profile') && (route.name !== 'Terms') && (route.name !== 'About') && (
                <TouchableOpacity
                  style={s.photoOuter}
                  onPress={() =>
                    navigation.navigate(props.hide ? 'Registration' : 'Profile')
                  }
                >
                  <View style={s.photoInner}>
                    <ImageBackground
                      source={
                        !!data.avatar
                          ? {
                              uri: `http://52.48.233.122:3001/${data.avatar.path}`
                            }
                          : AvatarPlain
                      }
                      style={s.avatar}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View style={s.logoBlock}>
              <Image
                style={s.logo}
                source={require('../../Images/Logo1.png')}
              />
              <Text style={g.text24_700_white}>{props.text}</Text>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>

      <View style={s.childrenBlockOuter}>{props.children}</View>

      <Footer hide={props.hide} />
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
    backgroundColor: 'white'
  },

  background: {
    width: '100%',
    // height: Dimensions.get('window').height * 0.3,
    height: '32.5%',
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

  exit: {
    height: 60,
    width: 60,
    paddingTop: -4,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#B83E3E',
    //   borderColor: '#FFFFFF',
    //   borderWidth: 2,
    zIndex: 10,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.3,
    // shadowColor: "blue",
    shadowRadius: 4
  },

  safeContainer: {
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'red'
  },

  arrowCont: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
    //  backgroundColor: 'pink'
  },

  arrowContainer: {
    width: 60,
    height: 60,
    //   backgroundColor: "maroon",
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12
  },

  logoBlock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    top: -60,
  //   backgroundColor: 'green'
  },

  logo: {
    width: 50,
    height: 50
  },

  childrenBlockOuter: {
    width: '92%',
    height: Dimensions.get('window').height * 0.555 + 70,
    marginTop: -60,
    //     backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3
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
