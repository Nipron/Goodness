import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AvatarBig from '../components/avatars/AvatarBig'

import SmallLayout from '../components/layouts/SmallLayout'

import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import PersonalInfo from '../components/personalInfo/PersonalInfo'

import DropDownBlue from '../components/dropdowns/DropDownBlue'
import ButtonRed from '../components/buttons/ButtonRed'

export default function Profile () {

console.log("FFF FFF FFF")

  const navigation = useNavigation()

  const d = useSelector(state => state.all)
  const [data, setData] = useState(d)

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true
      if (isActive) {
        setData(d)    
      }
      
      return () => {
        isActive = false
      }
    }, [d])
  )

  let worksToMe = []
  let worksToMeHistory = []
  let ordersFromMe = []
  let ordersFromMeHistory = []

  if (!!data.works) {
    //works - from somebody to me (I work)
    worksToMe = data.works.filter(
      job => job.status === 'in_process' || job.status === 'done'
    )
    worksToMeHistory = data.works.filter(job => job.status === 'approved')
    //orders - from me to somebody (I give orders - somebody works)
    ordersFromMe = data.orders.filter(
      job => job.status === 'in_process' || job.status === 'done'
    )
    ordersFromMeHistory = data.orders.filter(job => job.status === 'approved')
  }

  const handleExit = async () => {
    await AsyncStorage.removeItem('token')
    navigation.navigate('Home')
    console.log('EXIT OK')
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <SmallLayout text={` שלום, ${data.name}`}>
        <AvatarBig path={data.avatar ? data.avatar.path : null} />
       
        <ScrollView
          style={s.regBlock}
          contentContainerStyle={s.regBlockContainer}
        >
           <PersonalInfo />
           
          <View style={s.folders}>
            <DropDownBlue
              name={'שירותים מוזמנים על ידי משתמשים אחרים'}
              list={worksToMe}
              toMe={true}
              type={1}
            />
            <View style={s.line} />
            <DropDownBlue
              name={'שירותים מוזמנים על ידי המשתמש'}
              list={ordersFromMe}
              toMe={false}
              type={2}
            />
            <View style={s.line} />
            <DropDownBlue
              name={'היסטוריית מסירת השירות'}
              list={worksToMeHistory}
              toMe={true}
              type={3}
            />
            <View style={s.line} />
            <DropDownBlue
              name={'היסטוריית קבלת השירות'}
              list={ordersFromMeHistory}
              toMe={false}
              type={3}
            />
          </View>
          <ButtonRed name='הצעת שירות / חיפוש שירות' onPress={() => navigation.navigate('Create')} />
        </ScrollView>
      </SmallLayout>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({
  regBlock: {
    width: '100%',
    height: '100%',
  // backgroundColor: "yellow",
  paddingBottom: 50,
       backgroundColor: "#EFEFEF",
    borderRadius: 20,
    shadowOffset: {width: 0,height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 8
    
  },

  regBlockContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 12
  },

  folders: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
   // backgroundColor: '#EEEEEE',
   //   backgroundColor: "pink",
    borderRadius: 20,
    overflow: 'hidden'
  },

  line: {
    width: '90%',
    height: 1,
    backgroundColor: '#2699FB'
  }
})
