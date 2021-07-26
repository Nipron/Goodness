import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Assistant_700Bold } from '@expo-google-fonts/assistant';

 const LogoGroup = () => {

    let [fontsLoaded, error] = useFonts({ Assistant_700Bold })

    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        console.log(error)
    }

    return (
        <View style={s.logoBlock}>
            <Image style={s.logo} source={require('../Images/Logo1.png')} />
            <Text style={s.textGOODNESS}>GOODNESS</Text>
        </View>
    );
}

const s = StyleSheet.create({
    logoBlock: {
        height: 210,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    logo: {
        width: 140,
        height: 140
    },
    textGOODNESS: {
        fontFamily: "Assistant_700Bold",
        color: 'white',
        marginTop: 10,
        fontSize: 45
    }
});

export default LogoGroup
