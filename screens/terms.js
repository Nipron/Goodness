import { StatusBar } from 'expo-status-bar'
import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
  Button,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'

import SmallLayout from '../components/layouts/SmallLayout'

const image = { uri: 'https://reactjs.org/logo-og.png' }

export default function Terms ({ navigation }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <SmallLayout text='תנאי שימוש' hide={true}>
        <ScrollView style={s.termsBlock} contentContainerStyle={s.container}>
          <View style={s.container2}>
          <ImageBackground
            source={require('../Images/Terms1.jpg')}
            style={s.imageBack}
          />
          </View>
          <View style={s.container2}>
          <ImageBackground
            source={require('../Images/Terms2.jpg')}
            style={s.imageBack}
          />
          </View>
          <View style={s.container2}>
          <ImageBackground
            source={require('../Images/Terms3.jpg')}
            style={s.imageBack}
          />
          </View>
          <View style={s.container2}>
          <ImageBackground
            source={require('../Images/Terms4.jpg')}
            style={s.imageBack}
          />
          </View>
          <View style={s.container2}>
          <ImageBackground
            source={require('../Images/Terms5.jpg')}
            style={s.imageBack}
          />
          </View>
          <View style={s.container2}>
          <ImageBackground
            source={require('../Images/Terms6.jpg')}
            style={s.imageBack}
          />
          </View>
          <View style={s.container2}>
          <ImageBackground
            source={require('../Images/Terms7.jpg')}
            style={s.imageBack}
          />
          </View>
          
          
          
        </ScrollView>
      </SmallLayout>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({
  imageBack: {
    height: '100%',
    width: '100%',    
    resizeMode: 'cover'
  },

  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: "840%",
    width: '100%',
  },

  container2: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: "14.28%",
    width: '100%',
    marginBottom: 10
  },

  termsBlock: {
     backgroundColor: '#EEEEEE',
    width: '100%',    
    borderRadius: 20,
    paddingHorizontal: 5
   
  }
})
