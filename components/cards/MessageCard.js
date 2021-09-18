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

import { g } from '../../styles/global'
import { messageAPI, serviceAPI, userAPI, commonAPI } from '../../src/api/api'
import { updateAll } from '../../redux/store'
import { setTempUserThunk } from '../../redux/tempUserReducer'

import { setMessagesThunk } from '../../redux/messagesReducer'

const MessageCard = ({ m }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(m.from)

  const scaleEnvelope = 0.8
  const scaleDate = 1.1
  const scaleTime = 1.1
  const scaleArrow = 1.4

  const date = moment(m.createdAt).format('L')
  const time = moment(m.createdAt).format('LT')

  const [header, setHeader] = useState('הודעת מערכת')

  const scaleRedX = 2.4

  console.log(m.type)
  console.log(m.message.status)

  console.log(m)

  useEffect(() => {
    switch (m.type) {
      case 'contract_created':
        switch (m.message.status) {
          case 'approved':
            setHeader('הזמנתכם אושרה')
            break
          case 'in_process':
            setHeader('התקבלה הזמנה חדשה')
            break
          case 'canceled':
            setHeader('הזמנת משימה בוטלה')
            break
          default:
            break
        }
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
    return () => {}
  }, [m])

  const handleOpen = async () => {
    if (!open) {
      await messageAPI.readMessage(m.id)
      await messageAPI.getMessages().then(data => {
        dispatch(setMessagesThunk(data))
      })
    }
    setOpen(!open)
  }

  const handleDelete = async () => {
    await messageAPI.deleteMessage(m.id)
    await messageAPI.getMessages().then(data => {
      dispatch(setMessagesThunk(data))
    })
    navigation.navigate('Messages')
  }

  const goToPersonalInfo = async () => {
    dispatch(setTempUserThunk(user.id))
    navigation.navigate('UserInfo')
  }

  return (
    <View>
      <TouchableOpacity style={s.outer} onPress={handleOpen}>
        <View style={s.info}>
          <View style={s.header}>
            <View style={s.timeInfo}>
              <View style={s.time}>
                <Text
                  style={[g.text10_400_blue, s.dateStyle, { marginRight: 4 }]}
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
                  style={[g.text10_400_blue, s.dateStyle, { marginRight: 4 }]}
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
            <Text style={g.text20_400_blue}>{header}</Text>
          </View>
        </View>
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
        <View style={s.point}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: m.isRead ? '#E5E5E5' : '#3993D6',
              borderRadius: 5
            }}
          ></View>
        </View>

        {/*<View style={s.arrow}>
            <Arrow
              style={{
                transform: [
                  { scaleX: scaleArrow },
                  { scaleY: scaleArrow },
                  { rotate: open ? '90deg' : '0deg' }
                ]
              }}
            />
            </View>*/}
        {/*<View style={s.user}>
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
            <Text style={g.text13_400_blue}>{user.name}</Text>
          </View>
          <View style={s.info}>
            <View style={s.jobInfo}>
              <View style={s.date}>
                <Text
                  style={[g.text13_400_blue, s.dateStyle, { marginRight: 4 }]}
                >
                  {date}
                </Text>
                <Date
                  style={{
                    transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }]
                  }}
                />
              </View>
              <View style={s.time}>
                <Text
                  style={[g.text13_400_blue, s.dateStyle, { marginRight: 4 }]}
                >
                  {time}
                </Text>
                <Time
                  style={{
                    transform: [{ scaleX: scaleTime }, { scaleY: scaleTime }]
                  }}
                />
              </View>
            </View>
            <View style={s.messHeaderContainer}>
              <Text style={g.text16_600_blue}>{header}</Text>
            </View>
          </View>*/}

        {/*!m.isRead && (
            <View style={s.envIcon}>
              <LetterClosed
                style={{
                  transform: [
                    { scaleX: scaleEnvelope },
                    { scaleY: scaleEnvelope }
                  ]
                }}
              />
            </View>
          )}
          {m.isRead && (
            <View style={s.envIcon}>
              <LetterOpened
                style={{
                  transform: [
                    { scaleX: scaleEnvelope },
                    { scaleY: scaleEnvelope }
                  ]
                }}
              />
            </View>
          )*/}

        {/*open && Object.keys(user).length > 0 && (
          <View style={s.messBody}>
            <TouchableOpacity onPress={handleDelete}>
              <RedX
                style={{
                  transform: [{ scaleX: scaleRedX }, { scaleY: scaleRedX }]
                }}
              />
            </TouchableOpacity>
          </View>
              )*/}
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
    justifyContent: 'space-between'
  },

  info: {
    height: '100%',
    width: '80%',
  //  backgroundColor: 'green'
  },

  header: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
 //   backgroundColor: 'olive'
  },

  body: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
 //   backgroundColor: 'orange'
  },

  icon: {
    height: '100%',
    width: '15%',
 //   backgroundColor: 'pink',
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

  point: {
    height: '100%',
    width: '5%',
  //  backgroundColor: 'red',
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
    width: '100%',
    height: 1,
    marginVertical: 3,
    backgroundColor: '#2699FB'
  },

  user: {
    paddingLeft: 8,
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
 //   backgroundColor: 'peachpuff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row'
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
    //    width: "40%",
 //   backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10
  },

  body: {
    flex: 1,
 //   backgroundColor: 'azure',
    alignItems: 'center',
    justifyContent: 'center'
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
