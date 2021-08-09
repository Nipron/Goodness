import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import { g } from '../../styles/global';

const ButtonYellowSelect = props => {
    return (
        <Pressable style={[s.button, { marginBottom: props.bottom }]} onPress={props.onPress}>
            <Text style={[g.text24_700_blue, s.text]}>{props.name}</Text>
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
        backgroundColor: "#FECB07",
        borderColor: "#FFFFFF",
        borderWidth: 2,
    },

    text: {
        marginTop: -2,        
    }
});

export default ButtonYellowSelect
