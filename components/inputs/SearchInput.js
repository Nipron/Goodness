import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

import ArrowBlue from '../../Images/ArrowBlue.svg'
import Hands from '../../Images/Hands.svg'
import { g } from "../../styles/global"


const SearchInput = ({ code, setCode }) => {

    const [search, setSearch] = useState('')

    const scaleArrow = 1.3;
    const scaleHands = 1.2;

    const handleChange = value => {
        setSearch(value)
        console.log(value)
    }

    return (
        <View style={s.outer}>
            <TextInput style={[s.searchInput, g.text24_400_grey]} textAlign="right"
                placeholder="חיפוש שירות" onChangeText={handleChange} />

            <View style={s.icons} pointerEvents='none'>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={s.arrow}>
                    <ArrowBlue style={{ transform: [{ scaleX: scaleArrow }, { scaleY: scaleArrow }] }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={s.hands}>
                    <Hands style={{ transform: [{ scaleX: scaleHands }, { scaleY: scaleHands }] }} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default SearchInput

const s = StyleSheet.create({

    outer: {
        width: '100%',
        height: 60,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',
       // backgroundColor: "lightblue",
    },

    searchInput: {
        backgroundColor: 'white',
        borderRadius: 30,
        height: "100%",
        width: '100%',
        fontSize: 20,
        paddingRight: 60
    },

    icons: {
        width: "100%",
        height: "100%",
        position: 'absolute',
        //  backgroundColor: "pink",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    arrow: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: "#FDC27A",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 9
    },

    hands: {
        width: 42,
        height: 42,
        borderRadius: 21,
       // backgroundColor: "green",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "lightgrey",
        marginRight: 9
    },


});