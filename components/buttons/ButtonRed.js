import React from 'react'
import { StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native'
import { g } from '../../styles/global'
import Hands from '../../Images/Hands.svg'

const ButtonRed = props => {
  const scaleHandsGrey = 1

  return (
    <TouchableOpacity
      style={[s.button, { marginBottom: props.bottom }]}
      onPress={props.onPress}
    >
      <Text style={[g.text16_600_blue, s.text]}>{props.name}</Text>
      <Hands
        style={[
          {
            transform: [{ scaleX: scaleHandsGrey }, { scaleY: scaleHandsGrey }]
          },
          s.searchIcon
        ]}
      />
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  button: {
    marginVertical: 20,
    height: 52,
    width: '76%',
    borderRadius: 26,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FECB07',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    zIndex: 10,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: 0.3,
    // shadowColor: "blue",
    shadowRadius: 4
  },

  searchIcon: {
    marginHorizontal: 4
  },

  text: {
    marginTop: -2
  }
})

export default ButtonRed
