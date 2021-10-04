import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import AvatarPlain from '../../Images/AvatarPlain.jpg'

const AvatarBig = ({path}) => {  

    return (
        <View style={s.photoOuter}>
            <View style={s.photoInner}>
                <ImageBackground source={!!path ? {uri: `http://52.48.233.122:3001/${path}`} : AvatarPlain}
                    style={s.avatar} />
            </View>
        </View>
    )
}

export default AvatarBig

const s = StyleSheet.create({
    photoOuter: {
        zIndex: 2,
        marginTop: -63,
        width: 126,
        height: 126,
        borderRadius: 1000,
        backgroundColor: "#FDC27A",
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    photoInner: {
        width: 114,
        height: 114,
        borderRadius: 1000,
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



