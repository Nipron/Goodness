import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

import PinBlue from '../../Images/PinBlue.svg'
import SearchBlue from '../../Images/SearchBlue.svg'
import { g } from "../../styles/global"

import { useNavigation } from '@react-navigation/native'


const SearchPlaceInput = (props) => {

    const [search, setSearch] = useState('')

    const navigation = useNavigation()

    const [place, setPlace] = useState(null)

    const scaleArrow = 1.3;
    const scaleSearchBlue = 0.9;

    const apiKey = "BLTyOOeZHWve6hMMxyEXwkNx-vV4I7Blasgqvk62ZGJfj_dizexqUNWeadUxsB3ki9am0lsRwn8PctNN-NCQ1L8"

    const handleChange = async value => {
        setPlace(value);
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
        &input=${place}&location=32,34.8&radius=5000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json()
            console.log(json)
        } catch (e) {
            console.log(e)
        }
    }   

    const handleSearch = () => {
        console.log("PRESSED HandeSearch from LocationMap")
    }

    return (
        <View style={s.outer}>
          {/*  <TextInput style={[s.searchInput, g.text24_400_grey]} textAlign="right"
                placeholder="מיקום החיפוש" onChangeText={value => handleChange(value)} />*/}

            <View style={s.icons} pointerEvents='box-none'>
                <View style={s.pin}>
                    <PinBlue style={{ transform: [{ scaleX: scaleArrow }, { scaleY: scaleArrow }] }} />
                </View>
                <TouchableOpacity onPress={handleSearch} style={s.search}>
                    <SearchBlue style={{ transform: [{ scaleX: scaleSearchBlue }, { scaleY: scaleSearchBlue }] }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchPlaceInput

const s = StyleSheet.create({

    outer: {
        width: '100%',
        height: 50,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: "lightblue",
    },

    searchInput: {
        backgroundColor: 'white',
        borderRadius: 16,
        height: "100%",
        width: '100%',
        fontSize: 20,
        paddingRight: 60,
        borderWidth: 1,
        borderColor: "#243663"
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

    pin: {
        width: 42,
        height: 42,
        borderRadius: 21,
        //   backgroundColor: "#FDC27A",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 0
    },

    search: {
        width: 30,
        height: 30,
        borderRadius: 21,
        // backgroundColor: "green",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "lightgrey",
        marginRight: 10
    },


});