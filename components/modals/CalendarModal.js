import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TextInput, Image, Alert, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

import CloseIcon from '../../Images/CloseIcon'

import moment from 'moment'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default function CalendarModal({ modalOpen, setModalOpen, date, setDate }) {

    const dispatch = useDispatch()

    const handlePickDate = day => {
        setModalOpen(false)
        setDate(day)
     //   console.log(day)
    }

    return (
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

                        <Calendar
                            minDate={moment().add(1, 'days').format('YYYY-MM-DD')}
                            maxDate={moment().add(92, 'days').format('YYYY-MM-DD')}
                            onDayPress={day => { handlePickDate(day) }}
                            monthFormat={'MM yyyy'}
                            onMonthChange={(month) => { console.log('month changed', month) }}
                            firstDay={0}
                            onPressArrowLeft={subtractMonth => subtractMonth()}
                            onPressArrowRight={addMonth => addMonth()}

                        />

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal >)
}

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
       // height: 360,
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