import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

import AvatarBig from '../components/avatars/AvatarBig';

import SmallLayout from '../components/layouts/SmallLayout';

import { useNavigation } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import PersonalInfo from '../components/personalInfo/PersonalInfo';

import DropDownBlue from '../components/dropdowns/DropDownBlue';
import ButtonRed from '../components/buttons/ButtonRed';

export default function Profile() {

    const navigation = useNavigation()
    const data = useSelector(state => state.all)

    const handleExit =() => {
        console.log("ggg")
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <SmallLayout text={` שלום, ${data.name}`}>
                <AvatarBig path={data.avatar.path} />
                <PersonalInfo />

                <ScrollView style={s.regBlock} contentContainerStyle={s.regBlockContainer}>
                    <View style={s.folders} >
                        <DropDownBlue name={"שירותים מוזמנים על ידי משתמשים אחרים"} list={data.ordersFrom} toMe={true} type={1} />
                        <View style={s.line} />
                        <DropDownBlue name={"שירותים מוזמנים על ידי המשתמש"} list={data.jobsTo} toMe={false} type={2} />
                        <View style={s.line} />
                        <DropDownBlue name={"היסטוריית מסירת השירות"} list={data.ordersFromHistory} toMe={true} type={3} />
                        <View style={s.line} />
                        <DropDownBlue name={"היסטוריית קבלת השירות"} list={data.jobsToHistory} toMe={false} type={3} />
                    </View>
                    <ButtonRed name="לצאת מהחשבון שלי" onPress={handleExit} />
                </ScrollView>
            </SmallLayout>
        </TouchableWithoutFeedback>
    );
}

const s = StyleSheet.create({

    regBlock: {
        width: "100%",
        height: "100%",
        //   backgroundColor: "brown",
        //   backgroundColor: "#EEEEEE",
        paddingBottom: 26,
        borderRadius: 20,
    },

    regBlockContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    folders: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#EEEEEE",
        borderRadius: 20,
        overflow: 'hidden',
        paddingBottom: 26
    },

    line: {
        width: "90%",
        height: 1,
        backgroundColor: "#2699FB"
    }

});

