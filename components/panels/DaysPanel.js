import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

const DaysPanel = ({ days, setDays }) => {

    const handleClick = day => {        
        let newDays = [...days]
        newDays[day] = !newDays[day]
        setDays(newDays)
    }

    const color1 = "#3993D6"
    const color2 = "white"
    const color3 = "white"
    const color4 = "black"

    return (
        <View style={s.outer}>
            <TouchableOpacity style={[s.dayContainer, { backgroundColor: days[0] ? color1 : color2 }]}
                onPress={() => handleClick(0)}>
                <Text style={{fontSize: 30, fontWeight: days[0] ? "bold" : "normal", color: days[0] ? color3 : color4}}>א</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={[s.dayContainer, { backgroundColor: days[1] ? color1 : color2 }]}
                onPress={() => handleClick(1)}>
                <Text style={{fontSize: 30, fontWeight: days[1] ? "bold" : "normal", color: days[1] ? color3 : color4}}>ב</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.dayContainer, { backgroundColor: days[2] ? color1 : color2 }]}
                onPress={() => handleClick(2)}>
                <Text style={{fontSize: 30, fontWeight: days[2] ? "bold" : "normal", color: days[2] ? color3 : color4}}>ג</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.dayContainer, { backgroundColor: days[3] ? color1 : color2 }]}
                onPress={() => handleClick(3)}>
                <Text style={{fontSize: 30, fontWeight: days[3] ? "bold" : "normal", color: days[3] ? color3 : color4}}>ד</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.dayContainer, { backgroundColor: days[4] ? color1 : color2 }]}
                onPress={() => handleClick(4)}>
                <Text style={{fontSize: 30, fontWeight: days[4] ? "bold" : "normal", color: days[4] ? color3 : color4}}>ה</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.dayContainer, { backgroundColor: days[5] ? color1 : color2 }]}
                onPress={() => handleClick(5)}>
                <Text style={{fontSize: 30, fontWeight: days[5] ? "bold" : "normal", color: days[5] ? color3 : color4}}>ו</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.dayContainer, { backgroundColor: days[6] ? color1 : color2 }]}
                onPress={() => handleClick(6)}>
                <Text style={{fontSize: 30, fontWeight: days[6] ? "bold" : "normal", color: days[6] ? color3 : color4}}>ש</Text>
            </TouchableOpacity>               
        </View>
    )
}

export default DaysPanel

const s = StyleSheet.create({

    outer: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        overflow: "hidden",
        backgroundColor: "ivory",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginVertical: 5,
    },

    dayContainer: {
        width: "14.4%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#243663"
    }
});