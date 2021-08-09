import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TextInput, Image, Alert, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

import {
    useFonts,
    Assistant_200ExtraLight,
    Assistant_300Light,
    Assistant_400Regular,
    Assistant_500Medium,
    Assistant_600SemiBold,
    Assistant_700Bold,
    Assistant_800ExtraBold,
} from '@expo-google-fonts/assistant';

import ButtonBlue from '../src/ButtonBlue';
import { userAPI } from '../src/api/api';
import RegAvatar from '../components/avatars/RegAvatar';

import CloseIcon from '../Images/CloseIcon'
import { g } from '../styles/global'
import AsteriskInput from '../components/inputs/AsteriskInput';

import { Formik } from 'formik'
import RegInput from '../components/inputs/RegInput';
import RegInputSmall from '../components/inputs/RegInputSmall';
import CameraAvatar from '../components/avatars/CameraAvatar';

import PersonIcon from '../Images/Person.svg'
import PhoneIcon from '../Images/Phone.svg'
import EmailIcon from '../Images/Email.svg'
import JobIcon from '../Images/Job.svg'
import PinIcon from '../Images/Pin.svg'
import HashIcon from '../Images/Hash.svg'
import LockIcon from '../Images/LockSm.svg'
import ReferalIcon from '../Images/Referal.svg'

import SmallLayout from '../components/layouts/SmallLayout';

import { useNavigation } from '@react-navigation/native'

import { setTempImage } from '../redux/tempImageRducer';
import { updateAll } from '../redux/store';

export default function Registration2() {

    const dispatch = useDispatch()

    const [modalOpen, setModalOpen] = useState(false)
    const [modalWrongOpen, setModalWrongOpen] = useState(true)

    const navigation = useNavigation()

    const [nameBorder, setNameBorder] = useState("")
    const [phoneBorder, setPhoneBorder] = useState("")
    const [emailBorder, setEmailBorder] = useState("")
    const [jobBorder, setJobBorder] = useState("")
    const [cityBorder, setCityBorder] = useState("")
    const [streetBorder, setStreetBorder] = useState("")
    const [houseBorder, setHouseBorder] = useState("")
    const [aptBorder, setAptBorder] = useState("")
    const [passwordBorder, setPasswordBorder] = useState("")
    const [confirmPasswordBorder, setConfirmPasswordBorder] = useState("")
    const [referralBorder, setReferralBorder] = useState("#243663")
    const [regValues, setRegValues] = useState({})
    const [code, setCode] = useState('')

    const [image, setImage] = useState(null);

    /*  let [fontsLoaded, error] = useFonts({ Assistant_400Regular })
  
      if (!fontsLoaded) {
          return <AppLoading />
      }*/

    const sendRegs = () => {
        //  userAPI.getSMS(999999999999)
        setModalOpen(true)
        console.log(modalOpen)
    }

    const confirm = async () => {
        setModalWrongOpen(false)

        await userAPI.register(regValues, code)
            .then((response) => {
                console.log("REGISTRATION SUCCEEDED")
                //   console.log(response)

            })
            .catch(function (error) {
                console.log("CODE NO GOOD")
                console.log(error);
            })

        await userAPI.login(regValues)
            .then(response => userAPI.saveToken(response.data.access_token))
            .catch(function (error) {
                console.log("LOGIN NO GOOD")
                //  console.log(error);
                //  console.log(regValues)
                Alert.alert('Something went wrong!', "Wrong email/password", [{ text: "Try again", onPress: () => console.log('alert wrong') }])
            })

        await userAPI.sendPic(image)
            .then(res => {
                console.log("SEND PIC")
                console.log(res)
            })

        await userAPI.dashboard()
            .then(data => {
                console.log("DASHBOARD OK")
                dispatch(updateAll(data))
                navigation.navigate('Profile')
            })

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
        console.log("HHHHHHHH")
    }

    const onFormikSubmit = values => {
        if (!values.name) { setNameBorder("red") } else setNameBorder("lightgreen")
        if (!(values.phone && values.phone.length === 12)) { setPhoneBorder("red") } else setPhoneBorder("lightgreen")
        if (!values.email) { setEmailBorder("red") } else setEmailBorder("lightgreen")
        if (!values.job) { setJobBorder("red") } else setJobBorder("lightgreen")
        // if (!values.city) {setCityBorder("red")} else setCityBorder("lightgreen")
        // if (!values.street) {setStreetBorder("red")} else setStreetBorder("lightgreen")
        // if (!values.house) {setHouseBorder("red")} else setHouseBorder("lightgreen")
        // if (!values.apt) {setAptBorder("red")} else setAptBorder("lightgreen")
        if (!values.password) { setPasswordBorder("red") } else setPasswordBorder("lightgreen")

        if (!values.confirmPassword || !(values.password === values.confirmPassword)) { setConfirmPasswordBorder("red") } else setConfirmPasswordBorder("lightgreen")

        if (values.name && values.phone && values.phone.length === 12 && values.email && values.job /*&& values.city 
        && values.street && values.house && value.appt*/ && values.password
            && (values.password === values.confirmPassword)) {
            userAPI.getSMS(values.phone)
            dispatch(setTempImage(image))
            setRegValues(values)
            console.log(regValues)
            console.log("OK")
            setModalOpen(true)
        } else {
            console.log("Not OK")
        }
    }



    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <SmallLayout text="הרשמה">
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalOpen}>
                    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                        <View style={mS.modalBlock}>
                            <View style={mS.innerBlock}>
                                <RegAvatar />
                                <TouchableOpacity style={mS.closeIcon} onPress={() => setModalOpen(false)}>
                                    <CloseIcon />
                                </TouchableOpacity>
                                <View style={mS.titleBlock}>
                                    <Text style={g.text28_700_blue}>שלחנו לך קוד ב-סמס</Text>
                                </View>
                                {true &&
                                    <View style={mS.infoBlock}>
                                        <Text style={g.text24_400_grey}>נא הכנס קוד שקיבלת</Text>
                                    </View>}
                                <View style={mS.inputBlock}>
                                    <AsteriskInput code={code} setCode={setCode} />
                                </View>
                            </View>
                            <ButtonBlue name="כניסה" onPress={confirm} />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <View style={s.registrationBlock}>
                    <CameraAvatar image={image} setImage={setImage} />
                    <View style={s.plug} />
                    <Formik
                        initialValues={{ name: '', phone: '', email: '', job: '', city: '', street: '', house: '', apt: '', password: '', confirmPassword: '', referral: '' }}
                        onSubmit={onFormikSubmit}>
                        {
                            (props) => (
                                <ScrollView style={s.formikBlock} contentContainerStyle={s.formikScrollStyle}>
                                    <View style={s.fieldsBlock}>

                                        <View style={s.personalBlock}>
                                            <Text style={g.text28_700_blue}>
                                                פרטים אישיים
                                            </Text>
                                            <RegInput
                                                onChangeText={props.handleChange('name')}
                                                value={props.values.name}
                                                placeholder="שם מלא"
                                                borderColor={nameBorder}
                                            >
                                                <PersonIcon />
                                            </RegInput>
                                            <RegInput
                                                onChangeText={props.handleChange('phone')}
                                                value={props.values.phone}
                                                keyboardType="number-pad"
                                                placeholder="טלפון"
                                                borderColor={phoneBorder}
                                            >
                                                <PhoneIcon />
                                            </RegInput>
                                            <RegInput
                                                onChangeText={props.handleChange('email')}
                                                value={props.values.email}
                                                placeholder="אימייל"
                                                borderColor={emailBorder}
                                                autoCapitalize="none"
                                            >
                                                <EmailIcon />
                                            </RegInput>
                                            <RegInput
                                                onChangeText={props.handleChange('job')}
                                                value={props.values.job}
                                                placeholder="עיסוק"
                                                borderColor={jobBorder}
                                            >
                                                <JobIcon />
                                            </RegInput>
                                        </View>

                                        <View style={s.personalBlock}>
                                            <Text style={g.text28_700_blue}>
                                                כתובת מגורים
                                            </Text>
                                            <RegInput
                                                onChangeText={props.handleChange('city')}
                                                value={props.values.city}
                                                placeholder="עיר"
                                                borderColor={cityBorder}
                                            >
                                                <PinIcon />
                                            </RegInput>
                                            <RegInput
                                                onChangeText={props.handleChange('street')}
                                                value={props.values.street}
                                                placeholder="רחוב"
                                                borderColor={streetBorder}
                                            >
                                                <PinIcon />
                                            </RegInput>
                                            <View style={s.house}>
                                                <RegInputSmall
                                                    onChangeText={props.handleChange('apt')}
                                                    value={props.values.apt}
                                                    placeholder="מס' דירה"
                                                    keyboardType="number-pad"
                                                    style={{ width: "47%" }}
                                                    borderColor={aptBorder}
                                                >
                                                    <HashIcon />
                                                </RegInputSmall>
                                                <RegInputSmall
                                                    onChangeText={props.handleChange('house')}
                                                    value={props.values.house}
                                                    placeholder="מס' בית"
                                                    keyboardType="number-pad"
                                                    style={{ width: "50%" }}
                                                    borderColor={houseBorder}
                                                >
                                                    <HashIcon />
                                                </RegInputSmall>
                                            </View>
                                        </View>

                                        <View style={s.personalBlock}>
                                            <Text style={g.text28_700_blue}>
                                                מידע אישי
                                            </Text>
                                            <RegInput
                                                onChangeText={props.handleChange('password')}
                                                value={props.values.password}
                                                placeholder="סיסמה"
                                                borderColor={passwordBorder}
                                                autoCapitalize="none"
                                            >
                                                <LockIcon />
                                            </RegInput>
                                            <RegInput
                                                onChangeText={props.handleChange('confirmPassword')}
                                                value={props.values.confirmPassword}
                                                placeholder="אימות סיסמא"
                                                borderColor={confirmPasswordBorder}
                                                autoCapitalize="none"
                                            >
                                                <LockIcon />
                                            </RegInput>

                                            <View style={s.lineOuter}>
                                                <View style={s.line}>
                                                </View>
                                            </View>

                                            <RegInput
                                                onChangeText={props.handleChange('referral')}
                                                value={props.values.referral}
                                                keyboardType="number-pad"
                                                placeholder="טלפון של המזמין לאפליקציה"
                                                borderColor={referralBorder}
                                            >
                                                <ReferalIcon />
                                            </RegInput>
                                        </View>


                                    </View>
                                    <ButtonBlue name="שמור" bottom={73} onPress={props.handleSubmit} />
                                </ScrollView>
                            )
                        }
                    </Formik>
                </View>

            </SmallLayout>
        </TouchableWithoutFeedback>
    );
}

const s = StyleSheet.create({

    registrationBlock: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
        paddingTop: 40,
        paddingBottom: 20,
        // backgroundColor: "brown",
        //  backgroundColor: "#EEEEEE",
    },

    formikScrollStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    plug: {
        position: 'absolute',
        width: "100%",
        height: 400,
        backgroundColor: "#EFEFEF",
        borderRadius: 40,
    },

    formikBlock: {
        paddingTop: 73,
        marginTop: -73,
        width: "100%",
        borderRadius: 40,
        height: Dimensions.get('window').height * 0.58 + 73,
        //  backgroundColor: "lightblue",
        //  backgroundColor: "#FFFFFF",
    },

    fieldsBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
        height: "100%",
        backgroundColor: "#EFEFEF",
        borderRadius: 40,
        paddingBottom: 40,
        //  backgroundColor: "green",
    },

    personalBlock: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        width: "89%",
        paddingBottom: 5,
        //  backgroundColor: "lightgreen",
    },

    house: {
        width: "100%",
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    lineOuter: {
        width: "100%",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },

    line: {
        width: "70%",
        height: 1,
        backgroundColor: "#243663",
    }
});

const mS = StyleSheet.create({

    modalBlock: {
        flex: 1,
        width: "100%",
        height: 300,
        backgroundColor: 'rgba(36, 54, 99, 0.88)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    innerBlock: {
        width: "90%",
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
        width: "100%",
        alignItems: 'center',
        marginTop: 15
    }

})