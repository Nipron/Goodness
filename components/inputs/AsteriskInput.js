import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import F_Asterisk from './F_Asterisk';
import OTPInputView from '@twotalltotems/react-native-otp-input'

const AsteriskInput = ({code, setCode}) => {

   // const [value, setValue] = useState(code)
    const [num1, setNum1] = useState(null)
    const [num2, setNum2] = useState(null)
    const [num3, setNum3] = useState(null)
    const [num4, setNum4] = useState(null)
    const [num5, setNum5] = useState(null)
  

    const handleChange = value => {
        //setValue(value)
        setCode(value)
        const arr = value.split('').map(int => parseInt(int))       
        setNum1(arr[0]) 
        setNum2(arr[1])    
        setNum3(arr[2])    
        setNum4(arr[3])    
        setNum5(arr[4])           
    }

    return (
        <View style={s.outer}>            
            <TextInput style={s.searchInput}
                textAlign="left"
                placeholder=""
                //autoFocus="true"
                textContentType="oneTimeCode"
                caretHidden={true}
                keyboardType="number-pad"
                maxLength={5}
                onChangeText={handleChange}
                textContentType="oneTimeCode"
                
            >
            </TextInput>
            <View style={s.plug}
                pointerEvents='none'>
            </View>
            <View style={s.numberBlock} pointerEvents='none'>
                <F_Asterisk number={num1} />
                <F_Asterisk number={num2} />
                <F_Asterisk number={num3} />
                <F_Asterisk number={num4} />
                <F_Asterisk number={num5} />
            </View>
        </View>
    )
}

export default AsteriskInput

const s = StyleSheet.create({

    outer: {
        width: '90%',
        position: 'relative'
    },

    searchInput: {
        backgroundColor: 'white',
        borderRadius: 30,
        height: 60,
        width: '100%',
        fontSize: 0
    },

    plug: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
        backgroundColor: "#FFFFFF",
        position: 'absolute',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'rgba(36, 54, 99, 0.19)',        
        shadowColor: 'rgba(0, 0, 0, 0.19)',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 50,
    },

    numberBlock: {
        width: "100%",
        height: "100%",
      //  backgroundColor: "rgba(100,100,100, 0.5)",
        position: "absolute",
       // top: "50%",
       // left: "50%",
      //  transform: [{ translateX: "-115%" }, { translateY: "-20%" }],
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-evenly"
    }
});