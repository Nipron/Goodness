import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import AvatarPlain from '../../Images/AvatarPlain.jpg'
import Stars from '../../Images/Stars.svg'
import Repair from '../../Images/Repair.svg'
import RedX from '../../Images/RedX.svg'
import Thumb from '../../Images/Thumb.svg'
import Date from '../../Images/Date.svg'
import Time from '../../Images/Time.svg'
import CloseIcon from '../../Images/CloseIcon'
import CheckGreen from '../../Images/CheckGreen'

import { g } from '../../styles/global'
import { useNavigation } from '@react-navigation/native'

import { setTempUserThunk } from '../../redux/tempUserReducer';

import ButtonBlue from '../../src/ButtonBlue';
import RatingPanel from '../panels/RatingPanel';
import RatingForCardPanel from '../panels/RatingForCardPanel';

const UserHistoryCard = ({ item, toMe }) => {


    const scaleCheckGreen = 1.6

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const catsFlat = useSelector(state => state.categoriesFlat)

    const catId = item.service.category.id
    const cat = catsFlat.find(cat => cat.id === catId).title
  //  const partner = toMe ? item.client : item.worker

   // const name = partner.name
  //  const userId = partner.id
   // const avaPath = partner.avatar ? partner.avatar.path : ''
    const rating = item.feedback.rating
    const date = moment(item.feedback.createdAt).format('L')
    const time = moment(item.feedback.createdAt).format('LT')

    const [newRating, setNewRating] = useState(3)

    const scaleRedX = 1.6
    const scaleThumb = 1.6
    const scaleDate = 1.4
    const scaleTime = 1.4
    const scaleRating = 0.33
    const scaleRepair = 1.2


    return (
        <View style={s.testCard}>

            <View style={s.jobInfo}>
                <View style={s.jobTitle}>
                    <Text style={g.text14_600_blue}>{cat}</Text>
                </View>
                <View style={s.date}>
                    <Text style={[g.text13_400_blue, s.dateStyle, { paddingLeft: 10 }]}>{date}</Text>
                    <Date style={{ transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }] }} />
                </View>
            </View>
            <View style={s.jobIcon}>
                <Repair style={{ transform: [{ scaleX: scaleRepair }, { scaleY: scaleRepair }] }} />
            </View>
            <View style={s.personalInfoBlock}>
                <View style={s.nameStyle}>
                    <Text style={[g.text14_600_blue,]}>דירוג העבודה</Text>
                </View>
                <View style={s.rating}>
                    <RatingForCardPanel rating={rating} scale={scaleRating} />
                </View>
            </View>
            <View style={s.avatarBlock}>
                <CheckGreen style={{ transform: [{ scaleX: scaleCheckGreen }, { scaleY: scaleCheckGreen }] }} />
            </View>
        </View>
    )
}

export default UserHistoryCard

const s = StyleSheet.create({

    testCard: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        height: 72,
        //  backgroundColor: "ivory",
        borderRadius: 20,
        marginVertical: 5,
        overflow: 'hidden',
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

    jobInfo: {
        height: "100%",
        width: "42%",
        //   backgroundColor: "peachpuff",
        alignItems: 'flex-end',
        justifyContent: 'space-evenly',
        paddingRight: 10
    },

    jobTitle: {
        height: "50%",
        width: "100%",
        //  backgroundColor: "peru",
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    date: {
        height: "50%",
        width: "100%",
          //   backgroundColor: "gray",
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingTop: 4,
        paddingRight: 4,
    },

    dateStyle: {
        marginRight: 4
    },

    jobIcon: {
        height: "100%",
        width: "14%",
        padding: 5,
        //backgroundColor: "lime",
        alignItems: 'center',
        justifyContent: 'center',
    },

    personalInfoBlock: {
        height: "100%",
        //  maxWidth: "22%",
        width: "30%",
      //      backgroundColor: "magenta",
        justifyContent: 'center',
        alignItems: 'center',
    },

    nameStyle: {
        width: "100%",
        height: "50%",
      //  backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center"
    },

    rating: {
        width: "100%",
        height: "50%",
        top: -5,
     // backgroundColor: "turquoise",
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    avatarBlock: {
        height: "100%",
        width: "12%",
    //    backgroundColor: "pink",
        alignItems: 'flex-start',
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
