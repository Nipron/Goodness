import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const PeriodsPanel = ({ period, setPeriod }) => {

    const color1 = "#3993D6"
    const color2 = "white"
    const color3 = "white"
    const color4 = "black"

    const morning = "8-12"
    const lunch = "12-16"
    const evening = "16-22"
    const day = "כל היום"

    return (
        <View style={s.outer}>
            <TouchableOpacity style={[s.periodContainer, { backgroundColor: period === morning ? color1 : color2 }]}
                onPress={() => setPeriod(morning)}>
                <Text style={{ fontSize: 12, fontWeight: period === morning ? "bold" : "normal", color: period === morning ? color3 : color4 }}>{morning}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.periodContainer, { backgroundColor: period === lunch ? color1 : color2 }]}
                onPress={() => setPeriod(lunch)}>
                <Text style={{ fontSize: 12, fontWeight: period === lunch ? "bold" : "normal", color: period === lunch ? color3 : color4 }}>{lunch}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.periodContainer, { backgroundColor: period === evening ? color1 : color2 }]}
                onPress={() => setPeriod(evening)}>
                <Text style={{ fontSize: 12, fontWeight: period === evening ? "bold" : "normal", color: period === evening ? color3 : color4 }}>{evening}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.periodContainer, { backgroundColor: period === day ? color1 : color2 }]}
                onPress={() => setPeriod(day)}>
                <Text style={{ fontSize: 12, fontWeight: period === day ? "bold" : "normal", color: period === day ? color3 : color4 }}>{day}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PeriodsPanel

const s = StyleSheet.create({

    outer: {
        width: '49%',
        height: 50,
        borderRadius: 25,
        backgroundColor: "ivory",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        overflow: 'hidden',
        marginVertical: 10
    },

    periodContainer: {
        width: "25%",
        height: "100%",
        backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#243663"
    }
});