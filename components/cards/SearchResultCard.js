import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import AvatarPlain from '../../Images/AvatarPlain.jpg'
import Stars from '../../Images/Stars.svg'
import Repair from '../../Images/Repair.svg'
import MarkerBlue from '../../Images/MarkerBlue.svg'
import Date from '../../Images/Date.svg'
import Time from '../../Images/Time.svg'
import moment from 'moment'

import { g } from '../../styles/global'

import { useNavigation } from '@react-navigation/native'

import { setTempUserThunk } from '../../redux/tempUserReducer';
import RatingForCardPanel from '../panels/RatingForCardPanel';


const SearchResultCard = (props) => {

    //  console.log("HHHH")
    //  console.log(props)

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const catsFlat = useSelector(state => state.categoriesFlat)

    const name = props.data.author.name
    const avaPath = props.data.author.avatar ? props.data.author.avatar.path : ''
    //  const rating = props.data.author.avgRating
    const rating = props.data.avgRating

    const catId = props.data.category.id
    const jobTitle = catsFlat.find(cat => cat.id === catId).title

    const id = props.data.id
    const userId = props.data.author.id

    const leg1 = props.coordinate.latitude - props.data.coordinates.coordinates[0]
    const leg2 = props.coordinate.longitude - props.data.coordinates.coordinates[1]

    //  console.log(leg1)
    //  console.log(leg2)

    //  console.log(Math.round(Math.hypot(leg1, leg2)*100)/100 )

    const dist = Math.round(Math.hypot(leg1, leg2) * 1100) / 10

    //  console.log(dist)

    // console.log(Object.keys(props.data))
    //  console.log(props.data.avgRating)

    const avatar = null
    const date = moment(props.data.createdAt).format('L')
    const time = moment(props.data.createdAt).format('LT')

    const scaleDate = 1.4
    const scaleTime = 1.4
    const scaleStars = 0.4
    const scaleRepair = 1.2
    const scaleMarker = 1.2

    const handlePress = async () => {

        if (id === props.chosenId) {
            props.setChosenId(null)
        } else {
            props.setChosenId(id)
        }
    }

    const goToPersonalInfo = async () => {
        dispatch(setTempUserThunk(userId));
        navigation.navigate('UserInfo')
    }

    return (
        <TouchableOpacity style={[s.testCard, { backgroundColor: (id === props.chosenId) ? "yellow" : "white" }]} onPress={handlePress}>

            <View style={s.jobInfo}>
                <View style={s.jobTitle}>
                    <Text style={g.text14_600_blue}>{jobTitle}</Text>
                </View>
                <View style={s.dateTime}>
                    {/*
                    <View style={s.time}>
                        <Text style={[g.text13_400_blue, s.dateStyle]}>{time}</Text>
                        <Time style={{ transform: [{ scaleX: scaleTime }, { scaleY: scaleTime }] }} />
                    </View>
                    <View style={s.date}>
                        <Text style={[g.text13_400_blue, s.dateStyle]}>{date}</Text>
                        <Date style={{ transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }] }} />
                    </View>*/}
                    <View style={s.time}>
                    {/*
                            (props.data.actionRadius !== 25000000) &&*/}
                            <Text style={[g.text13_400_blue, s.dateStyle]}>{`${dist} km `}</Text>
                       
                        {/*
                            (props.data.actionRadius < 24999000) &&
                            <Text style={[g.text13_400_blue, s.dateStyle]}>בכתובת מוגדרת</Text>
                        */}                       
                        {/*
                            (props.data.actionRadius === 25000000) &&
                            <Text style={[g.text13_400_blue, s.dateStyle]}>Online</Text>
                        */}
                        <MarkerBlue style={{ transform: [{ scaleX: scaleMarker }, { scaleY: scaleMarker }] }} />
                    </View>
                </View>
            </View>
            <View style={s.jobIcon}>
                <Repair style={{ transform: [{ scaleX: scaleRepair }, { scaleY: scaleRepair }] }} />
            </View>
            <View style={s.personalInfoBlock}>
                <Text style={[g.text13_400_blue, s.nameStyle]}>{name}</Text>
                <RatingForCardPanel rating={rating} scale={0.25} />
            </View>
            <TouchableOpacity style={s.avatarBlock} onPress={goToPersonalInfo}>
                <ImageBackground source={avaPath ? { uri: `http://52.48.233.122:3001/${avaPath}` } : AvatarPlain}
                    resizeMethod={'auto'} style={s.avatar} />

            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default SearchResultCard

const s = StyleSheet.create({

    testCard: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        height: 80,
        //  backgroundColor: "ivory",
        borderRadius: 20,
        marginBottom: 12,
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
        width: "42%",
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