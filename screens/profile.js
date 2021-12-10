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

import Spinner from 'react-native-loading-spinner-overlay'
import { updateProfileThunk } from '../redux/store';
import { userAPI } from '../src/api/api'

import { useIsFocused } from '@react-navigation/native';
import g from '../styles/global'

import PersonWhite from '../Images/PersonWhite.svg'

export default function Profile() {
  const navigation = useNavigation()
  // const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  // dispatch(updateProfileThunk())
  const data = useSelector(state => state.all)

  const scalePerson = 1.3

  useFocusEffect(
    React.useCallback(() => {
      let loop = setInterval(() => {
        console.log("Refresh")
        dispatch(updateProfileThunk())
      }, 6000)
      return () => {
        clearInterval(loop)
      }
    }, [])
  );

  const works = useSelector(state => state.all.works/*, shallowEqual*/)
  const orders = useSelector(state => state.all.orders/*, shallowEqual*/)

  let worksToMe = []
  let worksToMeHistory = []
  let ordersFromMe = []
  let ordersFromMeHistory = []

  if (!!works) {
    //works - from somebody to me (I work)
    worksToMe = works.filter(
      job => job.status === 'in_process' || job.status === 'done'
    ).sort((a, b) => b.id - a.id)
    worksToMeHistory = works.filter(job => job.status === 'approved').sort((a, b) => b.id - a.id)
  }
  if (!!orders) {
    //orders - from me to somebody (I give orders - somebody works)
    ordersFromMe = orders.filter(
      job => job.status === 'in_process' || job.status === 'done'
    ).sort((a, b) => b.id - a.id)
    ordersFromMeHistory = orders.filter(job => job.status === 'approved').sort((a, b) => b.id - a.id)
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
          keyboardShouldPersistTaps="always"
          keyboardDismissMode='on-drag'
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
          <View style={s.refBlock}>
            <View style={s.refCount}>
              <Text style={g.text24_700_lightblue}>{data.refCount}</Text>
            </View>
            <View style={s.refText}>
              <Text style={g.text18_400_blue}>מספר משתמשים, אשר הצטרפו בהזמנה:</Text>
            </View>
            <View style={s.refIcon}>
              <View style={s.blueCircle}>
              <PersonWhite
              style={{ transform: [{ scaleX: scalePerson }, { scaleY: scalePerson }] }}
            />
              </View>
            </View>
          </View>
          <ButtonRed
            name='הצעת שירות / חיפוש שירות'
            onPress={() => navigation.navigate('Create')}
          />
        </ScrollView>
      </SmallLayout>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({

blueCircle: {
  width: 31,
  height: 31,
  borderRadius: 1000,
  marginLeft: 4.5,
  backgroundColor: "#2699FB",
  alignItems: "center",
  justifyContent: "center",
  shadowOffset: {
    width: 2,
    height: 2
  },
  shadowOpacity: 0.3,
  // shadowColor: "blue",
  shadowRadius: 3
},

  refCount: {
    height: "100%",
    //  backgroundColor: "olive",
    alignItems: "center",
    justifyContent: "center"
  },

  refText: {
    height: "100%",
    // backgroundColor: "pink",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center"
  },

  refIcon: {
    width: 60,
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 1000,
    borderTopLeftRadius: 1000,
    alignItems: "flex-start",
    justifyContent: "center",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.3,
    // shadowColor: "blue",
    shadowRadius: 4
  },

  refBlock: {
    width: "100%",
    height: 40,
    marginTop: 5,
    //  backgroundColor: "green",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },

  regBlock: {
    width: '100%',
    height: '100%',
    // backgroundColor: "yellow",
    paddingBottom: 50,
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    shadowOffset: { width: 0, height: 6 },
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
