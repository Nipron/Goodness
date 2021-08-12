import React from 'react';
import { Dimensions, StyleSheet, Text, View, SafeAreaView, TextInput, Image, ScrollView, Pressable, Alert, Button, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import Bender from '../../Images/Bender.jpg'

import Footer from '../footer/Footer';
import ArrowBack from '../../Images/ArrowBack.svg'

import { g } from '../../styles/global'

export default function SmallLayout(props) {

    const navigation = useNavigation()

    const data = useSelector(state => state.all)   

    const scale = 1.5;

    return (
        <KeyboardAvoidingView style={s.containerMain} behavior="padding">
            <View style={s.background}>
                <ImageBackground source={require('../../Images/BackgroundSmall.png')}
                    style={s.imageBack}>
                    <SafeAreaView style={s.safeContainer}>
                        <TouchableOpacity style={s.arrowContainer} onPress={() => navigation.goBack()}>
                            <ArrowBack style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
                        </TouchableOpacity>

                        {!props.hide && 

                        <TouchableOpacity style={s.photoOuter} onPress={() => navigation.navigate('Profile')}>
                            <View style={s.photoInner}>
                                <ImageBackground source={!!data.avatar ? { uri: `http://52.48.233.122:3000/${data.avatar.path}` } : Bender}
                                    style={s.avatar} />
                            </View>
                        </TouchableOpacity> }
                    </SafeAreaView>
                    <View style={s.logoBlock}>
                        <Image style={s.logo} source={require('../../Images/Logo1.png')} />
                        <Text style={g.text24_700_white}>{props.text}</Text>
                    </View>
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
        height: "32.5%",
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
        resizeMode: 'cover'
    },

    safeContainer: {
        height: "100%",
        width: "100%",
        flexDirection: 'row',
        alignItems: "flex-start",
        justifyContent: 'space-between',
     //   backgroundColor: "red"
    },

    arrowContainer: {
        width: 60,
        height: 40,
        //   backgroundColor: "maroon",
        alignItems: "flex-end",
        justifyContent: 'flex-end',

    },

    logoBlock: {
        marginTop: -230,        
        height: 80,
        alignItems: 'center',
        justifyContent: 'flex-end',
      //      backgroundColor: 'green'
    },

    logo: {
        width: 50,
        height: 50,
    },

    childrenBlockOuter: {
        width: "88%",
        height: Dimensions.get('window').height * 0.555 + 70,
        marginTop: -70,
        //   backgroundColor: "magenta",
        alignItems: "center",
        justifyContent: 'flex-start',
    },

    photoOuter: {
        zIndex: 2,
        width: 60,
        height: 60,
        borderRadius: 40,
        backgroundColor: "#FDC27A",
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
    },
    photoInner: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: "#034794",
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },

    avatar: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover'
    }

});