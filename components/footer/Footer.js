import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { useNavigation } from '@react-navigation/native'

import Bell from '../../Images/Bell.svg'
import BellPlain from '../../Images/Bell6.svg'
import Cabinet from '../../Images/Cabinet.svg'
import Info from '../../Images/Info.svg'
import Search from '../../Images/Search.svg'

const Footer = ({ hide }) => {
  const navigation = useNavigation()
  const data = useSelector(state => state.all)
  const messages = useSelector(state => state.messages)

  hide = !data.id
  
  const scale = 1.4
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
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Info style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
        </TouchableOpacity>
        {!hide && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Messages')}
            style={s.bell}
          >
            {!unread && (
              <BellPlain
                style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
              />
            )}
            {!!unread && (
              <View>
                <Bell
                  style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
                />
              </View>
            )}
            {!!unread && (
              <View style={s.red}>
                <Text style={s.amount}>{unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <Search
            style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
          />
        </TouchableOpacity>
        {!hide && (
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Cabinet
              style={{
                transform: [{ scaleX: scaleCabinet }, { scaleY: scaleCabinet }]
              }}
            />
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
    //  backgroundColor: "olive"
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
    right: -2,
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
