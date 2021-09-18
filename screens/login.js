import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
  Modal,
  SafeAreaView,
  Button,
  ImageBackground,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native'
import AppLoading from 'expo-app-loading'
import { useSelector, useDispatch } from 'react-redux'

import RegAvatar from '../components/avatars/RegAvatar'
import ButtonBlue from '../src/ButtonBlue'

import LogoGroup from '../src/LogoGroup'
import ButtonYellow from '../src/ButtonYellow'
import { messageAPI, userAPI } from '../src/api/api'
import LoginLayout from '../components/layouts/LoginLayout2'

import { Formik } from 'formik'

import { useNavigation } from '@react-navigation/native'

import RegInput from '../components/inputs/RegInput'
import PhoneIcon from '../Images/Phone.svg'
import LockIcon from '../Images/LockSm.svg'
import ArrowBack from '../Images/ArrowBack.svg'

import { updateAll } from '../redux/store'

import CloseIcon from '../Images/CloseIcon'
import { g } from '../styles/global'
import AsteriskInput from '../components/inputs/AsteriskInput'
import { setMessagesThunk } from '../redux/messagesReducer'

export default function Login (props) {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [phoneBorder, setPhoneBorder] = useState('')
  const [passwordBorder, setPasswordBorder] = useState('')
  const [passwordBorderModal, setPasswordBorderModal] = useState('')

  const scale = 1.5

  const onFormikSubmit = async values => {
    await userAPI
      .login(values)
      .then(response => userAPI.saveToken(response.data.access_token))
      .then(() =>
        messageAPI.getMessages().then(data => {
          dispatch(setMessagesThunk(data))
        })
      )
      .then(() =>
        userAPI.dashboard().then(data => {
          dispatch(updateAll(data))
          navigation.navigate('Profile')
        })
      )
      .catch(function (error) {
        console.log('LOGIN NO GOOD')
        console.log(error)
        Alert.alert('עֵרָנִי!', 'טעות במספר טלפון או סיסמה', [
          { text: 'נסה שוב', onPress: () => console.log('alert wrong') }
        ])
      })
  }

  const [modalPass, setModalPass] = useState(false)
  const [modalCode, setModalCode] = useState(false)
  const [code, setCode] = useState(null)

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confPass, setConfPass] = useState('')

  const sendForNewPass = async () => {
    if (phone && password && password === confPass) {
      try {
        await userAPI
          .forgotPass({
            phone
          })
          .then(res => {
            //  console.log(res)
            setPasswordBorderModal('')
            setModalPass(false)
            setModalCode(true)
          })
      } catch (e) {
        console.log(e)
      }
    } else {
      Alert.alert('עֵרָנִי!', 'הסיסמאות אינן תואמות', [
        { text: 'נסה שוב', onPress: () => console.log("Passwords don't match") }
      ])
      setPasswordBorderModal('red')
    }
  }

  const sendCode = async () => {
    try {
      console.log(password)
      await userAPI
        .changePass({
          phone,
          code,
          password
        })
        .then(res => {
          console.log('PASSWORD CHANGED')
          // console.log(res)
        })

      await userAPI
        .login({ phone, password })
        .then(response => userAPI.saveToken(response.data.access_token))
        .then(() =>
          userAPI.dashboard().then(data => {
            dispatch(updateAll(data))
            navigation.navigate('Profile')
            setModalCode(false)
            setPassword('')
            setConfPass('')
            setPhone('')
          })
        )
        .catch(function (error) {
          console.log('LOGIN NO GOOD')
          console.log(error)
          Alert.alert('משהו השתבש!', 'טעות במספר טלפון או סיסמה', [
            { text: 'נסה שוב', onPress: () => console.log('alert wrong') }
          ])
        })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik
      initialValues={{ phone: '', password: '' }}
      onSubmit={onFormikSubmit}
    >
      {props => (
        <LoginLayout>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss()
            }}
          >
            <View style={s.outer}>
              <Modal
                transparent={true}
                animationType='slide'
                visible={modalPass}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss()
                  }}
                >
                  <View style={mS.modalBlock}>
                    <View style={mS.innerBlock}>
                      <RegAvatar />
                      <TouchableOpacity
                        style={mS.closeIcon}
                        onPress={() => setModalPass(false)}
                      >
                        <CloseIcon />
                      </TouchableOpacity>
                      <View style={mS.titleBlock}>
                        <Text style={g.text24_700_blue}>שינוי סיסמה</Text>
                      </View>
                      <View style={mS.inputsBlock}>
                        <RegInput
                          onChangeText={setPhone}
                          value={phone}
                          keyboardType='number-pad'
                          placeholder='972 54 1234567'
                          borderColor={phoneBorder}
                          maxLength={12}
                        >
                          <PhoneIcon />
                        </RegInput>
                        <RegInput
                          onChangeText={setPassword}
                          value={password}
                          placeholder='סיסמה חדשה'
                          borderColor={passwordBorderModal}
                          autoCapitalize='none'
                          secureTextEntry={true}
                        >
                          <LockIcon />
                        </RegInput>
                        <RegInput
                          onChangeText={setConfPass}d
                          value={confPass}
                          placeholder='אשר סיסמה חדשה'
                          borderColor={passwordBorderModal}
                          autoCapitalize='none'
                          secureTextEntry={true}
                        >
                          <LockIcon />
                        </RegInput>
                      </View>
                    </View>
                    <ButtonBlue name='קבל SMS' onPress={sendForNewPass} />
                  </View>
                </TouchableWithoutFeedback>
              </Modal>

              <Modal
                transparent={true}
                animationType='slide'
                visible={modalCode}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss()
                  }}
                >
                  <View style={mS.modalBlock}>
                    <View style={mS.innerBlock}>
                      <RegAvatar />
                      <TouchableOpacity
                        style={mS.closeIcon}
                        onPress={() => setModalCode(false)}
                      >
                        <CloseIcon />
                      </TouchableOpacity>
                      <View style={mS.titleBlock}>
                        <Text style={g.text28_700_blue}>
                          שלחנו לך קוד ב-סמס
                        </Text>
                      </View>
                      {true && (
                        <View style={mS.infoBlock}>
                          <Text style={g.text24_400_grey}>
                            נא הכנס קוד שקיבלת
                          </Text>
                        </View>
                      )}
                      <View style={mS.inputBlock}>
                        <AsteriskInput code={code} setCode={setCode} />
                      </View>
                    </View>
                    <ButtonBlue name='כניסה' onPress={sendCode} />
                  </View>
                </TouchableWithoutFeedback>
              </Modal>

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
              <KeyboardAvoidingView
                style={s.avoidBlock}
                behavior={Platform.OS === 'ios' ? 'position' : 'height'}
                contentContainerStyle={s.outer2}
              >
                <View style={s.logoBlock}>
                  <LogoGroup />
                </View>

                <View style={s.descriptionBlock}>
                  <Text style={[g.text22_700_white, { marginTop: -10 }]}>
                    כניסת לקוח קיים
                  </Text>
                </View>

                <View style={s.inputsBlock}>
                  <RegInput
                    onChangeText={props.handleChange('phone')}
                    value={props.values.phone}
                    keyboardType='number-pad'
                    placeholder='972 54 1234567'
                    borderColor={phoneBorder}
                    maxLength={12}
                  >
                    <PhoneIcon />
                  </RegInput>
                  <RegInput
                    onChangeText={props.handleChange('password')}
                    value={props.values.password}
                    placeholder='סיסמה'
                    borderColor={passwordBorder}
                    autoCapitalize='none'
                    secureTextEntry={true}
                  >
                    <LockIcon />
                  </RegInput>
                </View>

                <TouchableOpacity
                  style={s.forgotPasswordBlock}
                  onPress={() => setModalPass(true)}
                >
                  <Text style={[g.text17_400_white, {textDecorationLine:"underline"}]}>שכחת את הסיסמה?</Text>
                  <Text style={[g.text17_400_white, {textDecorationLine:"underline"}]}>
                    כניסה עם קוד חד-פעמי ב-סמס
                  </Text>
                </TouchableOpacity>

                <View style={s.yellowButtonBlock}>
                  <ButtonYellow name='כניסה' onPress={props.handleSubmit} />
                </View>
              </KeyboardAvoidingView>

              <View style={s.notAvoidBlock} />
            </View>
          </TouchableWithoutFeedback>
        </LoginLayout>
      )}
    </Formik>
  )
}

const s = StyleSheet.create({
  outer: {
    flex: 1,
    width: '100%',
//backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  outer2: {
    flex: 1,
    width: '100%',
  //  backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  goodnessBlock: {
    width: '100%',
    flex: 1,
 //   backgroundColor: 'peru',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  arrowContainer: {
    width: 40,
    height: 40,
    //  backgroundColor: 'maroon',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    position: 'absolute',
    zIndex: 11,
    top: 52,
    left: 28
  },

  logoBlock: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
//    backgroundColor: 'green'
  },
  descriptionBlock: {
    height: '12%',
    alignItems: 'center',
    justifyContent: 'flex-end',
   // backgroundColor: 'pink',
    paddingBottom: 20
  },

  inputsBlock: {
    width: '78%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
//    backgroundColor: 'red'
  },

  forgotPasswordBlock: {
    // width: '90%',
    height: '15%',
    top: -10,
    alignItems: 'center',
    justifyContent: 'center',
//backgroundColor: 'lightblue'
  },

  yellowButtonBlock: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  //  backgroundColor: 'green'
  },

  avoidBlock: {
    width: '100%',
    height: Dimensions.get('window').height * 0.75,

    alignItems: 'center',
    justifyContent: 'flex-end',
  //   backgroundColor: 'olive'
  },

  notAvoidBlock: {
  //   backgroundColor: 'blue',
    width: '90%',
    height: Dimensions.get('window').height * 0.125
  }
})

const mS = StyleSheet.create({
  modalBlock: {
    flex: 1,
    width: '100%',

    backgroundColor: 'rgba(36, 54, 99, 0.88)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  innerBlock: {
    width: '90%',
    height: 400,
    borderRadius: 20,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative'
  },

  closeIcon: {
    position: 'absolute',
    top: 10,
    left: 10
  },

  titleBlock: {
    marginTop: 15
  },

  infoBlock: {
    marginTop: 20
  },

  inputBlock: {
    width: '100%',
    alignItems: 'center',
    marginTop: 15
  },

  inputsBlock: {
    width: '90%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  //    backgroundColor: 'red'
  }
})
