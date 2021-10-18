import React from 'react';
import { StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import { g } from '../../styles/global';

const ButtonYellowSelect = props => {
    return (
        <TouchableOpacity style={[s.button, { marginBottom: props.bottom }]} onPress={props.onPress}>
            <Text style={[g.text24_700_blue, s.text]}>{props.name}</Text>
        </TouchableOpacity>
    );
}

const s = StyleSheet.create({
    button: {
        height: 52,
        width: "48%",
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FECB07",
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
        marginTop: -2,        
    }
});

export default ButtonYellowSelect
