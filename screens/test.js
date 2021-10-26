import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    Pressable,
    Alert,
    SafeAreaView,
    Button,
    ImageBackground,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Dimensions,
    NativeModules,
    Platform
} from 'react-native'

import { useKeyboard } from '@react-native-community/hooks'

export default function Test() {

    console.log(Dimensions.get('window').height)
    console.log(Dimensions.get('screen').height)

    const { StatusBarManager } = NativeModules

    const [height, setHeight] = useState(0)

    useEffect(() => {
        StatusBarManager.getHeight(h => setHeight(h.height))
    }, [])

    console.log(height)

    const [scroll, setScroll] = useState(false)

    const keyboard = useKeyboard()

    console.log('keyboard isKeyboardShow: ', keyboard.keyboardShown)
    console.log('keyboard keyboardHeight: ', keyboard.keyboardHeight)




    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}        >
        <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
     
               
                    <ScrollView scrollEnabled={true} style={[s.scr]} contentContainerStyle={[s.scrCont]}>
                        <View style={s.innerScroll}>
                            <TextInput style={s.input}></TextInput>
                            <TextInput style={s.input}></TextInput>
                            <TextInput style={s.input}></TextInput>
                            <TextInput style={s.input}></TextInput>
                            <TextInput style={s.input}></TextInput>
                            <TextInput style={s.input}></TextInput>
                            <TextInput style={s.input}></TextInput>
                            <TextInput style={s.input}></TextInput>

                            <View style={s.butt}>
                                <Text>Knopka</Text>
                            </View>
                        </View>
                    </ScrollView>
                   
             
           
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )
}

const s = StyleSheet.create({


    logoBlock: {
        width: "85%",
        height: 200,
        backgroundColor: "lightgreen",
        alignItems: "center",
        justifyContent: "center"
    },

    innerScroll: {
        width: "80%",
        backgroundColor: "yellow",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    butt: {
        width: "60%",
        height: 50,
        backgroundColor: "peru",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },

    inner: {
        width: "80%",
        backgroundColor: "grey",
        height: 600,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    avo: {
        flex: 1,
        width: "90%"
    },

    outer: {
        flex: 1,
        backgroundColor: "red",
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    scr: {
        flex: 1,
        width: "90%",
        backgroundColor: "blue",
        /*   alignItems: 'center',
        /*   justifyContent: 'space-between',
           height: 700*/
    },

    scrCont: {

        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "pink",
        //  width: "100%"
    },



    input: {
        width: "80%",
        height: 50, backgroundColor: "white",
        margin: 2,
        margin: 20
    },


})
