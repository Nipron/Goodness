import React from 'react';
import { StyleSheet, View, } from 'react-native';
import Lock from '../../Images/Lock.svg'

const RegAvatar = () =>
    <View style={s.regOuter}>
        <Lock style={{marginLeft: 4}}/>
    </View>
    
export default RegAvatar

const s = StyleSheet.create({
    regOuter: {
        zIndex: 2,
        marginTop: -64,
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: "#FFFFFF",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 8,
        borderColor: "#243663"
    }
});

