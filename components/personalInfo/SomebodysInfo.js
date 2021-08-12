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

import { g } from '../../styles/global'
import { commonAPI } from '../../src/api/api';

const SomebodysInfo = ({ id }) => {


    const user = useSelector(state => state.tempUser)

    const scale = 1.4
    const scaleStars = 1.4
    const scaleEdit = 1.4
    const scaleT = 1.2

    console.log(user)

    let statusSource;

    switch (user.heartsStatus) {
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

    return (
        !!user.address ?
        <View style={s.personalInfoBlock}>

           

            <View style={s.rating}>
                <Stars style={{ transform: [{ scaleX: scaleStars }, { scaleY: scaleStars }] }} />
            </View>

            <View style={s.phone}>
                <Text style={[s.phoneNumber, g.text18_600_blue]}>
                    {user.phone}
                </Text>
                <Phone style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
            </View>

            <View style={s.professionBlock}>
                <Text style={g.text18_400_grey}>{`${user.address.city} `}</Text>
                <Text style={g.text18_600_blue}> תחום עיסוק: </Text>
            </View>
            <View style={s.addressBlock}>
                <Text style={g.text18_400_grey}>{`${user.job} `}</Text>
                <Text style={g.text18_600_blue}> כתובת: </Text>
            </View>

            <View style={s.status}>
                <ImageBackground source={statusSource} style={s.avatar} />
            </View> 
        </View> : <View/>
    )
}

export default SomebodysInfo

const s = StyleSheet.create({

    personalInfoBlock: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
        height: 240,
      //  backgroundColor: "pink",
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
    },

    rating: {
        width: "90%",
        height: 60,
      //  backgroundColor: "maroon",
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 5,
        marginTop: 50
    },

    phone: {
        width: "90%",
        height: 24,
     //   backgroundColor: "lightgreen",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    phoneNumber: {
        marginRight: 10
    },

    professionBlock: {
        width: "100%",
        height: 24,
     //   backgroundColor: "olive",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
    },

    addressBlock: {
        width: "100%",
        height: 24,
     //   backgroundColor: "peru",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center'
    },

    status: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        width: "100%",
        height: 50,
        marginTop: 20
      //  backgroundColor: "magenta",
    },

    avatar: {
        width: "100%",
        height: 45,
        resizeMode: 'contain'
    }



})