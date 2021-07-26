import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';


import {
    Assistant_700Bold
} from '@expo-google-fonts/assistant';

const ButtonBlue = props => {
    return (
        <Pressable style={[s.button, {marginBottom: props.bottom}]}  onPress={props.onPress}>
            <Text style={s.text}>{props.name}</Text>
        </Pressable>
    );
}

const s = StyleSheet.create({
    button: {
        marginTop: -26,
        height: 52,
        width: "60%",
        borderRadius: 26,        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#3993D6",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        zIndex: 10,
    },
    text: {
        marginTop: 6,
        fontFamily: "Assistant_700Bold",
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 24,
    }
});

export default ButtonBlue
