import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, ScrollView, Pressable, Alert, Button, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, Keyboard } from 'react-native';
import ButtonBlue from '../../src/ButtonBlue';
import Footer from '../footer/Footer';

export default function BigLayout(props) {
    return (
        <KeyboardAvoidingView style={s.containerMain} behavior="padding">
            <View style={s.containerBlu}>
                <ImageBackground source={require('../../Images/Background.png')} resizeMode="cover" style={s.background}>
                    {props.children}
                </ImageBackground>
            </View>
            <ButtonBlue name="הרשמה" />
            <Footer />
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
        justifyContent: "center",
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: 'hidden',
    }
});