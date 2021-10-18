import React from 'react'
import {
  Share,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert
} from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import StatusBronze from '../../Images/StatusBronze.png'
import StatusSilver from '../../Images/StatusSilver.png'
import StatusGold from '../../Images/StatusGold.png'
import StatusPlatinum from '../../Images/StatusPlatinum.png'
import Phone from '../../Images/Phone.svg'
import Stars from '../../Images/Stars.svg'

import * as Linking from 'expo-linking'

import { g } from '../../styles/global'
import { commonAPI, feedbackAPI } from '../../src/api/api'

import RatingForCardPanel from '../panels/RatingForCardPanel'
import StatusPanel from '../panels/StatusPanel'

const SomebodysInfo = ({ id }) => {
  const user = useSelector(state => state.tempUser)

  let rating = 0
  let count = 0

  if (!!user.works) {
    for (let i = 0; i < user.works.length; i++) {
      if (!!user.works[i].feedback) {
        count++
        rating = (rating * (count - 1) + user.works[i].feedback.rating) / count
      }
    }
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Hello from Infinite Goodness'
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const scale = 1.4
  const scaleStars = 1.4
  const scaleEdit = 1.4
  const scaleT = 1.2

  return !!user.address ? (
    <View style={s.personalInfoBlock}>
      <View style={s.rating}>
        <RatingForCardPanel rating={rating} scale={0.6} />
      </View>
      <View style={s.phone}>
        <Text
          onPress={() => {
            Linking.openURL(`tel:${user.phone}`)
          }}
          style={[g.text18_600_blue, s.phoneNumber]}
          
        >
          {`+${user.phone}`}
        </Text>

        <Phone style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
      </View>
      <View style={s.addressBlock}>
        <Text style={g.text18_400_grey}>{` ${user.address.city} `}</Text>
        <Text style={g.text18_600_blue}> כתובת: </Text>
      </View>

      <View style={s.professionBlock}>
        <Text style={g.text18_400_grey}>{` ${user.job} `}</Text>
        <Text style={g.text18_600_blue}> תחום עיסוק: </Text>
      </View>

      <StatusPanel status={user.heartsStatus} />
    </View>
  ) : (
    <View />
  )
}

export default SomebodysInfo

const s = StyleSheet.create({

  personalInfoBlock: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 240,
    //  backgroundColor: "pink",
    borderRadius: 20,
    backgroundColor: '#FFFFFF'
  },

  rating: {
    width: '90%',
    marginTop: 72,
    //  backgroundColor: "maroon",
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  phone: {
   // width: '90%',
   // height: 36,
 //      backgroundColor: "dodgerblue",
  //     padding: 6,
  //     paddingHorizontal: 10,
   //    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
 /*   shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.2,
    // shadowColor: "blue",
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: "white"*/
  },

  phoneNumber: {
    marginRight: 10,
    // fontSize: 22,
    // color: 'red',
    // backgroundColor: 'white',
    fontWeight: 'bold',
    textDecorationLine: "underline"
    
  },

  professionBlock: {
    width: '100%',
    height: 24,
    //   backgroundColor: "olive",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  addressBlock: {
    width: '100%',
    height: 24,
    //   backgroundColor: "peru",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  status: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '100%',
    height: 50,
    marginTop: 20
    //  backgroundColor: "magenta",
  },

  avatar: {
    width: '100%',
    height: 45,
    resizeMode: 'contain'
  }
})
