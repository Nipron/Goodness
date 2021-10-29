import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import AvatarPlain from '../../Images/AvatarPlain.jpg'
import Stars from '../../Images/Stars.svg'
import Repair from '../../Images/Repair.svg'
import RedX from '../../Images/RedX.svg'
import PinkX from '../../Images/PinkX2.svg'
import Thumb from '../../Images/Thumb.svg'
import ThumbGrey from '../../Images/ThumbGrey2.svg'
import Date from '../../Images/Date.svg'
import Time from '../../Images/Time.svg'
import CloseIcon from '../../Images/CloseIcon'
import CheckGreen from '../../Images/CheckGreen'

import { g } from '../../styles/global'
import { serviceAPI } from '../../src/api/api';

import { updateProfileThunk } from '../../redux/store';

import { useNavigation } from '@react-navigation/native'

import { setTempUserThunk } from '../../redux/tempUserReducer';

import ButtonBlue from '../../src/ButtonBlue';
import RatingPanel from '../panels/RatingPanel';
import RatingForCardPanel from '../panels/RatingForCardPanel';

import Spinner from 'react-native-loading-spinner-overlay'

const JobsFromMeCard = ({ item, toMe }) => {

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

    const [newRating, setNewRating] = useState(3)

    const scaleRedX = 1
    const scaleCheckGreen = 1.7
    const scaleThumb = 1.7
    const scaleDate = 1.2
    const scaleTime = 1.2
    const scaleRating = 0.23
    const scaleRepair = 1.2

    const [modalOpen, setModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleCancel = async () => {
     //   setLoading(true)
        try {
            function delay(ms) {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, ms);
                });
            }

            await serviceAPI.cancelService(item.id)
                .then(res => delay(100))
                .then(res => dispatch(updateProfileThunk()))

        } catch (e) {
            console.log(e)
        }
      //  setLoading(false)
    }

    const handleCheck = () => Alert.alert('התפקיד נעשה', `אשר את השלמת העבודה`, [{ text: "Ok"/*, onPress: () => console.log('alert wrong') */ }])

    const handleRate = async () => {
        setLoading(true)
        try {
            function delay(ms) {
                return new Promise((resolve, reject) => {
                    setTimeout(resolve, ms);
                });
            }

            await serviceAPI.approveService(item.id)
            await serviceAPI.rateService(item.id, newRating)
            //      .then(res => { return delay(600) })
            //      .then(res => dispatch(updateProfileThunk()))
            //  dispatch(updateProfileThunk())
            setModalOpen(false)
            setLoading(false)
        } catch (e) {
            console.log(e)
        }

    }

    const goToPersonalInfo = () => {
        dispatch(setTempUserThunk(userId));
        navigation.navigate('UserInfo')
    }

    return (
        <View style={s.testCard}>
            <Spinner
                visible={loading}
                textContent={'טוען...'}
                textStyle={g.text22_700_white}
            />

            <Modal
                transparent={true}
                animationType="slide"
                visible={modalOpen}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    <View style={mS.modalBlock}>
                        <View style={mS.innerBlock}>
                            <TouchableOpacity style={mS.closeIcon} onPress={() => setModalOpen(false)}>
                                <CloseIcon />
                            </TouchableOpacity>
                            <Text style={[mS.header, g.text24_700_blue]}>דרג בבקשה</Text>
                            <Text style={g.text24_700_blue}>{name}</Text>
                            <RatingPanel rating={newRating} setRating={setNewRating} />
                        </View>
                        <ButtonBlue name="לדרג" onPress={handleRate} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>



            <View style={s.buttons}>
                {(item.status === "in_process") && <TouchableOpacity onPress={handleCancel}>
                    <PinkX style={[{ transform: [{ scaleX: scaleRedX }, { scaleY: scaleRedX }] }, { top: -6 }]} />
                </TouchableOpacity>}
                {(item.status === "done") && <TouchableOpacity onPress={handleCheck}>
                    <CheckGreen style={{ transform: [{ scaleX: scaleCheckGreen }, { scaleY: scaleCheckGreen }] }} />
                </TouchableOpacity>}
                <TouchableOpacity onPress={() => setModalOpen(true)}>
                    <Thumb style={{ transform: [{ scaleX: scaleThumb }, { scaleY: scaleThumb }] }} />
                </TouchableOpacity>
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

export default JobsFromMeCard

const s = StyleSheet.create({

    testCard: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        height: 80,
        //   backgroundColor: "ivory",
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
        //    backgroundColor: "plum",
        paddingTop: 4,
        paddingBottom: 2,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    jobInfo: {
        height: "100%",
        width: "38%",
        //  backgroundColor: "peachpuff",
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
        backgroundColor: "navy",
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    time: {
        height: "30%",
        // width: "40%",
        backgroundColor: "olive",
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
        //   backgroundColor: "pink",
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

const mS = StyleSheet.create({

    modalBlock: {
        flex: 1,
        width: "100%",
        backgroundColor: 'rgba(36, 54, 99, 0.88)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    innerBlock: {
        width: "90%",
        height: 200,
        borderRadius: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative'
    },

    header: {
        //   backgroundColor: "lime",
        marginTop: 20
    },

    closeIcon: {
        position: 'absolute',
        top: 10,
        left: 10
    },


})