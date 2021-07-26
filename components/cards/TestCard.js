import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux'

import Bender from '../../Images/Bender.jpg'
import Stars from '../../Images/Stars.svg'
import Repair from '../../Images/Repair.svg'
import RedX from '../../Images/RedX.svg'
import Thumb from '../../Images/Thumb.svg'
import Date from '../../Images/Date.svg'
import Time from '../../Images/Time.svg'

import { g } from '../../styles/global'

const TestCard = () => {

    const avatar = null
    const name = "בנדר רודריגס"
    const jobTitle = "אדם עצלן"
    const date = "23.07.21"
    const time = "10:00"

    const scaleRedX = 1.6
    const scaleThumb = 1.6
    const scaleDate = 1.4
    const scaleTime = 1.4
    const scaleStars = 0.4
    const scaleRepair = 1.2

    return (
        <View style={s.testCard}>
            <View style={s.buttons}>
                <TouchableOpacity>
                    <RedX style={{ transform: [{ scaleX: scaleRedX }, { scaleY: scaleRedX }] }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Thumb style={{ transform: [{ scaleX: scaleThumb }, { scaleY: scaleThumb }] }} />
                </TouchableOpacity>
            </View>
            <View style={s.jobInfo}>
                <View style={s.jobTitle}>
                    <Text style={g.text14_600_blue}>{jobTitle}</Text>
                </View>
                <View style={s.dateTime}>
                    <View style={s.time}>
                        <Text style={[g.text13_400_blue, s.dateStyle]}>{time}</Text>
                        <Time style={{ transform: [{ scaleX: scaleTime }, { scaleY: scaleTime }] }} />
                    </View>
                    <View style={s.date}>
                        <Text style={[g.text13_400_blue, s.dateStyle]}>{date}</Text>
                        <Date style={{ transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }] }} />
                    </View>
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
            <View style={s.avatarBlock}>
                <ImageBackground source={avatar ? avatar : Bender}
                    resizeMethod={'cover'} style={s.avatar} />
            </View>
        </View>
    )
}

export default TestCard

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
     //   backgroundColor: "peachpuff",
        padding: 5,
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
    },

    jobTitle: {
        height: "30%",
        width: "100%",
     //   backgroundColor: "peru",
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    dateTime: {
        height: "30%",
        width: "100%",
     //   backgroundColor: "navy",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    time: {
        height: "90%",
        // width: "40%",
    //    backgroundColor: "olive",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 4,
        marginRight: 4
    },

    date: {
        height: "90%",
        // width: "40%",
     //   backgroundColor: "gray",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
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