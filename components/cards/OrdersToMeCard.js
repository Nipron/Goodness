import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import Bender from '../../Images/Bender.jpg'
import Stars from '../../Images/Stars.svg'
import Repair from '../../Images/Repair.svg'
import CheckGrey from '../../Images/CheckGrey.svg'
import CheckGreen from '../../Images/CheckGreen.svg'
import Date from '../../Images/Date.svg'
import Time from '../../Images/Time.svg'

import { g } from '../../styles/global'
import { serviceAPI, userAPI } from '../../src/api/api';

import { updateAll } from '../../redux/store';

import { useNavigation } from '@react-navigation/native'

import { setTempUserThunk } from '../../redux/tempUserReducer';

const OrdersToMeCard = ({ item, toMe }) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const catsFlat = useSelector(state => state.categoriesFlat)

    const catId = item.service.category.id
    const cat = catsFlat.find(cat => cat.id === catId).title
    const partner = toMe ? item.orderFrom : item.jobTo

    const name = partner.name
    const userId = partner.id
    const avaPath = partner.avatar.path
    const date = moment(item.service.createdAt).format('L')
    const time = item.service.dayTime

    const scaleRedX = 1.6
    const scaleThumb = 1.6
    const scaleDate = 1.4
    const scaleTime = 1.4
    const scaleStars = 0.4
    const scaleRepair = 1.2

    const handelCancel = () => {
        serviceAPI.approveService(item.id)
    }

    const handelDone = async () => {
        console.log("DONE PRESSED")
        await serviceAPI.doneService(item.id)
        await userAPI.dashboard()
            .then(data => {
                console.log("Approve OK")
                console.log(data)
                dispatch(updateAll(data))
                // navigation.navigate('UserInfo')
            })
    }

    const handelApprove = async () => {
        await serviceAPI.approveService(item.id)
        await userAPI.dashboard()
            .then(data => {
                console.log("Approve OK")
                console.log(data)
                dispatch(updateAll(data))
                //   navigation.navigate('Profile')
            })
    }

    const goToPersonalInfo = () => {
        console.log(userId)
        dispatch(setTempUserThunk(userId));
        navigation.navigate('UserInfo')
    }

    return (
        <View style={s.testCard}>
            <View style={s.buttons}>
                <TouchableOpacity onPress={handelDone}>
                    <CheckGrey style={{ transform: [{ scaleX: scaleRedX }, { scaleY: scaleRedX }] }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handelApprove}>
                    <CheckGreen style={{ transform: [{ scaleX: scaleThumb }, { scaleY: scaleThumb }] }} />
                </TouchableOpacity>
            </View>
            <View style={s.jobInfo}>
                <View style={s.jobTitle}>
                    <Text style={g.text14_600_blue}>{cat}</Text>
                </View>
                <View style={s.date}>
                    <Text style={[g.text13_400_blue, s.dateStyle]}>{date}</Text>
                    <Date style={{ transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }] }} />
                </View>
                <View style={s.time}>
                    <Text style={[g.text13_400_blue, s.dateStyle]}>{time}</Text>
                    <Time style={{ transform: [{ scaleX: scaleTime }, { scaleY: scaleTime }] }} />
                </View>
            </View>
            <View style={s.jobIcon}>
                <Repair style={{ transform: [{ scaleX: scaleRepair }, { scaleY: scaleRepair }] }} />
            </View>
            <View style={s.personalInfoBlock}>
                <Text style={[g.text16_600_blue, s.nameStyle]}>{name}</Text>
                <View style={s.rating}>
                    <Stars style={{ transform: [{ scaleX: scaleStars }, { scaleY: scaleStars }] }} />
                </View>
            </View>
            <TouchableOpacity style={s.avatarBlock} onPress={goToPersonalInfo}>
                <ImageBackground source={avaPath ? { uri: `http://52.48.233.122:3000/${avaPath}` } : Bender}
                    resizeMethod={'auto'} style={s.avatar} />
            </TouchableOpacity>
        </View>
    )
}

export default OrdersToMeCard

const s = StyleSheet.create({

    testCard: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        height: 80,
        //  backgroundColor: "ivory",
        borderRadius: 20,
        marginVertical: 5,
        overflow: 'hidden',
        backgroundColor: "#FFFFFF",
    },

    buttons: {
        height: "100%",
        width: "12%",
        //    backgroundColor: "plum",
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },

    jobInfo: {
        height: "100%",
        width: "38%",
        //     backgroundColor: "peachpuff",
        padding: 5,
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },

    jobTitle: {
        height: "30%",
        width: "100%",
        //     backgroundColor: "peru",
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    dateTime: {
        height: "30%",
        width: "100%",
        //    backgroundColor: "navy",
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    time: {
        height: "30%",
        // width: "40%",
        //  backgroundColor: "olive",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 4,
    },

    date: {
        height: "30%",
        // width: "40%",
        //   backgroundColor: "gray",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 4,
    },

    dateStyle: {
        marginRight: 4
    },

    jobIcon: {
        height: "100%",
        width: "14%",
        padding: 5,
        //   backgroundColor: "lime",
        alignItems: 'center',
        justifyContent: 'center',
    },

    personalInfoBlock: {
        height: "100%",
        //  maxWidth: "22%",
        width: "20%",
        //  backgroundColor: "magenta",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },

    nameStyle: {
        //   backgroundColor: "yellow",
        textAlign: 'right'
    },

    rating: {
        width: "90%",
        //   backgroundColor: "turquoise",
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarBlock: {
        height: "100%",
        width: "14%",
        //   backgroundColor: "pink",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },

    avatar: {
        height: 40,
        width: 40,
        //   backgroundColor: "azure",
        borderRadius: 20,
        overflow: 'hidden'
    },

})