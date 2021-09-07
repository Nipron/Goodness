import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

import ArrowBlue from '../../Images/ArrowBlue.svg'
import Hands from '../../Images/Hands.svg'
import { g } from "../../styles/global"

import { useNavigation } from '@react-navigation/native'


const SearchInput = ({ code, setCode }) => {

    const [search, setSearch] = useState('')

    const navigation = useNavigation()

    const scaleArrow = 1.3;
    const scaleHands = 1.2;

    const handleChange = value => {
        setSearch(value)
      //  console.log(value)
    }
    

    return (
        <TouchableOpacity style={s.outer} onPress={() => navigation.navigate('Create')} >
        <View style={s.outer}>
            <TextInput style={[s.searchInput, g.text24_400_grey]} textAlign="right"
                placeholder="חיפוש שירות" onChangeText={handleChange} />

            <View style={s.icons} >
                <TouchableOpacity  style={s.arrow}>
                    <ArrowBlue style={{ transform: [{ scaleX: scaleArrow }, { scaleY: scaleArrow }] }} />
                </TouchableOpacity>
                <TouchableOpacity  style={s.hands}>
                    <Hands style={{ transform: [{ scaleX: scaleHands }, { scaleY: scaleHands }] }} />
                </TouchableOpacity>
            </View>

        </View>
        </TouchableOpacity>
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