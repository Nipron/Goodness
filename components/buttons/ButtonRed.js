import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { g } from '../../styles/global';

const ButtonRed = props => {
    return (
        <Pressable style={[s.button, { marginBottom: props.bottom }]} onPress={props.onPress}>
            <Text style={[g.text24_700_white, s.text]}>{props.name}</Text>
        </Pressable>
    );
}

const s = StyleSheet.create({
    button: {
        marginTop: -26,
        height: 52,
        width: "70%",
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#B83E3E",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        zIndex: 10,
    },

    text: {
        marginTop: -2,        
    }
});

export default ButtonRed
