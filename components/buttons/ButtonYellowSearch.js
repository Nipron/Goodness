import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, Pressable, Alert } from 'react-native'
import { g } from '../../styles/global'
import { serviceAPI, userAPI } from '../../src/api/api'

import { useNavigation } from '@react-navigation/native'
import { updateAll } from '../../redux/store'

const ButtonYellowSearch = props => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const onPress = async () => {
    if (props.logged) {
      //  console.log("Ordered ID# ", props.chosenId)
      await serviceAPI.orderService(props.chosenId, props.date)
      await userAPI.dashboard().then(data => {
        dispatch(updateAll(data))
        Alert.alert('מזל טוב !!! ', 'המשימה נוספה בהצלחה', [
          { text: 'בסדר' , onPress: () => navigation.navigate('Profile') }
        ])        
      })
    } else {
      Alert.alert('אנא הירשם', 'הפניה לרישום', [
        { text: 'Ok', onPress: () => navigation.navigate('Registration') }
      ])
    }
  }

  return (
    <Pressable
      style={[s.button, { marginBottom: props.bottom }]}
      onPress={onPress}
    >
      <Text style={[g.text24_700_blue, s.text]}>{props.name}</Text>
    </Pressable>
  )
}

const s = StyleSheet.create({
  button: {
    //top: -26,
    //marginBottom: -56,
    bottom: "9%",
    height: 52,
    width: '70%',
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FECB07',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    zIndex: 10,
    position: "absolute"
  },

  text: {
    marginTop: -2
  }
})

export default ButtonYellowSearch
