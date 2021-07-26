import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native'

import Bell from '../../Images/Bell.svg'
import Cabinet from '../../Images/Cabinet.svg'
import Info from '../../Images/Info.svg'
import Search from '../../Images/Search.svg'


const Footer = () => {

    const scale = 1.4;

    const navigation = useNavigation()

    return (
        <View style={s.footer}>
            <View style={s.footerInner}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Info style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
                    <Bell style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Search style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Cabinet style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    footer: {
        width: "100%",
        height: "12%",
        alignItems: 'center',
        justifyContent: 'center'
    },

    footerInner: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around'
    }
})

export default Footer;