import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native'

const DaysPanelSmall = ({ days, textFont }) => {
  const color1 = '#3993D6'
  const color2 = 'white'
  const color3 = 'white'
  const color4 = 'black'

  return (
    <View style={s.outer}>
      <View
        style={[s.dayContainer, { backgroundColor: days[6] ? color1 : color2, borderTopLeftRadius: 20, borderBottomLeftRadius: 20}]}
      >
        <Text
          style={{
            fontSize: textFont,
            fontWeight: days[6] ? 'bold' : 'normal',
            color: days[6] ? color3 : color4
          }}
        >
          ש
        </Text>
      </View>
      <View
        style={[s.dayContainer, { backgroundColor: days[5] ? color1 : color2 }]}
      >
        <Text
          style={{
            fontSize: textFont,
            fontWeight: days[5] ? 'bold' : 'normal',
            color: days[5] ? color3 : color4
          }}
        >
          ו
        </Text>
      </View>
      <View
        style={[s.dayContainer, { backgroundColor: days[4] ? color1 : color2 }]}
      >
        <Text
          style={{
            fontSize: textFont,
            fontWeight: days[4] ? 'bold' : 'normal',
            color: days[4] ? color3 : color4
          }}
        >
          ה
        </Text>
      </View>
      <View
        style={[s.dayContainer, { backgroundColor: days[3] ? color1 : color2 }]}
      >
        <Text
          style={{
            fontSize: textFont,
            fontWeight: days[3] ? 'bold' : 'normal',
            color: days[3] ? color3 : color4
          }}
        >
          ד
        </Text>
      </View>
      <View
        style={[s.dayContainer, { backgroundColor: days[2] ? color1 : color2 }]}
      >
        <Text
          style={{
            fontSize: textFont,
            fontWeight: days[2] ? 'bold' : 'normal',
            color: days[2] ? color3 : color4
          }}
        >
          ג
        </Text>
      </View>
      <View
        style={[s.dayContainer, { backgroundColor: days[1] ? color1 : color2 }]}
      >
        <Text
          style={{
            fontSize: textFont,
            fontWeight: days[1] ? 'bold' : 'normal',
            color: days[1] ? color3 : color4
          }}
        >
          ב
        </Text>
      </View>

      <View
        style={[s.dayContainer, { backgroundColor: days[0] ? color1 : color2, borderTopRightRadius: 20, borderBottomRightRadius: 20 }]}
      >
        <Text
          style={{
            fontSize: textFont,
            fontWeight: days[0] ? 'bold' : 'normal',
            color: days[0] ? color3 : color4
          }}
        >
          א
        </Text>
      </View>
    </View>
  )
}

export default DaysPanelSmall

const s = StyleSheet.create({
  outer: {
    width: '95%',
    height: '100%',
    overflow: 'hidden',
  //  backgroundColor: 'ivory',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',    
  },

  dayContainer: {
    width: '14%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: '#243663'
  }
})
