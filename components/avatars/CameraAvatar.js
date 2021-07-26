import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Camera from '../../Images/Camera.svg'
import { g } from '../../styles/global'

const CameraAvatar = () =>
    <View style={s.photoOuter}>
        <View style={s.photoInner}>
            <Camera />
            <Text style={g.text17_400_white}>הוספת תמונה</Text>
        </View>
    </View>

export default CameraAvatar

const s = StyleSheet.create({
    photoOuter: {
        zIndex: 2,
        marginTop: -113,
        width: 146,
        height: 146,
        borderRadius: 73,
        backgroundColor: "#FDC27A",
        alignItems: 'center',
        justifyContent: 'center'
    },
    photoInner: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "#034794",
        alignItems: 'center',
        justifyContent: 'center'
    }
});



