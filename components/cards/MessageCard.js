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
  const scaleDate = 1.4
  const scaleTime = 1.4
  const scaleArrow = 1.4

  const date = moment(m.createdAt).format('L')
  const time = moment(m.createdAt).format('LT')

  const [header, setHeader] = useState('No name')

  const scaleRedX = 2.4

  console.log(m.type)
  console.log(m.message.status)

  useEffect(() => {
    switch (m.type) {
      case 'contract_created':
        switch (m.message.status) {
          case 'approved':
            setHeader('You recieved new task')
            break
          case 'in_process':
            setHeader('You recieved new task')
            break
          case 'canceled':
            setHeader('Task was canceled')
            break
          default:
            break
        }
        break

      case 'contract_changed':
        switch (m.message.status) {
          case 'approved':
            setHeader('Your work was appoved')
            break
          case 'done':
            setHeader('Your task was done')
            break
          case 'canceled':
            setHeader('Your task was canceled')
            break
          default:
            break
        }
        break

      case 'referral':
        setHeader('points as a referral')
        break

      case 'feedback':
        setHeader('You recieved a feedback')
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
      <TouchableOpacity
        style={[s.outer, { height: open ? 100 : 50 }]}
        onPress={handleOpen}
      >
        <View style={s.header}>
          <View style={s.arrow}>
            <Arrow
              style={{
                transform: [
                  { scaleX: scaleArrow },
                  { scaleY: scaleArrow },
                  { rotate: open ? '90deg' : '0deg' }
                ]
              }}
            />
          </View>
          <View style={s.user}>
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
          </View>

          {!m.isRead && (
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
          )}
        </View>
        {open && Object.keys(user).length > 0 && (
          <View style={s.messBody}>
            <TouchableOpacity onPress={handleDelete}>
              <RedX
                style={{
                  transform: [{ scaleX: scaleRedX }, { scaleY: scaleRedX }]
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
      <View style={s.line} />
    </View>
  )
}

export default MessageCard

const s = StyleSheet.create({
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

  outer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden'
  },

  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  user: {
    paddingLeft: 8,
    // backgroundColor: 'green',
    width: '25%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },

  avatarBlock: {
    height: 30,
    width: 30,
    borderRadius: 15,
    overflow: 'hidden',
    //    backgroundColor: "pink",
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatar: {
    height: 30,
    width: 30
  },

  info: {
    //  backgroundColor: 'pink',
    width: '53%',
    height: '100%'
  },

  jobInfo: {
    height: '50%',
    width: '100%',
    //   backgroundColor: "peachpuff",
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },

  time: {
    height: '100%',
    //width: "40%",
    //  backgroundColor: "olive",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 4
  },

  date: {
    height: '100%',
    //    width: "40%",
    //    backgroundColor: "gray",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 10
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
