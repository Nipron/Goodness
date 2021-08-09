import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert, SafeAreaView, Button, ImageBackground, ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useSelector, useDispatch } from 'react-redux'

import LogoGroup from '../src/LogoGroup';
import ButtonYellow from '../src/ButtonYellow'
import { userAPI } from '../src/api/api';
import LoginLayout from '../components/layouts/LoginLayout2';

import { Formik } from 'formik'

import { useNavigation } from '@react-navigation/native'

import RegInput from '../components/inputs/RegInput';
import PhoneIcon from '../Images/Phone.svg'
import LockIcon from '../Images/LockSm.svg'

import { g } from '../styles/global'
import { updateAll } from '../redux/store';

export default function Login(props) {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [phoneBorder, setPhoneBorder] = useState("")
    const [passwordBorder, setPasswordBorder] = useState("")

    const onFormikSubmit = values => {


        userAPI.login(values)
            .then(response => userAPI.saveToken(response.data.access_token))
            .then(() => userAPI.dashboard()
                .then(data => {
                    dispatch(updateAll(data))
                    navigation.navigate('Profile')
                }))
            .catch(function (error) {
                console.log("LOGIN NO GOOD")
              //  console.log(error);
                Alert.alert('Something went wrong!', "Wrong email/password", [{ text: "Try again", onPress: () => console.log('alert wrong') }])
            })
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <Formik
                initialValues={{ phone: '', password: '' }}
                onSubmit={onFormikSubmit}>
                {
                    (props) => (
                        <LoginLayout >
                            <SafeAreaView style={s.goodnessBlock}>

                                <View style={s.logoBlock}>
                                    <LogoGroup />
                                </View>

                                <View style={s.descriptionBlock}>
                                    <Text style={g.text24_700_white}>כניסת לקוח קיים</Text>
                                </View>

                                <View style={s.inputsBlock}>
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
                                        onChangeText={props.handleChange('password')}
                                        value={props.values.password}
                                        placeholder="סיסמה"
                                        borderColor={passwordBorder}
                                        autoCapitalize="none"
                                    >
                                        <LockIcon />
                                    </RegInput>
                                </View>

                                <TouchableOpacity style={s.forgotPasswordBlock}>
                                    <Text style={g.text20_400_white}>שכחת את הסיסמה?</Text>
                                    <Text style={g.text20_400_white}>כניסה עם קוד חד-פעמי ב-סמס</Text>
                                </TouchableOpacity>

                            </SafeAreaView>
                            <View style={s.yellowButtonBlock}>
                                <ButtonYellow name="כניסה" onPress={props.handleSubmit} />
                            </View>
                        </LoginLayout>
                    )}
            </Formik>
        </TouchableWithoutFeedback>
    );
}

const s = StyleSheet.create({

    goodnessBlock: {
        width: "100%",
        // backgroundColor: "darkgreen",
        alignItems: 'center',
        justifyContent: 'flex-start',

    },

    logoBlock: {
        marginTop: 0
    },

    descriptionBlock: {
        width: "90%",
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //  backgroundColor: "pink"
    },

    inputsBlock: {
        width: "90%",
        marginTop: 10,
        //  backgroundColor: 'red'
    },

    forgotPasswordBlock: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        //  backgroundColor: 'lightblue'
    },

    yellowButtonBlock: {
        width: "100%",
        height: "26%",
        // backgroundColor: "green",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

});