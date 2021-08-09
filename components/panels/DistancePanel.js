import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const DistancePanel = ({ distance, setDistance }) => {

    const color1 = "#3993D6"
    const color2 = "white"
    const color3 = "white"
    const color4 = "black"
    const fontSize = 22

    return (
        <View style={s.outer}>
            <TouchableOpacity style={[s.distanceContainer, { backgroundColor: distance === 1 ? color1 : color2 }]}
                onPress={() => setDistance(1)}>
                <Text style={{ fontWeight: distance === 1 ? "bold" : "nornal", color: distance === 1 ? color3 : color4, fontSize }}>1 ק"מ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.distanceContainer, { backgroundColor: distance === 5 ? color1 : color2 }]}
                onPress={() => setDistance(5)}>
                <Text style={{ fontWeight: distance === 5 ? "bold" : "nornal", color: distance === 5 ? color3 : color4, fontSize }}>5 ק"מ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.distanceContainer, { backgroundColor: distance === 10 ? color1 : color2 }]}
                onPress={() => setDistance(10)}>
                <Text style={{ fontWeight: distance === 10 ? "bold" : "nornal", color: distance === 10 ? color3 : color4, fontSize }}>10 ק"מ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.distanceContainer, { backgroundColor: distance === 20 ? color1 : color2 }]}
                onPress={() => setDistance(20)}>
                <Text style={{ fontWeight: distance === 20 ? "bold" : "nornal", color: distance === 20 ? color3 : color4, fontSize }}>עִיר</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DistancePanel

const s = StyleSheet.create({

    outer: {
        width: '90%',
        height: 60,
        borderRadius: 15,
        backgroundColor: "ivory",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: "#243663"
    },

    distanceContainer: {
        width: "25%",
        height: "100%",
        backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#243663"
    }
});