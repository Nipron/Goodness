import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Pressable, Alert, Button, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, Keyboard } from 'react-native';
import ButtonBlue from '../../src/ButtonBlue';
import FooterLogin from '../footer/FooterLogin';

import { useNavigation } from '@react-navigation/native'

export default function LoginLayout(props) {

    const navigation = useNavigation()

    return (
        <KeyboardAvoidingView style={s.containerMain} behavior="padding">
            <View style={s.containerBlu}>
                <ImageBackground source={require('../../Images/Background.png')}
                    resizeMethod={'cover'} style={s.background}>
                    {props.children}
                </ImageBackground>
            </View>
            <ButtonBlue name="הרשמה" bottom={0} onPress={() => navigation.navigate('Registration')} />
            <FooterLogin />
        </KeyboardAvoidingView>
    );
}

const s = StyleSheet.create({
    containerMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    containerBlu: {
        height: "88%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    background: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: 'hidden',
    }
});