import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';

import ButtonBlue from '../src/ButtonBlue';
import { userAPI } from '../src/api/api';
import RegAvatar from '../components/avatars/RegAvatar';

import CloseIcon from '../Images/CloseIcon'
import { g } from '../styles/global'
import AsteriskInput from '../components/inputs/AsteriskInput';

import { Formik } from 'formik'
import RegInput from '../components/inputs/RegInput';
import RegInputSmall from '../components/inputs/RegInputSmall';
import AvatarBig from '../components/avatars/AvatarBig';



import SmallLayout from '../components/layouts/SmallLayout';

import { useNavigation } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import PersonalInfo from '../components/personalInfo/PersonalInfo';

import TestCard from '../components/cards/TestCard'
import DropDownBlue from '../components/dropdowns/DropDownBlue';
import ButtonRed from '../components/buttons/ButtonRed';

export default function Profile() {

    const navigation = useNavigation()
    const data = useSelector(state => state.all)   

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <SmallLayout text={`Hello, ${data.name}`}>
                <AvatarBig />
                <PersonalInfo/>
                <ScrollView style={s.regBlock} contentContainerStyle={s.regBlockContainer}>
                
                    <View style={s.folders} >                       
                        <DropDownBlue name={"שירותים מוזמנים על ידי משתמשים אחרים"} list={data.ordersTo}/>
                        <View style={s.line}/>
                        <DropDownBlue name={"שירותים מוזמנים על ידי המשתמש"} list={data.jobsTo}/>
                        <View style={s.line}/>
                        <DropDownBlue name={"היסטוריית מסירת השירות"}/>
                        <View style={s.line}/>
                        <DropDownBlue name={"היסטוריית קבלת השירות"}/>
                    </View>

                    <ButtonRed name="לצאת מהחשבון שלי" onPress={() => {}}/>
                    
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

