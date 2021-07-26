import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux'
import Bender from '../../Images/Bender.jpg'

const AvatarBig = () => {

    const avatar = useSelector(state => state.avatar)

    return (
        <View style={s.photoOuter}>
            <View style={s.photoInner}>
                <ImageBackground source={avatar ? avatar : Bender}
                    resizeMethod={'cover'} style={s.avatar} />
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
        height: "100%"
    }
});



