import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { g } from '../../styles/global'

import SearchWhite from '../../Images/SearchWhite.svg'
import SearchGrey from '../../Images/SearchGrey.svg'
import Hands from '../../Images/Hands.svg'

const SearchSwitch = ({ createMode, setCreateMode }) => {

    const scaleSearch = 1.5;
    const scaleHands = 1.5;
    const scaleHandsGrey = 1.5;

    return (
        <View style={s.outer}>
            {!createMode && <View style={s.switchBlock}>
                <View style={s.searchBlock}>
                    <Text style={[g.text20_400_white, s.switchText]}>חיפוש שירות</Text>
                    <SearchWhite style={[{ transform: [{ scaleX: scaleSearch }, { scaleY: scaleSearch }] }, s.searchIcon]} />
                </View>
                <TouchableOpacity style={s.createPress} onPress={() => setCreateMode(!createMode)}>
                    <Text style={[g.text20_400_grey, s.switchText]}>הצעת שירות</Text>
                    <Hands style={[{ transform: [{ scaleX: scaleHandsGrey }, { scaleY: scaleHandsGrey }] }, s.searchIcon]} />
                </TouchableOpacity >
            </View>
            }
            {createMode && <View style={s.switchBlock}>
                <TouchableOpacity style={s.searchPress} onPress={() => setCreateMode(!createMode)}>
                    <Text style={[g.text20_400_grey, s.switchText]}>חיפוש שירות</Text>
                    <SearchGrey style={[{ transform: [{ scaleX: scaleSearch }, { scaleY: scaleSearch }] }, s.searchIcon]} />
                </TouchableOpacity >
                <View style={s.createBlock}>
                    <Text style={[g.text20_400_blue, s.switchText]}>הצעת שירות</Text>
                    <Hands style={[{ transform: [{ scaleX: scaleHands }, { scaleY: scaleHands }] }, s.searchIcon]} />
                </View>
            </View>
            }
        </View>
    )
}


export default SearchSwitch

const s = StyleSheet.create({

    outer: {
        width: "100%",
        height: "100%",
        //  backgroundColor: "navy",
        alignItems: 'center',
        justifyContent: 'center',
    },

    switchBlock: {
        width: "86%",
        height: 60,
        borderRadius: 30,
        backgroundColor: "#EFEFEF",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 7
    },

    switchText: {
        marginTop: -4
    },

    searchBlock: {
        width: "50%",
        height: 46,
        borderRadius: 23,
        backgroundColor: "#3993D6",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchIcon: {
        marginHorizontal: 6
    },

    createPress: {
        width: "50%",
        height: "50%",
      // backgroundColor: "sienna",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },

    greyHands: {
       
    },

    searchPress: {
        width: "50%",
        height: "50%",
        //  backgroundColor: "sienna",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },

    createBlock: {
        width: "50%",
        height: 46,
        borderRadius: 23,
        backgroundColor: "#FECB07",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        
    },



});