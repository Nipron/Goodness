import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
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

export default function Messages ({ navigation }) {
  
  const m = useSelector(state => state.messages)
  const [messages, setMessages] = useState(m)

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
  )
  
  const sortedMessages = messages.sort((a, b) => {
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
          <ScrollView
            style={s.scrollBlock}
            contentContainerStyle={s.scrollBlockContent}
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
