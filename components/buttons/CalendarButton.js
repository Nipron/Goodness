import React, { useState } from 'react'
import {
  Animated,
  Easing,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native'

import { g } from '../../styles/global'

import Date from '../../Images/Date.svg'
import Arrow from '../../Images/Arrow.svg'

import moment from 'moment'

const CalendarButton = ({ date, onPress }) => {
  const scaleDate = 1.8
  const scaleArrow = 1.4

  return (
    <TouchableOpacity style={s.header} onPress={onPress}>
      {/* <View style={s.arrow}>
                    <Arrow style={{ transform: [{ scaleX: scaleArrow }, { scaleY: scaleArrow }, { rotate: open ? "90deg" : "0deg" }] }} />
    </View>*/}
      <Date
        style={{
          transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }]
        }}
      />
      <Text style={[g.text18_400_blue, s.text]}>
        {!!date ? moment(date.dateString).format('L') : 'תבחר תאריך'}
      </Text>
    </TouchableOpacity>
  )
}

export default CalendarButton

const s = StyleSheet.create({
  header: {
    width: '49%',
    height: 60,
    borderRadius: 1000,
    paddingLeft: 20,
    //  backgroundColor: "tan",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  arrow: {
    //   backgroundColor: "ivory",
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16
  },

  text: {
    marginLeft: 10
  },

  cards: {
    width: '95%',
    //  backgroundColor: "pink",
    paddingHorizontal: 8
  }
})
