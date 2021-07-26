import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { g } from '../../styles/global'

const MessageSimple = ({ text }) =>
    <TouchableOpacity style={s.messageOuter}>
        <Text style={g.text28_700_blue}>{text}</Text>
        <Image style={s.avatar} source={require('../../Images/Logo1.png')} />
    </TouchableOpacity>

export default MessageSimple

const s = StyleSheet.create({

    avatar: {
        width: 40,
        height: 40
    },

    messageOuter: {
        width: "100%",
        backgroundColor: "#FFFFFF",
        height: 80,
        borderRadius: 6,
        borderWidth: 1,
        margin: 8,
        borderColor: "lightgrey",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",

    }
});