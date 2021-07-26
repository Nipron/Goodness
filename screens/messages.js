import React from 'react';
import { StyleSheet, View, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import SmallLayout from '../components/layouts/SmallLayout';
import MessageSimple from '../components/messages/messageSimple';

export default function Terms({ navigation }) {

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <SmallLayout text="הודעות">
        <View style={s.messagesBlock}>
          <ScrollView style={s.scrollBlock} contentContainerStyle={s.scrollBlockContent}>
            <MessageSimple text="Message 1"/>
            <MessageSimple text="Message 2"/>
            <MessageSimple text="Message 3"/>
            <MessageSimple text="Message 4"/>
            <MessageSimple text="Message 5"/>
            <MessageSimple text="Message 6"/>
            <MessageSimple text="Message 7"/>
            <MessageSimple text="Message 8"/>
            <MessageSimple text="Message 9"/>
            <MessageSimple text="Message 10"/>
            <MessageSimple text="Message 11"/>
            <MessageSimple text="Message 12"/>            
          </ScrollView>
        </View>

      </SmallLayout>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({

  messagesBlock: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  //  backgroundColor: "brown",
  backgroundColor: "#EEEEEE",
    width: "100%",
    overflow: 'hidden',
    borderRadius: 40,
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 20,
  },

  scrollBlock: {
    width: "100%",
  //  backgroundColor: "ivory",
  
    overflow: 'hidden',
  },

});