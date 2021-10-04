import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import 'moment/locale/he'

import AvatarPlain from '../../Images/AvatarPlain.jpg'
import LetterClosed from '../../Images/LetterClosed.svg'
import LetterOpened from '../../Images/LetterOpened.svg'
import Date from '../../Images/Date.svg'
import Time from '../../Images/Time.svg'
import Arrow from '../../Images/Arrow.svg'
import RedX from '../../Images/RedX.svg'
import BinRed from '../../Images/BinRed.svg'

import { g } from '../../styles/global'
import { messageAPI, serviceAPI, userAPI, commonAPI } from '../../src/api/api'
import { updateAll } from '../../redux/store'
import { setTempUserThunk } from '../../redux/tempUserReducer'

import { setMessagesThunk } from '../../redux/messagesReducer'

import Spinner from 'react-native-loading-spinner-overlay'

const MessageCard = ({ m }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(m.from)

  const scaleEnvelope = 0.8
  const scaleDate = 1.1
  const scaleTime = 1.1
  const scaleArrow = 1.4

  const date = moment(m.createdAt).format('L')
  const time = moment(m.createdAt).format('LT')

  const [header, setHeader] = useState('הודעת מערכת')

  const scaleRedX = 1.2

  useEffect(() => {
    switch (m.type) {
      case 'contract_created':
        setHeader('התקבלה הזמנה חדשה')
        break

      case 'contract_changed':
        switch (m.message.status) {
          case 'approved':
            setHeader('הזמנתכם אושרה')
            break
          case 'done':
            setHeader('משימתכם בוצעה בהצלחה')
            break
          case 'canceled':
            setHeader('הזמנת משימה בוטלה')
            break
          default:
            break
        }
        break

      case 'referral':
        setHeader('קיבלת לב אחד בעבור הפניה')
        break

      case 'feedback':
        setHeader('קיבלת משוב')
        break

      default:
        break
    }
    return () => { }
  }, [m])

  const handleOpen = async () => {
    if (!open) {
      setLoading(true)
      await messageAPI.readMessage(m.id)
      dispatch(setMessagesThunk())
      setOpen(true)
      setLoading(false)
    }

  }

  const handleDelete = async () => {
    setLoading(true)
    await messageAPI.deleteMessage(m.id)
    dispatch(setMessagesThunk())
    setLoading(false)
  }

  const goToPersonalInfo = async () => {
    setLoading(true)
    dispatch(setTempUserThunk(user.id))
    navigation.navigate('UserInfo')
    setLoading(false)
  }

  return (
    <View style={{alignItems: "center"}}>
      <Spinner
        visible={loading}
        textContent={'טוען...'}
        textStyle={g.text22_700_white}
      />
      <TouchableOpacity style={s.outer} onPress={handleOpen}>
        <View style={s.info}>
          <View style={s.header}>
            <View style={s.timeInfo}>
              <View style={s.time}>
                <Text
                  style={[m.isRead ? g.text10_400_grey : g.text10_400_blue, s.dateStyle, { marginRight: 4 }]}
                >
                  {time}
                </Text>
                <Time
                  style={{
                    transform: [{ scaleX: scaleTime }, { scaleY: scaleTime }]
                  }}
                />
              </View>
              <View style={s.date}>
                <Text
                  style={[m.isRead ? g.text10_400_grey : g.text10_400_blue, s.dateStyle, { marginRight: 4 }]}
                >
                  {date}
                </Text>
                <Date
                  style={{
                    transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }]
                  }}
                />
              </View>
            </View>
            <View style={s.from}>
              <Text style={g.text13_400_blue}>{user.name}</Text>
            </View>
          </View>
          <View style={s.body}>
            <TouchableOpacity onPress={handleDelete} style={{ marginLeft: 20}}>
              <BinRed
                style={{
                  transform: [{ scaleX: scaleRedX }, { scaleY: scaleRedX }]
                }}
              />
            </TouchableOpacity>
            <Text style={m.isRead ? g.text20_400_grey2 : g.text20_400_blue}>{header}</Text>
            <View style={s.icon}>
              <TouchableOpacity style={s.avatarBlock} onPress={goToPersonalInfo}>
                <ImageBackground
                  source={
                    user.avatar.path
                      ? { uri: `http://52.48.233.122:3001/${user.avatar.path}` }
                      : AvatarPlain
                  }
                  resizeMethod={'auto'}
                  style={s.avatar}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </TouchableOpacity>
      <View style={s.line} />
    </View>
  )
}

export default MessageCard

const s = StyleSheet.create({
  outer: {
    width: '100%',
    height: 70,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },

  info: {
    height: '100%',
    width: '100%',
    //  backgroundColor: 'green'
  },

  header: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  //     backgroundColor: 'olive'
  },

  body: {
    width: '100%',
    height: '65%',
   // paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  //    backgroundColor: 'orange'
  },

  icon: {
    height: '100%',
    width: '20%',
//     backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatarBlock: {
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
    //    backgroundColor: "pink",
    alignItems: 'center',
    justifyContent: 'center'
  },

  arrow: {
    //   backgroundColor: "ivory",
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16
  },

  line: {
    width: '80%',
    height: 1,
    marginVertical: 3,
    backgroundColor: '#2699FB'
  },

  user: {
    // backgroundColor: 'green',
    width: '25%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },

  avatar: {
    height: '100%',
    width: '100%'
  },

  timeInfo: {
    height: '100%',
    width: "50%",
   //    backgroundColor: 'peachpuff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingRight: 5
  },

  time: {
    height: '100%',
    //width: "40%",
    //  backgroundColor: "olive",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20
  },

  date: {
    height: '100%',
    //    width: "40%",
    //    backgroundColor: "gray",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 5
  },

  from: {
    height: '100%',
        width: "50%",
  //     backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 20
  },



  messHeaderContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },

  messBody: {
    paddingLeft: 20,
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  envIcon: {
    marginLeft: 10,
    marginRight: 10
  }
})
