import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
  Dimensions,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'

import {
  useFonts,
  Assistant_200ExtraLight,
  Assistant_300Light,
  Assistant_400Regular,
  Assistant_500Medium,
  Assistant_600SemiBold,
  Assistant_700Bold,
  Assistant_800ExtraBold
} from '@expo-google-fonts/assistant'

import ButtonBlue from '../src/ButtonBlue'
import { userAPI } from '../src/api/api'
import RegAvatar from '../components/avatars/RegAvatar'

import CloseIcon from '../Images/CloseIcon'
import { g } from '../styles/global'
import AsteriskInput from '../components/inputs/AsteriskInput'

import { Formik } from 'formik'
import RegInput from '../components/inputs/RegInput'
import RegInputSmall from '../components/inputs/RegInputSmall'
import CameraAvatar from '../components/avatars/CameraAvatar'

import PersonIcon from '../Images/Person.svg'
import PhoneIcon from '../Images/Phone.svg'
import EmailIcon from '../Images/Email.svg'
import JobIcon from '../Images/Job.svg'
import PinIcon from '../Images/Pin.svg'
import HashIcon from '../Images/Hash.svg'
import LockIcon from '../Images/LockSm.svg'
import ReferalIcon from '../Images/Referal.svg'

import SmallLayout2 from '../components/layouts/SmallLayout2'

import { useNavigation } from '@react-navigation/native'

import { setTempImage } from '../redux/tempImageRducer'
import { updateProfileThunk } from '../redux/store'

export default function EditProfile2() {
  const dispatch = useDispatch()
  const data = useSelector(state => state.all)
  const [modalOpen, setModalOpen] = useState(false)
  const navigation = useNavigation()

  const [nameBorder, setNameBorder] = useState('')
  const [emailBorder, setEmailBorder] = useState('')
  const [jobBorder, setJobBorder] = useState('')
  const [cityBorder, setCityBorder] = useState('')
  const [streetBorder, setStreetBorder] = useState('')
  const [houseBorder, setHouseBorder] = useState('')
  const [aptBorder, setAptBorder] = useState('')
  const [regValues, setRegValues] = useState({})
  const [code, setCode] = useState('')

  const [image, setImage] = useState(null)

  const confirm = async () => {
    setModalWrongOpen(false)

    await userAPI
      .register(regValues, code)
      .then(response => {
        console.log('REGISTRATION SUCCEEDED')
        //   console.log(response)
      })
      .catch(function (error) {
        console.log('CODE NO GOOD')
        console.log(error)
      })

    await userAPI
      .login(regValues)
      .then(response => userAPI.saveToken(response.data.access_token))
      .catch(function (error) {
        console.log('LOGIN NO GOOD')
        //  console.log(error);
        //  console.log(regValues)
        Alert.alert('Something went wrong!', 'Wrong email/password', [
          { text: 'Try again', onPress: () => console.log('alert wrong') }
        ])
      })

    await userAPI.sendPic(image).then(res => {
      //       console.log("SEND PIC")
      //        console.log(res)
    })

    dispatch(updateProfileThunk())
    setModalOpen(false)
    navigation.navigate('Profile')


    /*  console.log("CODE CODE")
          console.log(code)*/
  }

  const handlePhone = value => {
    value => setPhone(value)
    //  console.log(value)
  }

  const checkPassword = () => {
    //    console.log("HHHHHHHH")
  }

  const onFormikSubmit = async values => {
    if (!values.name || (values.name.length < 3)) { setNameBorder("red") } else setNameBorder("lightgreen")
    /* if (!values.email) {
       setEmailBorder('red')
     } else setEmailBorder('lightgreen')*/
    if (!values.job || (values.job.length < 3)) { setJobBorder("red") } else setJobBorder("lightgreen")
    // if (!values.city) {setCityBorder("red")} else setCityBorder("lightgreen")
    // if (!values.street) {setStreetBorder("red")} else setStreetBorder("lightgreen")
    // if (!values.house) {setHouseBorder("red")} else setHouseBorder("lightgreen")
    // if (!values.apt) {setAptBorder("red")} else setAptBorder("lightgreen")





    if (values.name.length < 3) {
      Alert.alert("משהו השתבש!", "אורך השם צריך להיות לפחות 3 תווים", [
        {
          text: 'אישור', onPress: () => {
            console.log('Name wrong')
          }
        }
      ])
    } else {
      if (values.job.length < 3) {
        Alert.alert("משהו השתבש!", `אורך שדה "עיסוק" צריך להיות לפחות 3 תווים`, [
          {
            text: 'אישור', onPress: () => {
              console.log('Job wrong')
            }
          }
        ])
      } else {
        
      dispatch(setTempImage(image))
      setRegValues(values)

      await userAPI
        .editProfile(values)
        .then(response => {
          console.log('UPDATE SUCCEEDED')
          //   console.log(response)
        })
        .catch(function (error) {
          console.log('CODE NO GOOD')
          console.log(error)
        })
     

      await userAPI.sendPic(image)

      await userAPI.dashboard().then(data => {
        console.log('DASHBOARD OK')
        dispatch(updateProfileThunk())
        Alert.alert("הצלחה!", "שינוים נשמרו בהצלחה", [
          {
            text: 'אישור', onPress: () => {
              console.log('changed profile')
              navigation.navigate('Profile')
            }
          }
        ])
      })
      }
    }
  }

  const [focus, setFocus] = useState(false)

  return (
    <SmallLayout2 text='הרשמה' hide={true} focus={focus}>

      <View style={s.registrationBlock}>
        <CameraAvatar image={image} setImage={setImage} />
        <View style={s.plug} />
        <Formik
          initialValues={{
            name: data.name /*phone: data.phone,*/,
            email: data.email,
            job: data.job,
            city: data.address.city,
            street: data.address.street,
            house: data.address.house,
            apt: data.address.apt,
            password: data.password,
            confirmPassword: data.password /*referral: ''*/
          }}
          onSubmit={onFormikSubmit}
        >
          {props => (
            <KeyboardAvoidingView
              style={s.goodnessBlock}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <ScrollView
                style={s.formikBlock}
                contentContainerStyle={s.formikScrollStyle}
                keyboardShouldPersistTaps="always"
              >
                <View style={s.fieldsBlock}>
                  <View style={s.personalBlock}>
                    <Text style={g.text28_700_blue}>פרטים אישיים</Text>
                    <RegInput
                      onChangeText={props.handleChange('name')}
                      value={props.values.name}
                      placeholder='שם מלא'
                      borderColor={nameBorder}
                      setFocus={setFocus}
                    >
                      <PersonIcon />
                    </RegInput>

                    <RegInput
                      onChangeText={props.handleChange('email')}
                      value={props.values.email}
                      placeholder='אימייל'
                      borderColor={emailBorder}
                      autoCapitalize='none'
                      setFocus={setFocus}
                      maxLength={30}
                    >
                      <EmailIcon />
                    </RegInput>
                    <RegInput
                      onChangeText={props.handleChange('job')}
                      value={props.values.job}
                      placeholder='עיסוק'
                      borderColor={jobBorder}
                      setFocus={setFocus}
                    >
                      <JobIcon />
                    </RegInput>
                  </View>

                  <View style={s.personalBlock}>
                    <Text style={g.text28_700_blue}>כתובת מגורים</Text>
                    <RegInput
                      onChangeText={props.handleChange('city')}
                      value={props.values.city}
                      placeholder='עיר'
                      borderColor={cityBorder}
                      setFocus={setFocus}
                    >
                      <PinIcon />
                    </RegInput>
                    <RegInput
                      onChangeText={props.handleChange('street')}
                      value={props.values.street}
                      placeholder='רחוב'
                      borderColor={streetBorder}
                      setFocus={setFocus}
                    >
                      <PinIcon />
                    </RegInput>
                    <View style={s.house}>
                      <RegInputSmall
                        onChangeText={props.handleChange('apt')}
                        value={props.values.apt}
                        placeholder="מס' דירה"
                        //  keyboardType='number-pad'
                        style={{ width: '47%' }}
                        borderColor={aptBorder}
                        setFocus={setFocus}
                      >
                        <HashIcon />
                      </RegInputSmall>
                      <RegInputSmall
                        onChangeText={props.handleChange('house')}
                        value={props.values.house}
                        placeholder="מס' בית"
                        //  keyboardType='number-pad'
                        style={{ width: '50%' }}
                        borderColor={houseBorder}
                        setFocus={setFocus}
                      >
                        <HashIcon />
                      </RegInputSmall>
                    </View>
                  </View>


                </View>
                <ButtonBlue name='שמור' bottom={73} onPress={props.handleSubmit} />

                <View style={s.plug2} />
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </Formik>

      </View>
      <TouchableOpacity style={s.termsBlock} onPress={() => navigation.navigate('Terms')}>
        <Text style={[g.text18_400_grey, s.terms]}>תנאי שימוש  </Text>
      </TouchableOpacity>
    </SmallLayout2>
  )
}

const s = StyleSheet.create({

  v: {
    position: "absolute"
  },

  checkBlock: {
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "center"
  },

  footer: {
    width: "100%",
    height: "12.5%",
    marginTop: -26,
    paddingTop: 26,
    //  backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'center'
  },

  footerInner: {
    width: "100%",
    height: "100%",
    //   backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  termsBlock: {
    // width: "100%",
    height: 30,
    //  backgroundColor: "pink",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'
  },
  terms: {
    marginRight: 2
  },











  plug2: {
    width: "100%",
    height: 10,
    //     backgroundColor: "orange"
  },
  outer: {
    backgroundColor: "green",
    width: '100%',
    flex: 1
  },

  registrationBlock: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    flex: 1,
    // backgroundColor: "pink"
  },

  formikScrollStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start'
  },



  plug: {
    position: 'absolute',
    width: "100%",
    marginTop: -55,
    // height: Dimensions.get('window').height * 0.585,
    height: 200,
    backgroundColor: "#EFEFEF",
    //   backgroundColor: "pink",
    borderRadius: 40,
  },

  goodnessBlock: {
    //  backgroundColor: "pink",
    width: '100%',
    // marginBottom: 150,
    flex: 1
  },

  formikBlock: {
    paddingTop: 73,
    marginTop: -73,
    width: '100%',
    borderRadius: 40,
    height: Dimensions.get('window').height * 0.58 + 73,
    // marginBottom: 200,
    //    backgroundColor: "lightblue",
    //  backgroundColor: "#FFFFFF",
  },

  fieldsBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    backgroundColor: '#EFEFEF',
    borderRadius: 40,
    paddingBottom: 40
    //  backgroundColor: "green",
  },

  personalBlock: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '89%',
    paddingBottom: 5
    //  backgroundColor: "lightgreen",
  },

  house: {
    width: '100%',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  lineOuter: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },

  line: {
    width: '70%',
    height: 1,
    backgroundColor: '#243663'
  }
})

const mS = StyleSheet.create({
  modalBlock: {
    flex: 1,
    width: '100%',
    height: 300,
    backgroundColor: 'rgba(36, 54, 99, 0.88)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  innerBlock: {
    width: '90%',
    height: 340,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
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
  }
})
