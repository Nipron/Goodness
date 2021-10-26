import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CheckV from '../../Images/CheckV.svg'
import CheckCircle from '../../Images/CheckCircle.svg'
import { g } from '../../styles/global'
import { useNavigation } from '@react-navigation/native'


const FooterHome = (props) => {

    const navigation = useNavigation()

    return (
        <View style={s.footer}>
            <View style={s.footerInner}>
                
                    <TouchableOpacity style={s.termsBlock} onPress={() => navigation.navigate('Terms')}>
                        <Text style={[g.text18_400_grey, s.terms]}>תנאי שימוש  </Text>
                        {/*<TouchableOpacity style={s.checkBlock} onPress={() => props.setChecked(!props.checked)}>
                            <CheckCircle />
                            {props.checked && <CheckV style={s.v} />}
    </TouchableOpacity>*/}
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const s = StyleSheet.create({

    v: {
        position: "absolute"
    },

    checkBlock: {
        marginLeft: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    footer: {
        width: "100%",
        height: "12.5%",
        marginTop: -26,
        paddingTop: 26,
        //  backgroundColor: "green",
        alignItems: 'center',
        justifyContent: 'center'
    },

    footerInner: {
        width: "100%",
        height: "100%",
        //   backgroundColor: "red",
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    termsBlock: {
        width: "100%",
        height: 30,
        //   backgroundColor: "pink",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    terms: {
        marginRight: 2
    }
})

export default FooterHome;