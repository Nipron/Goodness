import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import { g } from "../../styles/global"

const RegInputSmall = (props) => {    

    return (
        <View style={[props.style, s.outer]} behavior="height">
            <TextInput style={[s.input, g.text20_400_blue,
            { borderColor: props.borderColor ? props.borderColor : "rgba(255, 255, 255, 0.0)" }]}
                textAlign="right"
                keyboardType={props.keyboardType ? props.keyboardType : "default"}
                onChangeText={props.onChangeText}
                value={props.value.toString()}
                placeholder={props.placeholder}
                placeholderTextColor="#CCCCCC"
            >
            </TextInput>
            <View style={s.icon}>
                <View style={s.svg}>
                    {props.children}
                </View>
            </View>
        </View>
    )
}

export default RegInputSmall

const s = StyleSheet.create({

    outer: {
        position: 'relative',
        //  backgroundColor: "red",
        marginVertical: 5,
        height: 50,
        alignItems: 'flex-end',
        justifyContent: "center",
    },

    input: {
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 1,
        height: "100%",
        width: '100%',
        fontSize: 16,
        position: 'absolute',
        top: 0,
        left: 0,
        paddingRight: 60
    },

    icon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "lightgrey",
        shadowOffset: { width: 4, height: 4 },
        shadowRadius: 25,
        shadowColor: '#000',
        shadowOpacity: 0.19,
        alignItems: 'center',
        justifyContent: "center",
        marginRight: 12,
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
    },

});