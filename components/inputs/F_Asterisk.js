import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import Asterisk from '../../Images/Asterisk.svg'
import { g } from '../../styles/global'

const F_Asterisk = ({ number }) =>
    <View style={s.outer}>
        {(number || (number === 0)) ? <Text style={g.text22_400_grey}>{number}</Text> : <Asterisk />}
    </View>

export default F_Asterisk

const s = StyleSheet.create({
    outer: {
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
        justifyContent: "center"
    }
});