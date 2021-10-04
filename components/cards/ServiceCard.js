import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import 'moment/locale/he'

import AvatarPlain from '../../Images/AvatarPlain.jpg'
import LetterClosed from '../../Images/LetterClosed.svg'
import LetterOpened from '../../Images/LetterOpened.svg'
import Date from '../../Images/Date.svg'
import Time from '../../Images/Time.svg'
import Arrow from '../../Images/Arrow.svg'
import PinkX from '../../Images/PinkX.svg'
import BinRed from '../../Images/BinRed.svg'

import { g } from '../../styles/global'
import { messageAPI, serviceAPI, userAPI, commonAPI } from '../../src/api/api'
import { updateAll } from '../../redux/store'
import { setTempUserThunk } from '../../redux/tempUserReducer'

import { setMessagesThunk } from '../../redux/messagesReducer'
import DaysPanelSmall from '../panels/DaysPanelSmall'

const ServiceCard = ({ serv }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const [open, setOpen] = useState(false)

  const scaleEnvelope = 0.8
  const scaleDate = 1.1
  const scaleTime = 1.1
  const scaleArrow = 1.4

  const date = moment(serv.createdAt).format('L')
  const time = moment(serv.createdAt).format('LT')

  const [header, setHeader] = useState('הודעת מערכת')

  const scaleRedX = 1.4

  const catsFlat = useSelector(state => state.categoriesFlat)

  const [cat, setCat] = useState('d')

  const getCat = async () => {
    await commonAPI.getServiceCategory(serv.id).then(res => {
      let cat = catsFlat.find(cat => cat.id === res.data.category.id).title
      setCat(cat)
    })
  }

  useEffect(() => {
    getCat()
    return () => {}
  }, [cat])

  const handleDelete = async () => {
    await serviceAPI.deleteService(serv.id)
    await userAPI.dashboard().then(data => {
      dispatch(updateAll(data))
      navigation.navigate('Services')
    })
  }

  const days = [
    serv.weekDays.includes('sun'),
    serv.weekDays.includes('mon'),
    serv.weekDays.includes('tue'),
    serv.weekDays.includes('wed'),
    serv.weekDays.includes('thu'),
    serv.weekDays.includes('fri'),
    serv.weekDays.includes('sat')
  ]

  console.log(serv.actionRadius)

  return (
    <View>
      <View style={s.outer}>
      <View style={s.icon}>
          <TouchableOpacity style={s.avatarBlock} onPress={handleDelete}>
            <BinRed
              style={{
                transform: [{ scaleX: scaleRedX }, { scaleY: scaleRedX }]
              }}
            />
          </TouchableOpacity>
        </View>
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
          </View>
          <View style={s.name}>
            <Text style={g.text20_400_blue}>{cat}</Text>
          </View>
          <View style={s.days}>
            <View style={s.daysPanel}>
              <DaysPanelSmall days={days} textFont={10} />
            </View>
            <View style={s.area}>
              {
                (serv.actionRadius / 1000 > 25) && 
                <Text>Online</Text>
              }
              {
                (serv.actionRadius / 1000 === 25) && 
                <Text>אזור עיר</Text>
              }
              {
                (serv.actionRadius / 1000 < 25) && 
                <Text>ק"מ {serv.actionRadius / 1000} מרחק</Text>
              }             
            </View>
          </View>
        </View>
        
      </View>
      <View style={s.line} />
    </View>
  )
}

export default ServiceCard

const s = StyleSheet.create({
  outer: {
    width: '100%',
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.2,
    // shadowColor: "blue",
    shadowRadius: 4
  },

  info: {
    height: '100%',
    width: '85%'
    //  backgroundColor: 'green'
  },

  header: {
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
    //  backgroundColor: 'olive'
  },

  name: {
    height: '40%',
    width: '100%',
    //  backgroundColor: 'pink',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10
  },

  days: {
    paddingLeft: 5,
    height: '35%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
    // backgroundColor: 'green'
  },

  daysPanel: {
    height: '100%',
    width: '50%',
    // backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3
  },

  area: {
    width: '50%',
    height: '100%',
   //  backgroundColor: "maroon" ,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10
  },

  body: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
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
    alignItems: 'flex-end',
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
