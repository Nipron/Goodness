import React from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, TextInput, Image, ScrollView, Pressable, Alert, Button, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import Footer from '../footer/Footer';
import ArrowBack from '../../Images/ArrowBack.svg'
import Burger from '../../Images/Burger.svg'

import { g } from '../../styles/global'

export default function SmallLayout(props) {

    const navigation = useNavigation()

    const scale = 1.5;

    return (
        <KeyboardAvoidingView style={s.containerMain} behavior="padding">
            <View style={s.background}>
                <ImageBackground source={require('../../Images/BackgroundSmall.png')}
                    resizeMethod={'cover'} style={s.imageBack}>
                    <SafeAreaView style={s.safeContainer}>

                        <TouchableOpacity style={s.arrowContainer} onPress={() => navigation.goBack()}>
                            <ArrowBack style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
                        </TouchableOpacity>

                        <View style={s.logoBlock}>
                            <Image style={s.logo} source={require('../../Images/Logo1.png')} />
                            <Text style={g.text24_700_white}>{props.text}</Text>
                        </View>

                        <TouchableOpacity style={s.burgerContainer} onPress={() => navigation.navigate('Home')}>
                            <Burger style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
                        </TouchableOpacity>

                    </SafeAreaView>
                </ImageBackground>
            </View>

            <View style={s.childrenBlockOuter}>
                {props.children}
            </View>

            <Footer />

        </KeyboardAvoidingView>
    );
}

const s = StyleSheet.create({

    containerMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: "white"
    },

    background: {
        width: "100%",
        // height: Dimensions.get('window').height * 0.3,
        height: "30%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: 'hidden',
    },

    imageBack: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: 'flex-start',
    },

    safeContainer: {
        height: "100%",
        width: "100%",
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: 'space-between',
    },

    arrowContainer: {
        width: 60,
        height: 40,
     //   backgroundColor: "maroon",
        alignItems: "flex-end",
        justifyContent: 'flex-end',

    },

    burgerContainer: {
        width: 60,
        height: 40,
    //    backgroundColor: "purple",
        alignItems: "flex-start",
        justifyContent: 'flex-end',

    },

    logoBlock: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-end',
    //    backgroundColor: 'green'
    },

    logo: {
        width: 50,
        height: 50, 
    },

    childrenBlockOuter: {
        width: "88%",
        height: Dimensions.get('window').height * 0.58 + 70,
        marginTop: -70,
     //   backgroundColor: "magenta",
        alignItems: "center",
        justifyContent: 'flex-start',
    },

});