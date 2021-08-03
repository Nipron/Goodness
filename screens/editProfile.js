import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

import ButtonBlue from '../src/ButtonBlue';
import { userAPI } from '../src/api/api';
import RegAvatar from '../components/avatars/RegAvatar';

import CloseIcon from '../Images/CloseIcon'
import { g } from '../styles/global'
import { updateAll } from '../redux/store';
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

import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function EditProfile() {

    const info = useSelector(state => state.all)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    console.log("ZZZZZ")
    console.log(info.address.apt)

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
            userAPI.update(values)
                .then(() => userAPI.dashboard()
                    .then(data => {
                        console.log(data)
                        dispatch(updateAll(data))
                        navigation.navigate('Profile')
                    }))
        } else {
            console.log("Not OK")
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <SmallLayout text="הרשמה">

                <View style={s.registrationBlock}>
                    <CameraAvatar />
                    <View style={s.plug} />
                    <Formik
                        initialValues={{
                            id: info.id,
                            name: info.name,
                            phone: info.phone,
                            email: info.email,
                            job: info.job,
                            city: info.address.city,
                            street: info.address.street,
                            house: info.address.house,
                            apt: info.address.apt,
                            password: '', confirmPassword: ''
                        }}
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