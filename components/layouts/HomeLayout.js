import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Pressable, Alert, Button, TouchableWithoutFeedback, ImageBackground, KeyboardAvoidingView, Keyboard } from 'react-native';
import ButtonBlue from '../../src/ButtonBlue';
import FooterHome from '../footer/FooterHome';

import { useNavigation } from '@react-navigation/native'

export default function HomeLayout(props) {

    const navigation = useNavigation()

    const [checked, setChecked] = useState(false)

    return (
        <KeyboardAvoidingView style={s.containerMain} behavior="padding">
            <View style={s.containerBlu}>
                <ImageBackground source={require('../../Images/Background.png')}
                    resizeMethod={'auto'} style={s.background}>
                    {props.children}
                </ImageBackground>
            </View>
            <ButtonBlue name="הרשמה" bottom={0} onPress={() => {
              /*  if (checked) {*/
                    navigation.navigate('Registration')
              /*  } else {
                    Alert.alert('אנא הסכים לתנאי השימוש', 'אנא קרא את תנאי השימוש וסמן את תיבת הסימון', [{
                        text: 'אישור', onPress: () => {}}])
                }    */            
            }
            } />
            <FooterHome checked={checked} setChecked={setChecked} />
        </KeyboardAvoidingView>
    );
}

const s = StyleSheet.create({
    containerMain: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    containerBlu: {
        height: "88%",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    background: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        overflow: 'hidden',
    }
});