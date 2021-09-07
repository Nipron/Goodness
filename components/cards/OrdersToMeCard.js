import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

import AvatarPlain from '../../Images/AvatarPlain.jpg'
import Stars from '../../Images/Stars.svg'
import Repair from '../../Images/Repair.svg'
import CheckGrey from '../../Images/CheckGrey.svg'
import CheckGreen from '../../Images/CheckGreen.svg'
import Date from '../../Images/Date.svg'
import Time from '../../Images/Time.svg'

import { g } from '../../styles/global'
import { serviceAPI, userAPI } from '../../src/api/api';
import { updateAll } from '../../redux/store';
import { setTempUserThunk } from '../../redux/tempUserReducer';
import RatingForCardPanel from '../panels/RatingForCardPanel';

const OrdersToMeCard = ({ item, toMe }) => {
   
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const catsFlat = useSelector(state => state.categoriesFlat)

    const catId = item.service.category.id
    const cat = catsFlat.find(cat => cat.id === catId).title
    const partner = toMe ? item.client : item.worker

    const name = partner.name
    const userId = partner.id
    const avaPath = partner.avatar.path
    const rating = partner.feedbackResult
    const date = moment(item.service.createdAt).format('L')
    const time = item.service.dayTime

    const scaleCheck = 2
    const scaleDate = 1.4
    const scaleTime = 1.4
    const scaleRating = 0.23
    const scaleRepair = 1.2

    const handelDone = async () => {
        await serviceAPI.doneService(item.id)
        await userAPI.dashboard()
            .then(data => {              
                dispatch(updateAll(data))
               // navigation.navigate('Profile')
            })
    }

    const goToPersonalInfo = () => {
        dispatch(setTempUserThunk(userId));
        navigation.navigate('UserInfo')
    }

    return (
        <View style={[s.testCard, { backgroundColor: (item.status === "done") ? "palegreen" : "white" }]}>
            <View style={s.buttons}>
                {(item.status !== "done") && <TouchableOpacity onPress={() => handelDone()}>
                    <CheckGrey style={{ transform: [{ scaleX: scaleCheck }, { scaleY: scaleCheck }] }} />
                </TouchableOpacity>}
                {(item.status === "done") && <View>
                    <CheckGreen style={{ transform: [{ scaleX: scaleCheck }, { scaleY: scaleCheck }] }} />
                </View>}
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
                    <RatingForCardPanel rating={rating} scale={scaleRating} />
                </View>
            </View>
            <TouchableOpacity style={s.avatarBlock} onPress={goToPersonalInfo}>
                <ImageBackground source={avaPath ? { uri: `http://52.48.233.122:3001/${avaPath}` } : AvatarPlain}
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
        //      backgroundColor: "plum",
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    jobInfo: {
        height: "100%",
        width: "38%",
        //       backgroundColor: "peachpuff",
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
        backgroundColor: "navy",
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },

    nameStyle: {
        //   backgroundColor: "yellow",
        marginTop: 6,
        marginBottom: -6,
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