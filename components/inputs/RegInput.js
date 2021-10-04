import React, {useState} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView
} from 'react-native'
import { g } from '../../styles/global'

const RegInput = props => {

const [focus, setFocus] = useState(false)

  return (
    <KeyboardAvoidingView style={s.outer}>
      <TextInput
        style={[
          s.input,
          g.text20_400_blue,
          {
            borderColor: props.borderColor
              ? props.borderColor
              : 'rgba(255, 255, 255, 0.0)'
          }
        ]}
        textAlign='right'
        keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        placeholderTextColor='#CCCCCC'
        autoCapitalize={props.autoCapitalize}
        maxLength={props.maxLength ? props.maxLength :50}
        secureTextEntry={props.secureTextEntry}
        onFocus={() => props.setFocus(true)}
        onBlur={() => props.setFocus(false)}
        maxLength={20}
      ></TextInput>
      <View style={s.icon}>
        <View style={s.svg}>{props.children}</View>
      </View>
      
    </KeyboardAvoidingView>
  )
}

export default RegInput

const s = StyleSheet.create({

  bottomPlug: {
    width: "100%",
    height: 150,
    backgroundColor: "red"
},
  outer: {
    width: '100%',
    position: 'relative',
    //  backgroundColor: "red",
    marginVertical: 5,
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 30,
    borderWidth: 1,
    height: '100%',
    width: '100%',
    fontSize: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingRight: 60
  },

  icon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'lightgrey',
    shadowOffset: { width: 4, height: 4 },
    shadowRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
  }
})
