import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import { g } from "../../styles/global"
import Person from '../../Images/Person.svg'

const RegInput = (props) => {

    //   const [value, setValue] = useState(null)

    return (
        <KeyboardAvoidingView style={s.outer} behavior="height">
            <TextInput style={[s.input, g.text24_400_blue,
            { borderColor: props.borderColor ? props.borderColor : "rgba(255, 255, 255, 0.0)" }]}
                textAlign="right"
                keyboardType={props.keyboardType ? props.keyboardType : "default"}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                placeholderTextColor="#90949C"
                autoCapitalize={props.autoCapitalize}
            >
            </TextInput>
            <View style={s.icon}>
                <View style={s.svg}>
                    {props.children}
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegInput

const s = StyleSheet.create({

    outer: {
        width: '100%',
        position: 'relative',
        //  backgroundColor: "red",
        marginVertical: 5,
        height: 60,
        alignItems: 'flex-end',
        justifyContent: "center",
    },

    input: {
        backgroundColor: 'white',
        borderRadius: 30,
        borderWidth: 1,
        height: 60,
        width: '100%',
        fontSize: 18,
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