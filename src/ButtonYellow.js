import React from 'react';
import { StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';


import {
    Assistant_700Bold
} from '@expo-google-fonts/assistant';

const ButtonYellow = props => {
    return (
        <TouchableOpacity style={[s.button, props.style]} onPress={props.onPress}>
            <Text style={s.text}>{props.name}</Text>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    button: {
        height: 52,
        width: "60%",
        borderRadius: 26,       
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FECB07",
        shadowOffset: {
            width: 3,
            height: 3
          },
          shadowOpacity: 0.3,
          // shadowColor: "blue",
          shadowRadius: 4
    },
    text: {
        marginTop: 6,
        fontFamily: "Assistant_700Bold",
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 18,
    }
});

export default ButtonYellow
