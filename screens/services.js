import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Text
} from 'react-native'
import MessageCard from '../components/cards/MessageCard'

import g from '../styles/global'

import SmallLayout from '../components/layouts/SmallLayout'
import MessageSimple from '../components/messages/messageSimple'

import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { messageAPI, serviceAPI, userAPI } from '../src/api/api'
import ServiceCard from '../components/cards/ServiceCard'

export default function Services({ navigation }) {

  const services = useSelector(state => state.all.services)

  if (services) {
    console.log(services.length)
  } 

  const filteredServices = services ? services.filter(item => item.isActive) : []

  const sortedServices = filteredServices ? filteredServices.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  }) : []

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <SmallLayout text='מעשים טובים שלי'>
        <View style={s.messagesBlock}>          
          <ScrollView
            style={s.scrollBlock}
            contentContainerStyle={s.scrollBlockContent}
          >
            {sortedServices.map(serv => (
              <ServiceCard serv={serv} key={serv.id} />
            ))}
            <View></View>
          </ScrollView>
          {sortedServices.length === 0 && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%'
              }}
            >
              <Text style={g.text24_700_blue}>לא יצרת שירותים</Text>
            </View>
          )}
        </View>
      </SmallLayout>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({
  messagesBlock: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    //    backgroundColor: "lightblue",
    backgroundColor: '#EFEFEF',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 20,
    padding: 6,
    marginTop: -60,
    /* shadowOffset: {width: 3,height: 3},
     shadowOpacity: 0.2,
     shadowRadius: 2*/
  },

  scrollBlock: {
    width: '100%',
    //  backgroundColor: "blue",

    overflow: 'hidden'
  }
})
