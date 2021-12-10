import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import MessageCard from '../components/cards/MessageCard'

import SmallLayout from '../components/layouts/SmallLayout'
import MessageSimple from '../components/messages/messageSimple'

import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { messageAPI, serviceAPI, userAPI } from '../src/api/api'
import g from '../styles/global'

import { setMessagesThunk } from '../redux/messagesReducer'

export default function Messages ({ navigation }) {
  const messages = useSelector(state => state.messages)
  const dispatch = useDispatch()

 /* useFocusEffect(
    React.useCallback(() => {
      let loop = setInterval(() => {
        console.log("Refresh Message")
        dispatch(setMessagesThunk())
      }, 6000)
      return () => {
        clearInterval(loop)
      }
    }, [])
  );*/

 /* const [messages, setMessages] = useState(m)

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true
      if (isActive) {
        setMessages(m)
      }
      return () => {
        isActive = false
      }
    }, [m])
  )*/
  const filteredMessages = messages.filter(item => /*item.type !== "feedback"*/ item)

  const sortedMessages = filteredMessages.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <SmallLayout text='הודעות'>
        <View style={s.messagesBlock}>
          {sortedMessages.length === 0 && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%'
              }}
            >
              <Text style={g.text24_700_blue}>אין לך הודעות</Text>
            </View>
          )}
          <ScrollView
            style={s.scrollBlock}
            contentContainerStyle={s.scrollBlockContent}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode='on-drag'
          >
            {sortedMessages.map(m => (
              <MessageCard m={m} key={m.id} />
            ))}
          </ScrollView>
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
    backgroundColor: '#FFFFFF',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 20,
    padding: 6,
    marginTop: -60
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
