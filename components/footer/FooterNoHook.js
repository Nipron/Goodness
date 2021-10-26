import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'

import Bell from '../../Images/BellY.svg'
import BellLight from '../../Images/BellY.svg'
import BellAlert from '../../Images/BellY.svg'
import BellAlertLight from '../../Images/BellY.svg'
import Profile from '../../Images/ProfileY.svg'
import ProfileLight from '../../Images/ProfileY.svg'
import Info from '../../Images/InfoY.svg'
import InfoLight from '../../Images/InfoLight.svg'
import Search from '../../Images/Search.svg'
import SearchLight from '../../Images/SearchLight.svg'
import Service from '../../Images/HeartY.svg'
import ServiceLight from '../../Images/ServiceLight.svg'
import Create from '../../Images/HandsY.svg'
import CreateLight from '../../Images/HandsNewLight.svg'
import Login from '../../screens/login'

import { setMessagesThunk } from '../../redux/messagesReducer'

const FooterNoHook = ({ hide, color }) => {
  const navigation = useNavigation()
  const route = useRoute()
  const data = useSelector(state => state.all)
  const unfilteredMessages = useSelector(state => state.messages)
  const messages = unfilteredMessages.filter(item => /*item.type !== "feedback"*/ item)
  const dispatch = useDispatch()

  hide = !data.id

  const scale = 1.4
  const scaleHands = 1.4
  const scaleCabinet = 1.4
  let unread = 0

  if (!hide) {
    for (let i = 0; i < messages.length; i++) {
      if (!messages[i].isRead) unread++
      if (unread > 9) {
        unread = '9+'
        break
      }
    }
  }

  return (
    <View style={s.footer}>
      <View style={s.footerInner}>
        <TouchableOpacity onPress={() => navigation.navigate('About')} style={[s.outer, route.name === 'About' && s.shadow]}>
          <Info
            style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
          />
        </TouchableOpacity>

        {!hide && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Messages')}
            style={[s.outer, route.name === 'Messages' && s.shadow]}          >

            <Bell
              style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
            />


            {!!unread && (
              <View style={s.red}>
                <Text style={s.amount}>{unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Create')} style={[s.outer, route.name === 'Create' && s.shadow]}>
          <Create
            style={{ transform: [{ scaleX: scaleHands }, { scaleY: scaleHands }] }}
          />
        </TouchableOpacity>

        {!hide && (
          <TouchableOpacity onPress={() => navigation.navigate('Services')} style={[s.outer, route.name === 'Services' && s.shadow]}>
            <Service
              style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
            />
          </TouchableOpacity>
        )}

        {!hide && (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={[s.outer, route.name === 'Profile' && s.shadow]}>
            <Profile
              style={{
                transform: [
                  { scaleX: scaleCabinet },
                  { scaleY: scaleCabinet }
                ]
              }} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const s = StyleSheet.create({

  shadow: {
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 1,
    shadowColor: "#275BAE",
    shadowRadius: 13

  },

  outer: {
    width: 42,
    height: 42,
    backgroundColor: "white",
    borderRadius: 1000,
    alignItems: "center",
    justifyContent: "center"
  },

  footer: {
    width: '100%',
    //   height: '9%',
    height: Dimensions.get('window').height * 0.09,
    alignItems: 'center',
    justifyContent: 'center',
    //   backgroundColor: "olive"
  },

  amount: {
    color: 'white',
    fontSize: 10,
    marginLeft: 1,
    fontWeight: 'bold'
  },

  red: {
    minWidth: 16,
    paddingHorizontal: 2,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'maroon',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 5,
    top: 8,
    borderWidth: 1.5,
    borderColor: "white"
  },

  footerInner: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

export default FooterNoHook












/*const RegisterAndLogin = async (codeSMS, data, image) => {

  try {

    await sendCode(codeSMS)
      .then( res => {

        const token = await sendData(data)
      })




    AsyncStorage.setItem('token', token)

    await login(token)

    await uploadImage(image)

    dispatch(userThunk(userData))

    navigation.navigate("Profile")

  } catch (e) {
    console.log(e)
  }

}*/