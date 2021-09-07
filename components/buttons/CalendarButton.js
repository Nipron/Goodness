import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';

import { g } from '../../styles/global'

import Date from '../../Images/Date.svg'
import Arrow from '../../Images/Arrow.svg'

import moment from 'moment'

const CalendarButton = ({ date, onPress }) => {

    const scaleDate = 1.8
    const scaleArrow = 1.4 

    return (
        <View style={s.outer}>
            <TouchableOpacity style={s.header} onPress={onPress}>
                <View style={s.arrow}>
                    <Arrow style={{ transform: [{ scaleX: scaleArrow }, { scaleY: scaleArrow }/*, { rotate: open ? "90deg" : "0deg" }*/] }} />
                </View>
                <View style={s.name}>
                    <Text style={[g.text24_700_blue, s.text]}>{!!date ? moment(date.dateString).format('L') : "תבחר תאריך"}</Text>
                    <Date style={{ transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }] }} />
                </View>
            </TouchableOpacity>            
        </View>
    )
}

export default CalendarButton

const s = StyleSheet.create({

    outer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
        //   backgroundColor: "maroon",
        //  borderRadius: 20,
        backgroundColor: "#EEEEEE",
        borderRadius: 25,
        marginVertical: 12
    },

    header: {
        width: "100%",
        height: 50,
        borderRadius: 25,
        //  backgroundColor: "tan",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    arrow: {
        //   backgroundColor: "ivory",
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16
    },

    name: {
        //   backgroundColor: "pink",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 16
    },

    text: {
        paddingRight: 8
    },

    cards: {
        width: "95%",
        //  backgroundColor: "pink",
        paddingHorizontal: 8
    }

})

