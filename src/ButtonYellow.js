import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';


import {
    Assistant_700Bold
} from '@expo-google-fonts/assistant';

const ButtonYellow = props => {
    return (
        <Pressable style={[s.button, props.style]} onPress={props.onPress}>
            <Text style={s.text}>{props.name}</Text>
        </Pressable>
    );
}

const s = StyleSheet.create({
    button: {
        height: 52,
        width: "60%",
        borderRadius: 26,       
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FECB07"
    },
    text: {
        marginTop: 6,
        fontFamily: "Assistant_700Bold",
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 24,
    }
});

export default ButtonYellow
