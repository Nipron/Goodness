import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { g } from '../../styles/global'

const AmountPanel = ({ amount, setAmount }) => {

    const increase = () => {
        if (amount < 10) {
            setAmount(amount + 1)
        }
    }

    const decrease = () => {
        if (amount > 1) {
            setAmount(amount - 1)
        }
    }

    return (
        <View style={s.outer}>
            <TouchableOpacity style={s.signContainer}
                onPress={increase}>
                <Text style={[g.text28_700_blue, s.signs]}>+</Text>
            </TouchableOpacity>
            <Text style={g.text28_700_blue}>{amount}</Text>
            <TouchableOpacity style={s.signContainer}
                onPress={decrease}>
                <Text style={[g.text28_700_blue, s.signs]}>-</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AmountPanel

const s = StyleSheet.create({

    outer: {
        width: '49%',
        height: 50,
        borderRadius: 25,
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: "#243663"
    },

    signContainer: {
        width: 36,
        height: 26,
        borderRadius: 13,
        backgroundColor: "#3993D6",
        alignItems: "center",
        justifyContent: "center",
     //   borderWidth: 1,
     //   borderColor: "#243663"
    },

    signs: {
        marginTop: -6,
        color: "white"
    }
});