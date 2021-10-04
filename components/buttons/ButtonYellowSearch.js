import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, Alert, TouchableOpacity } from 'react-native'
import { g } from '../../styles/global'
import { serviceAPI } from '../../src/api/api'

import { useNavigation } from '@react-navigation/native'
import { updateProfileThunk } from '../../redux/store'

import Spinner from 'react-native-loading-spinner-overlay'

const ButtonYellowSearch = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const onPress = async () => {
    if (props.logged) {
      setLoading(true)


      try {
        await serviceAPI.orderService(props.chosenId, props.date)
        dispatch(updateProfileThunk())
  
        Alert.alert('מזל טוב !', 'המשימה נוספה בהצלחה', [{
          text: 'אישור',
          onPress: () => {
            setLoading(false)
            navigation.navigate('Profile')
          } 
        }])
      } catch (e) {
        console.log(e)
      }

   

    } else {
      Alert.alert('אנא הירשם', 'הפניה לרישום', [{
        text: 'אישור',
        onPress: () => navigation.navigate('Registration')
      }])
    }
  }

  return <TouchableOpacity style={[s.button, { marginBottom: props.bottom }]} onPress={onPress} >
    <Spinner visible={loading} textContent={'טוען...'} textStyle={g.text22_700_white} />
    <Text style={[g.text24_700_blue, s.text]} > {props.name} </Text>
  </TouchableOpacity>
}

const s = StyleSheet.create({
  button: {
    //top: -26,
    //marginBottom: -56,
    bottom: '9%',
    height: 52,
    width: '70%',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FECB07',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    zIndex: 10,
    position: 'absolute',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.3,
    // shadowColor: "blue",
    shadowRadius: 4
  },

  text: {
    marginTop: -2
  }
})

export default ButtonYellowSearch