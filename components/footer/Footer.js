import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { useNavigation, useRoute } from '@react-navigation/native'

import Bell from '../../Images/Bell.svg'
import BellLight from '../../Images/BellLight.svg'
import BellAlert from '../../Images/BellAlert.svg'
import BellAlertLight from '../../Images/BellAlertLight.svg'
import Profile from '../../Images/Profile.svg'
import ProfileLight from '../../Images/ProfileLight.svg'
import Info from '../../Images/Info.svg'
import InfoLight from '../../Images/InfoLight.svg'
import Search from '../../Images/Search.svg'
import SearchLight from '../../Images/SearchLight.svg'
import Service from '../../Images/Service.svg'
import ServiceLight from '../../Images/ServiceLight.svg'
import Create from '../../Images/Create.svg'
import CreateLight from '../../Images/CreateLight.svg'


const Footer = ({ hide }) => {
  const navigation = useNavigation()
  const route = useRoute()
  const data = useSelector(state => state.all)
  const messages = useSelector(state => state.messages)

  hide = !data.id

  const scale = 1.4
  const scaleHands = 1.3
  const scaleCabinet = 1.3
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
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          {route.name === 'About' ? (
            <InfoLight
              style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
            />
          ) : (
            <Info
              style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
            />
          )}
        </TouchableOpacity>
        {!hide && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Messages')}
            style={s.bell}
          >
            {!unread &&
              (route.name === 'Messages' ? (
                <BellLight
                  style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
                />
              ) : (
                <Bell
                  style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
                />
              ))}
            {!!unread &&
              (route.name === 'Messages' ? (
                <View>
                  <BellAlertLight
                    style={{
                      transform: [{ scaleX: scale }, { scaleY: scale }]
                    }}
                  />
                </View>
              ) : (
                <View>
                  <BellAlert
                    style={{
                      transform: [{ scaleX: scale }, { scaleY: scale }]
                    }}
                  />
                </View>
              ))}
            {!!unread && (
              <View style={s.red}>
                <Text style={s.amount}>{unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          {route.name === 'Create' ? (
            <CreateLight
              style={{ transform: [{ scaleX: scaleHands }, { scaleY: scaleHands }] }}
            />
          ) : (
            <Create
              style={{ transform: [{ scaleX: scaleHands }, { scaleY: scaleHands }] }}
            />
          )}
        </TouchableOpacity>

        {!hide && (
          <TouchableOpacity onPress={() => navigation.navigate('Services')}>
            {route.name === 'Services' ? (
              <ServiceLight
                style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
              />
            ) : (
              <Service
                style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
              />
            )}
          </TouchableOpacity>
        )}
        {!hide && (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            {route.name === 'Profile' ? (
              <ProfileLight
                style={{
                  transform: [
                    { scaleX: scaleCabinet },
                    { scaleY: scaleCabinet }
                  ]
                }}
              />
            ) : (
              <Profile
                style={{
                  transform: [
                    { scaleX: scaleCabinet },
                    { scaleY: scaleCabinet }
                  ]
                }}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  footer: {
    width: '100%',
    height: '9%',
    alignItems: 'center',
    justifyContent: 'center'
    //   backgroundColor: "olive"
  },

  bell: {
    //   backgroundColor: "pink"
  },

  amount: {
    color: 'white',
    fontSize: 13,
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
    right: -4,
    top: -4
  },

  footerInner: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})

export default Footer
