import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Checked from '../../Images/Checked.svg'
import { g } from '../../styles/global'
import { useNavigation } from '@react-navigation/native'


const FooterHome = (props) => {

    const navigation = useNavigation()

    return (
        <View style={s.footer}>
            <View style={s.footerInner}>
                <TouchableOpacity style={s.termsBlock} /*onPress={() => navigation.navigate('Terms')}*/>
                    <Text style={[g.text22_400_grey, s.terms]}>תנאי שימוש  </Text>
                    <Checked />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const s = StyleSheet.create({
    footer: {
        width: "100%",
        height: "12%",
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