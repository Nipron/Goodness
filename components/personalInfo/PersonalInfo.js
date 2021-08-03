import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import StatusBronze from '../../Images/StatusBronze.png'
import StatusSilver from '../../Images/StatusSilver.png'
import StatusGold from '../../Images/StatusGold.png'
import StatusPlatinum from '../../Images/StatusPlatinum.png'
import Phone from '../../Images/Phone.svg'
import Stars from '../../Images/Stars.svg'
import Edit from '../../Images/Edit.svg'
import Heart from '../../Images/Heart.svg'

import { g } from '../../styles/global'

const PersonalInfo = () => {

    const navigation = useNavigation()
    const info = useSelector(state => state.all)
    const scale = 1.4
    const scaleStars = 1.4
    const scaleEdit = 1.4
    const scaleHeart = 1.2

    let statusSource;

    switch (info.heartsStatus) {
        case "bronze":
            statusSource = StatusBronze
            break;
        case "silver":
            statusSource = StatusSilver
            break;
        case "gold":
            statusSource = StatusGold
            break;
        case "platimun":
            statusSource = StatusPlatinum
            break;
        default:
            statusSource = StatusBronze
            break;
    }

    console.log(info)

    const pressAlert = () => Alert.alert('EDIT PROFILE', "Redirect ot EditProfile", [{ text: "Ok"/*, onPress: () => console.log('alert wrong') */ }])

    return (
        <View style={s.personalInfoBlock}>

            <View style={s.editAndHearts}>
                <TouchableOpacity style={s.edit} onPress={() => navigation.navigate('EditProfile')} >
                    <Edit />
                </TouchableOpacity>
                <View style={s.hearts}>
                    <Heart style={{ transform: [{ scaleX: scaleHeart }, { scaleY: scaleHeart }] }} />
                    <Text style={[s.balance, g.text28_700_blue]}>
                        {info.balance}
                    </Text>
                </View>


            </View>

            <View style={s.rating}>
                <Stars style={{ transform: [{ scaleX: scaleStars }, { scaleY: scaleStars }] }} />
            </View>

            <View style={s.phone}>
                <Text style={[s.phoneNumber, g.text18_600_blue]}>
                    {info.phone}
                </Text>
                <Phone style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
            </View>

            <View style={s.status}>
                <ImageBackground source={statusSource}
                    resizeMethod={'contain'} style={s.avatar} />

            </View>



        </View>
    )
}

export default PersonalInfo

const s = StyleSheet.create({

    personalInfoBlock: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
        height: 240,
        // backgroundColor: "pink",
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
    },

    editAndHearts: {
        width: "90%",
        height: 50,
        // backgroundColor: "lightblue",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    edit: {
        width: 50,
        height: 50,
        //  backgroundColor: "azure",
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    hearts: {
        width: 90,
        height: 50,
        //   backgroundColor: "aquamarine",
        flexDirection: "row",
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    balance: {
        marginLeft: 8
    },

    rating: {
        width: "90%",
        height: 60,
        //   backgroundColor: "maroon",
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 5
    },

    phone: {
        width: "90%",
        height: 50,
        //   backgroundColor: "lightgreen",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },

    phoneNumber: {
        marginRight: 10
    },

    status: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        width: "100%",
        height: 50,
        //   backgroundColor: "magenta"
    },

    avatar: {
        width: "100%",
        height: 50,
    }



})