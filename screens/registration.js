import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TextInput, SafeAreaView, Image, Alert, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

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

import SmallLayout2 from '../components/layouts/SmallLayout2';

import { useNavigation } from '@react-navigation/native'

import { setTempImage } from '../redux/tempImageRducer';
import { updateProfileThunk } from '../redux/store'
import { setMessagesThunk } from '../redux/messagesReducer'

import { values } from 'lodash';

import CheckV from '../Images/CheckV.svg'
import CheckCircle from '../Images/CheckCircle.svg'

export default function Registration2() {

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const [modalOpen, setModalOpen] = useState(false)

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

    useEffect(() => {
        if (code && code.length === 5) {
            console.log(code)
            confirm()
        }
        return () => {

        }
    }, [code])

    const [read, setRead] = useState(false)

    const [image, setImage] = useState(null);

    const confirm = async () => {

        try {
            await userAPI.register(regValues, code)

            try {
                const token = await userAPI.login(regValues)

                try {
                    await userAPI.saveToken(token.data.access_token)
                    await userAPI.sendPic(image)
                    dispatch(updateProfileThunk())
                    dispatch(setMessagesThunk())
                    setModalOpen(false)
                    navigation.navigate('Profile')
                } catch (e) {
                    console.log("LOGIN TROUBLE")
                    console.log(e)
                }

            } catch (e) {
                console.log("TOKEN NO GOOD")
                console.log(e)

            }

        } catch (e) {
            console.log("CODE NO GOOD")
            Alert.alert('Something went wrong!', "Wrong SMS code", [{ text: "Try again", onPress: () => console.log(e) }])
        }

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
        const phoneClean = values.phone.replace(/[^\d]/g, '')
        
        const referralClean = values.referral.replace(/[^\d]/g, '')
        if (!phoneClean) { setPhoneBorder("red") } else setPhoneBorder("lightgreen")
        //  if (!values.email) { setEmailBorder("red") } else setEmailBorder("lightgreen")
        if (!values.job || (values.job.length < 3)) { setJobBorder("red") } else setJobBorder("lightgreen")
        // if (!values.city) {setCityBorder("red")} else setCityBorder("lightgreen")
        // if (!values.street) {setStreetBorder("red")} else setStreetBorder("lightgreen")
        // if (!values.house) {setHouseBorder("red")} else setHouseBorder("lightgreen")
        // if (!values.apt) {setAptBorder("red")} else setAptBorder("lightgreen")

        const reg = new RegExp(/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i);
        const containsSymbolAndNuber = reg.test(values.password)

        if ((!values.password) || (values.password.length < 6) || !containsSymbolAndNuber) { setPasswordBorder("red") } else setPasswordBorder("lightgreen")
        if (!values.confirmPassword || !(values.password === values.confirmPassword)) { setConfirmPasswordBorder("red") } else setConfirmPasswordBorder("lightgreen")

        if (values.name.length < 3) {
            Alert.alert("משהו השתבש!", "אורך השם צריך להיות לפחות 3 תווים", [
                {
                    text: 'אישור', onPress: () => {
                        console.log('Name wrong')
                    }
                }
            ])
        } else {
            if (!phoneClean || (phoneClean.length < 10)) {
                Alert.alert("משהו השתבש!", "מספר הטלפון חייב להיות תקף ואורכו לפחות 10 ספרות", [
                    {
                        text: 'אישור', onPress: () => {
                            console.log('Phone wrong')
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
                    if ((values.password.length < 6) || !containsSymbolAndNuber) {
                        Alert.alert("משהו השתבש!", "סיסמה חייבת להיות מורכבת מ-6 תווים לפחות כולל לפחות ספרה 1 ואות 1, מקסימום 20 תווים", [
                            {
                                text: 'אישור', onPress: () => {
                                    console.log('Password incorrect')
                                }
                            }
                        ])
                    } else {
                        if (!values.confirmPassword || !(values.password === values.confirmPassword)) {
                            Alert.alert("משהו השתבש!", "הסיסמה לאישור אינה תואמת", [
                                {
                                    text: 'אישור', onPress: () => {
                                        console.log("Confirm password doesn't match")
                                    }
                                }
                            ])
                        } else {

                            if (!read) {
                                Alert.alert("אישור תנאי שימוש", "אנא קרא ואשר את תנאי השימוש", [
                                    {
                                        text: 'אישור', onPress: () => {
                                            console.log("Term were not read")
                                        }
                                    }
                                ])
                            } else {

                                try {
                                  //  console.log(phoneClean)
                                    const response = await userAPI.isUser(phoneClean)
                                  //  console.log(response.data.exists)
                                    if (response.data.exists) {
                                        Alert.alert(`משהו השתבש!`, `מספר ${phoneClean}+ כבר רשום.`, [
                                            {
                                                text: 'אישור', onPress: () => {
                                                    console.log("USER EXISTS")
                                                }
                                            }
                                        ])

                                    } else {
                                        console.log("NEW USER")

                                        try {
                                            await userAPI.getSMS(phoneClean, values.email)
                                            dispatch(setTempImage(image))
                                            setRegValues({ ...values, phone: phoneClean, referral: referralClean })
                                            setModalOpen(true)
                                        } catch (e) {
                                            Alert.alert("משהו השתבש!", "חשבון עם מספר טלפון זה כבר קיים", [
                                                {
                                                    text: 'אישור', onPress: () => {
                                                        console.log('Phone number already exists')
                                                    }
                                                }
                                            ])
                                        }
                                    }

                                } catch (e) {
                                    console.log("ENDPOINT isUser TROUBLE")
                                }

                            }
                        }
                    }
                }
            }
        }
    }

    const [focus, setFocus] = useState(false)

    return (
        <SmallLayout2 text="הרשמה" hide={true} focus={focus}>
            <View style={s.registrationBlock}>
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

                <CameraAvatar image={image} setImage={setImage} />
                <View style={s.plug} />
                <Formik
                    initialValues={{ name: '', phone: '', email: '', job: '', city: '', street: '', house: '', apt: '', password: '', confirmPassword: '', referral: '' }}
                    onSubmit={onFormikSubmit}>
                    {
                        (props) => (
                            <KeyboardAvoidingView style={s.goodnessBlock} behavior={Platform.OS === "ios" ? "padding" : "height"} >
                                <ScrollView style={s.formikBlock} keyboardDismissMode='on-drag'  contentContainerStyle={s.formikScrollStyle} keyboardShouldPersistTaps="always">
                                    <View style={s.fieldsBlock}>

                                        <View style={s.personalBlock}>
                                            <Text style={g.text24_700_blue}>
                                                פרטים אישיים
                                            </Text>
                                            <RegInput
                                                onChangeText={props.handleChange('name')}
                                                value={props.values.name}
                                                placeholder="שם מלא"
                                                borderColor={nameBorder}
                                                setFocus={setFocus}
                                            >
                                                <PersonIcon />
                                            </RegInput>
                                            <RegInput
                                                onChangeText={props.handleChange('phone')}
                                                value={props.values.phone}
                                                keyboardType="phone-pad"
                                                placeholder="+972 54 1234567"
                                                borderColor={phoneBorder}
                                                setFocus={setFocus}
                                            >
                                                <PhoneIcon />
                                            </RegInput>
                                            <RegInput
                                                onChangeText={props.handleChange('email')}
                                                value={props.values.email}
                                                placeholder="אימייל"
                                                borderColor={emailBorder}
                                                autoCapitalize="none"
                                                setFocus={setFocus}
                                                maxLength={30}
                                            >
                                                <EmailIcon />
                                            </RegInput>
                                            <RegInput
                                                onChangeText={props.handleChange('job')}
                                                value={props.values.job}
                                                placeholder="עיסוק"
                                                borderColor={jobBorder}
                                                setFocus={setFocus}
                                            >
                                                <JobIcon />
                                            </RegInput>
                                        </View>

                                        <View style={s.personalBlock}>
                                            <Text style={g.text24_700_blue}>
                                                כתובת מגורים
                                            </Text>
                                            <RegInput
                                                onChangeText={props.handleChange('city')}
                                                value={props.values.city}
                                                placeholder="עיר"
                                                borderColor={cityBorder}
                                                setFocus={setFocus}
                                            >
                                                <PinIcon />
                                            </RegInput>
                                            <RegInput
                                                onChangeText={props.handleChange('street')}
                                                value={props.values.street}
                                                placeholder="רחוב"
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
                                                    // keyboardType="number-pad"
                                                    style={{ width: "47%" }}
                                                    borderColor={aptBorder}
                                                    setFocus={setFocus}
                                                >
                                                    <HashIcon />
                                                </RegInputSmall>
                                                <RegInputSmall
                                                    onChangeText={props.handleChange('house')}
                                                    value={props.values.house}
                                                    placeholder="מס' בית"
                                                    // keyboardType="number-pad"
                                                    style={{ width: "50%" }}
                                                    borderColor={houseBorder}
                                                    setFocus={setFocus}
                                                >
                                                    <HashIcon />
                                                </RegInputSmall>
                                            </View>
                                        </View>

                                        <View style={s.personalBlock}>
                                            <Text style={g.text24_700_blue}>
                                                מידע אישי
                                            </Text>
                                            <RegInput
                                                onChangeText={props.handleChange('password')}
                                                value={props.values.password}
                                                placeholder="סיסמה"
                                                borderColor={passwordBorder}
                                                autoCapitalize="none"
                                                secureTextEntry={true}
                                                setFocus={setFocus}
                                            >
                                                <LockIcon />
                                            </RegInput>
                                            <RegInput
                                                onChangeText={props.handleChange('confirmPassword')}
                                                value={props.values.confirmPassword}
                                                placeholder="אימות סיסמה"
                                                borderColor={confirmPasswordBorder}
                                                autoCapitalize="none"
                                                secureTextEntry={true}
                                                setFocus={setFocus}
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
                                                keyboardType="phone-pad"
                                                placeholder="טלפון של המזמין לאפליקציה"
                                                borderColor={referralBorder}
                                                setFocus={setFocus}
                                            >
                                                <ReferalIcon />
                                            </RegInput>
                                        </View>
                                    </View>
                                    <ButtonBlue name="שמור" bottom={73} onPress={props.handleSubmit} />
                                    <View style={s.plug2} />
                                </ScrollView>

                            </KeyboardAvoidingView>
                        )
                    }
                </Formik>
            </View>
            <TouchableOpacity style={s.termsBlock} onPress={() => navigation.navigate('Terms')}>
                <Text style={[g.text18_400_grey, s.terms]}>תנאי שימוש  </Text>
                <TouchableOpacity style={s.checkBlock} onPress={() => setRead(!read)}>
                    <CheckCircle />
                    {read && <CheckV style={s.v} />}
                </TouchableOpacity>
            </TouchableOpacity>
        </SmallLayout2 >
    );
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
      //  width: "100%",
        height: 30,
        //   backgroundColor: "pink",
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
        //   backgroundColor: "orange"
    },

    bottomPlug: {
        width: "100%",
        height: 200,
        // backgroundColor: "red"
    },

    outer: {
        //   backgroundColor: "green",
        paddingBottom: 100,
        width: "100%",
        flex: 1
    },


    registrationBlock: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
        flex: 1,
        //  paddingBottom: 120,
        //     backgroundColor: "olive",
        //  backgroundColor: "#EEEEEE",
    },

    formikScrollStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    plug: {
        position: 'absolute',
        width: "100%",
        marginTop: -55,
      //  height: Dimensions.get('window').height * 0.585,
        height: 200,
        backgroundColor: "#EFEFEF",
       //    backgroundColor: "pink",
        borderRadius: 40,
    },

    goodnessBlock: {
        //    backgroundColor: "yellow",
        width: "100%",
        // paddingBottom: 250,
        // marginBottom: 150,
        flex: 1
    },

    formikBlock: {
        paddingTop: 73,
        marginTop: -73,
        width: "100%",
        borderRadius: 40,
        height: Dimensions.get('window').height * 0.58 + 73,
        // marginBottom: 200,      
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