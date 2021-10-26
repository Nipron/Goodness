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
import { updateAll, updateProfileThunk } from '../redux/store'

import { useNetInfo } from '@react-native-community/netinfo'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import RegAvatar from '../components/avatars/RegAvatar'
import ButtonBlue from '../src/ButtonBlue'

import LogoGroup from '../src/LogoGroup'
import ButtonYellow from '../src/ButtonYellow'
import { messageAPI, userAPI } from '../src/api/api'
import LoginLayout from '../components/layouts/LoginLayout'

import { Formik } from 'formik'

import RegInput from '../components/inputs/RegInput'
import PhoneIcon from '../Images/Phone.svg'
import LockIcon from '../Images/LockSm.svg'
import ArrowBack from '../Images/ArrowBack.svg'

import CloseIcon from '../Images/CloseIcon'
import { g } from '../styles/global'
import AsteriskInput from '../components/inputs/AsteriskInput'
import { setMessagesThunk } from '../redux/messagesReducer'

import Spinner from 'react-native-loading-spinner-overlay'

import OTPInputView from '@twotalltotems/react-native-otp-input'

export default function Login(props) {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const netInfo = useNetInfo()
  const [connected, setConnected] = useState(true)

  const [firstTry, setFirstTry] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true
      if (isActive) {
        setConnected(netInfo.isConnected)
        // if (!connected) navigation.navigate('Crash')
      }

      return () => {
        isActive = false
      }
    }, [netInfo])
  )


  const [phoneBorder, setPhoneBorder] = useState('')
  const [passwordBorder, setPasswordBorder] = useState('')
  const [passwordBorderModal, setPasswordBorderModal] = useState('')

  const scale = 1.5

  const [loading, setLoading] = useState(false)

  const onFormikSubmit = async values => {
    setLoading(true)
    const phoneClean = values.phone.replace(/[^\d]/g, '')
    await userAPI
      .login({ ...values, phone: phoneClean })
      .then(response => {
        console.log("GGGGG")
        userAPI.saveToken(response.data.access_token)
      })
      .then(() =>
        Promise.all([userAPI.dashboard(), messageAPI.getMessages()])
          .then(values => {
            //  console.log(Object.keys(values[0]))
            dispatch(updateProfileThunk())
            dispatch(setMessagesThunk(values[1]))
          /*  navigation.navigate('About')
            navigation.navigate('Messages')
            navigation.navigate('Create')
            navigation.navigate('Services')*/
            navigation.navigate('Profile')
            setLoading(false)
          })
      ).catch(function (error) {
        console.log('LOGIN NO GOOD')
        console.log(error)
        if (firstTry) {
          Alert.alert("שגיאה", connected ? "טעות במספר טלפון או סיסמה, נא לתקן" : "מייל או סיסמא שגויים. אנא הרשמו", [
            {
              text: 'נסה שוב', onPress: () => {
                setLoading(false)
                setFirstTry(false)
                navigation.navigate('Registration')
              }
            }
          ])
        } else {
          Alert.alert("שגיאה", connected ? "טעות במספר טלפון או סיסמה, נא לתקן" : "איו חיבור לאינטרנט, נא לנסות מאוחר יותר", [
            {
              text: 'נסה שוב', onPress: () => {
                setLoading(false)
                setFirstTry(true)
              }
            }
          ])
        }
      })
  }

  const [modalPass, setModalPass] = useState(false)
  const [modalCode, setModalCode] = useState(false)
  const [code, setCode] = useState(null)

  useEffect(() => {
    if (code && code.length === 5) {
      sendCode()
    }
    return () => {

    }
  }, [code])

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confPass, setConfPass] = useState('')

  const sendForNewPass = async () => {
    setLoading(true)
    const phoneClean = phone.replace(/[^\d]/g, '')
    if (!!phoneClean && !!password && password === confPass) {
      try {

        await userAPI
          .forgotPass({
            phone: phoneClean
          })
          .then(res => {
            setPasswordBorderModal('')
            setModalPass(false)
            setModalCode(true)
            setLoading(false)
          }/*, rej => {
            console.log("g")
            console.log(res.status)
          }*/)
      } catch (e) {
        Alert.alert("אַזהָרָה", "מספר טלפון שגוי", [
          {
            text: 'נסה שוב', onPress: () => {
              console.log('alert wrong')
              navigation.navigate("Registration")
              setModalPass(false)
              setLoading(false)
            }
          }
        ])
        setLoading(false)
        // console.log(e)
      }
    } else {
      Alert.alert("משהו השתבש!", connected ? "טעות במספר טלפון או סיסמה, נא לתקן" : "טעות במספר טלפון או סיסמה, נא לתקן. ", [
        {
          text: 'נסה שוב', onPress: () => {
            console.log('alert wrong')
            setLoading(false)
          }
        }
      ])
      setPasswordBorderModal('red')
    }
  }

  const sendCode = async () => {
    const phoneClean = phone.replace(/[^\d]/g, '')
    setLoading(true)
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
        })

      await userAPI
        .login({ phone, password })
        .then(response => userAPI.saveToken(response.data.access_token))
        .then(() => {
          dispatch(updateProfileThunk())
          setModalCode(false)
          setPassword('')
          setConfPass('')
          setPhone('')
          setLoading(false)
        /*  navigation.navigate('About')
          navigation.navigate('Messages')
          navigation.navigate('Create')
          navigation.navigate('Services')*/
          navigation.navigate('Profile')
        })
        .catch(function (error) {
          console.log('LOGIN NO GOOD')
          console.log(error)
          Alert.alert("משהו השתבש!", connected ? "טעות במספר טלפון או סיסמה, נא לתקן" : "טעות במספר טלפון או סיסמה, נא לתקן. ", [
            {
              text: 'נסה שוב', onPress: () => {
                console.log('alert wrong')
                setLoading(false)
              }
            }
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
          <Spinner
            visible={loading}
            textContent={'טוען...'}
            textStyle={g.text22_700_white}
          />
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
                          keyboardType='phone-pad'
                          placeholder='+972 54 1234567'
                          borderColor={phoneBorder}
                          maxLength={20}
                          setFocus={() => { }}
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
                          setFocus={() => { }}
                        >
                          <LockIcon />
                        </RegInput>
                        <RegInput
                          onChangeText={setConfPass}
                          d
                          value={confPass}
                          placeholder='אשר סיסמה חדשה'
                          borderColor={passwordBorderModal}
                          autoCapitalize='none'
                          secureTextEntry={true}
                          setFocus={() => { }}
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
                        {/* <OTPInputView pinCount={5} style={{width: '80%', height: 60, backgroundColor: "lightblue"}}/>*/}
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
                    keyboardType='phone-pad'
                    placeholder='+972 54 1234567'
                    borderColor={phoneBorder}
                    maxLength={20}
                    setFocus={() => { }}
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
                    setFocus={() => { }}
                  >
                    <LockIcon />
                  </RegInput>
                </View>

                <TouchableOpacity
                  style={s.forgotPasswordBlock}
                  onPress={() => setModalPass(true)}
                >
                  <Text
                    style={[
                      g.text17_400_white,
                      { textDecorationLine: 'underline' }
                    ]}
                  >
                    שכחת את הסיסמה?
                  </Text>
                  <Text
                    style={[
                      g.text17_400_white,
                      { textDecorationLine: 'underline' }
                    ]}
                  >
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
    justifyContent: 'center'
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
    justifyContent: 'space-evenly'
    //    backgroundColor: 'red'
  },

  forgotPasswordBlock: {
    // width: '90%',
    height: '15%',
    top: -10,
    alignItems: 'center',
    justifyContent: 'center'
    //backgroundColor: 'lightblue'
  },

  yellowButtonBlock: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'flex-start'
    //  backgroundColor: 'green'
  },

  avoidBlock: {
    width: '100%',
    height: Dimensions.get('window').height * 0.75,

    alignItems: 'center',
    justifyContent: 'flex-end'
    //   backgroundColor: 'olive'
  },

  notAvoidBlock: {
    //     backgroundColor: 'pink',
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
    justifyContent: 'space-evenly'
    //    backgroundColor: 'red'
  }
})
