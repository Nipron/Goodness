import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';

const PeriodsPanel = ({ period, setPeriod }) => {

    

    const color1 = "green"
    const color2 = "lightgrey"
    const color3 = "white"
    const color4 = "grey"

    return (
        <View style={s.outer}>
            <TouchableOpacity style={[s.periodContainer, { backgroundColor: period === "morning" ? color1 : color2 }]}
                onPress={() => setPeriod("morning")}>
                <Text style={{ fontWeight: period === "morning" ? "bold" : "nornal", color: period === "morning" ? color3 : color4 }}>8 - 12</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.periodContainer, { backgroundColor: period === "lunch" ? color1 : color2 }]}
                onPress={() => setPeriod("lunch")}>
                <Text style={{ fontWeight: period === "lunch" ? "bold" : "nornal", color: period === "lunch" ? color3 : color4 }}>12 - 16</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.periodContainer, { backgroundColor: period === "lunch" ? color1 : color2 }]}
                onPress={() => setPeriod("lunch")}>
                <Text style={{ fontWeight: period === "lunch" ? "bold" : "nornal", color: period === "lunch" ? color3 : color4 }}>16 - 22</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.periodContainer, { backgroundColor: period === "lunch" ? color1 : color2 }]}
                onPress={() => setPeriod("lunch")}>
                <Text style={{ fontWeight: period === "lunch" ? "bold" : "nornal", color: period === "lunch" ? color3 : color4 }}>Any time</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PeriodsPanel

const s = StyleSheet.create({

    outer: {
        width: '100%',
        height: 60,
        backgroundColor: "ivory",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },

    periodContainer: {
        width: "22%",
        height: 30,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    }
});