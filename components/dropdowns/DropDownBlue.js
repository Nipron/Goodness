import React, { useState, useEffect } from 'react';
import { Animated, Easing, StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux'

import { g } from '../../styles/global'

import Date from '../../Images/Date.svg'
import Arrow from '../../Images/Arrow.svg'
import OrdersToMeCard from '../cards/OrdersToMeCard';
import JobsFromMeCard from '../cards/JobsFromMeCard';
import HistoryCard from '../cards/HistoryCard';

const DropDownBlue = ({ name, list, toMe, type }) => {

  const scaleDate = 1.8
  const scaleArrow = 1.4

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (list.length === 0) setOpen(false)
    return () => {
      
    }
  }, [list])

  const handlePress = () => {
    setOpen(!open)
  }

  return (
    <View style={s.outer}>
      <TouchableOpacity style={s.header} onPress={handlePress}>
        <View style={s.arrow}>
          <Arrow style={{ transform: [{ scaleX: scaleArrow }, { scaleY: scaleArrow }, { rotate: open ? "270deg" : "180deg" }] }} />
        </View>
        <View style={s.name}>
          <Text style={[g.text17_400_grey, s.text]}>{name}</Text>
          <Date style={{ transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }] }} />
        </View>
      </TouchableOpacity>
      {open &&
        <View style={s.cards}>
          {
            !!list && (type === 1) && list.map(item => <OrdersToMeCard item={item} key={item.id} toMe={toMe} />)
          }
          {
            !!list && (type === 2) && list.map(item => <JobsFromMeCard item={item} key={item.id} toMe={toMe} />)
          }
          {
            !!list && (type === 3) && list.map(item => <HistoryCard item={item} key={item.id} toMe={toMe} />)
          }
        </View>
      }
    </View>
  )
}

export default DropDownBlue

const s = StyleSheet.create({

  outer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: "100%",
    //   backgroundColor: "maroon",
    //  borderRadius: 20,
    backgroundColor: "#EFEFEF",
  },

  header: {
    width: "100%",
    height: 50,
    //  backgroundColor: "tan",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  arrow: {
    //   backgroundColor: "ivory",
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16
  },

  name: {
    //   backgroundColor: "pink",
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 16
  },

  text: {
    paddingRight: 8
  },

  cards: {
    width: "95%",
    //  backgroundColor: "pink",
    paddingHorizontal: 8
  }
})
