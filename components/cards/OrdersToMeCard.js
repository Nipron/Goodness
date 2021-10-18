import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

import AvatarPlain from '../../Images/AvatarPlain.jpg'
import Repair from '../../Images/Repair.svg'
import CheckGrey from '../../Images/CheckGrey.svg'
import CheckGreen from '../../Images/CheckGreen.svg'
import Date from '../../Images/Date.svg'
import Time from '../../Images/Time.svg'

import { g } from '../../styles/global'
import { serviceAPI, userAPI } from '../../src/api/api';
import { updateProfileThunk } from '../../redux/store';
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
    const avaPath = partner.avatar ? partner.avatar.path : ''
    const rating = partner.avgRating
    const date = moment(item.createdAt).format('L')
    const time = moment(item.createdAt).format('LT')

    const scaleCheck = 1.7
    const scaleDate = 1.2
    const scaleTime = 1.2
    const scaleRating = 0.23
    const scaleRepair = 1.2

    const handelDone = async () => {
        try {
            await serviceAPI.doneService(item.id)
            dispatch(updateProfileThunk())
        } catch (e) {
            console.log(e)
        }
    }

    const goToPersonalInfo = () => {
        try {
            dispatch(setTempUserThunk(userId));
            navigation.navigate('UserInfo')
        } catch (e) {
            console.log(e)
        }
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
                    <Text style={[g.text10_400_blue, s.dateStyle]}>{time}</Text>
                    <Time style={{ transform: [{ scaleX: scaleTime }, { scaleY: scaleTime }] }} />
                    <Text style={[g.text10_400_blue, s.dateStyle]}>{date}</Text>
                    <Date style={{ transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }] }} />
                </View>
            </View>
            <View style={s.jobIcon}>
                <Repair style={{ transform: [{ scaleX: scaleRepair }, { scaleY: scaleRepair }] }} />
            </View>
            <View style={s.personalInfoBlock}>
                <Text style={[g.text14_600_blue, s.nameStyle]}>{name}</Text>
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
        //    backgroundColor: "ivory",
        borderRadius: 20,
        marginVertical: 5,
        //  overflow: 'hidden',
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowOpacity: 0.1,
        // shadowColor: "blue",
        shadowRadius: 2
    },

    buttons: {
        height: "100%",
        width: "12%",
        //   backgroundColor: "plum",
        paddingVertical: 12,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    jobInfo: {
        height: "100%",
        width: "38%",
        //    backgroundColor: "peachpuff",
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },

    jobTitle: {
        height: "30%",
        //  width: "100%",
        //   backgroundColor: "green",
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginRight: 4
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
        marginRight: 4
    },

    dateStyle: {
        marginRight: 3,
        marginLeft: 8
    },

    jobIcon: {
        height: "100%",
        width: "14%",
        padding: 5,
        //    backgroundColor: "lime",
        alignItems: 'center',
        justifyContent: 'center',
    },

    personalInfoBlock: {
        height: "100%",
        //  maxWidth: "22%",
        width: "21%",
        //   backgroundColor: "magenta",
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },

    nameStyle: {
        //    backgroundColor: "yellow",
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
        width: "15%",
        //    backgroundColor: "pink",
        alignItems: 'flex-start',
        justifyContent: 'center',
    },

    avatar: {
        height: 40,
        width: 40,
        //  backgroundColor: "azure",
        borderRadius: 20,
        overflow: 'hidden'
    },

})