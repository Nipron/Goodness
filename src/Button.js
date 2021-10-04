import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
//import {AppLoading} from "expo";
import AppLoading from 'expo-app-loading';

const Button = props => {
    return (
        <Pressable style={[s.button, { backgroundColor: props.color }]}>
            <Text style={[s.text, {color: props.textColor}]}>{props.name}</Text>
        </Pressable>
    );
}

const s = StyleSheet.create({
    button: {
        height: 52,
        width: "60%",
        borderRadius: 26,
        top: -26,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#FFFFFF",
        borderWidth: 2,
        shadowOffset: {
            width: 3,
            height: 3
          },
          shadowOpacity: 0.3,
          // shadowColor: "blue",
          shadowRadius: 4
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        lineHeight: 24,
    }
});

export default Button
