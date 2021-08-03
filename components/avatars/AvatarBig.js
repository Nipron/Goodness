import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux'
import Bender from '../../Images/Bender.jpg'

const AvatarBig = () => {

    const path = useSelector(state => state.all.avatar.path)
    console.log(path)

    return (
        <View style={s.photoOuter}>
            <View style={s.photoInner}>
                <ImageBackground source={path ? {uri: `http://52.48.233.122:3000/${path}`} : Bender}
                    style={s.avatar} />
            </View>
        </View>
    )
}

export default AvatarBig

const s = StyleSheet.create({
    photoOuter: {
        zIndex: 2,
        marginTop: -73,
        width: 146,
        height: 146,
        borderRadius: 73,
        backgroundColor: "#FDC27A",
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    photoInner: {
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: "#034794",
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },

    avatar: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover'
    }
});



