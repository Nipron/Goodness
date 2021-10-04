import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Dimensions
} from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import StatusBronze from '../../Images/StatusBronze2.png'
import StatusSilver from '../../Images/StatusSilver2.png'
import StatusGold from '../../Images/StatusGold2.png'
import StatusPlatinum from '../../Images/StatusPlatinum2.png'
import Phone from '../../Images/Phone.svg'
import Stars from '../../Images/Stars.svg'
import Edit from '../../Images/Edit.svg'
import Heart from '../../Images/Heart.svg'

import { g } from '../../styles/global'
import RatingForCardPanel from '../panels/RatingForCardPanel'
import StatusPanel from '../panels/StatusPanel'
import { feedbackAPI } from '../../src/api/api'

const PersonalInfo = () => {
  const navigation = useNavigation()
  const info = useSelector(state => state.all)
  const scale = 1.4
  const scaleHeart = 1.2 

  let rating = info.avgRating  

  const pressAlert = () =>
    Alert.alert('EDIT PROFILE', 'Redirect ot EditProfile', [
      { text: 'Ok' /*, onPress: () => console.log('alert wrong') */ }
    ])

  return (
    <View style={s.personalInfoBlock}>
      <View style={s.editAndHearts}>
        <TouchableOpacity
          style={s.edit}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Edit />
        </TouchableOpacity>
        <View style={s.hearts}>
          <Heart
            style={{
              transform: [{ scaleX: scaleHeart }, { scaleY: scaleHeart }]
            }}
          />
          <Text style={[s.balance, g.text28_700_blue]}>{info.balance}</Text>
        </View>
      </View>

      <View style={s.rating}>
        <RatingForCardPanel rating={rating} scale={0.6} />
      </View>

      <View style={s.phone}>
        
        <Text selectable={true} style={[s.phoneNumber, g.text18_600_blue]}>{`+${info.phone}`}</Text>
        
        
        <Phone style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }} />
      </View>

      <StatusPanel status={info.heartsStatus} />
    </View>
  )
}

export default PersonalInfo

const s = StyleSheet.create({
  text: {
    width: '25%',
    height: '100%',
    //backgroundColor: 'pink',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 40
  },

  names: {
    width: '100%',
    height: '80%',
    backgroundColor: '#4E5F2B55',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },

  personalInfoBlock: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 216,
    //  backgroundColor: "pink",
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 7,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },

  editAndHearts: {
    width: '90%',
    height: 50,
    // backgroundColor: "lightblue",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  edit: {
    width: 50,
    height: 50,
    //  backgroundColor: "azure",
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  hearts: {
    width: 90,
    height: 50,
    //   backgroundColor: "aquamarine",
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },

  balance: {
    marginLeft: 8
  },

  rating: {
    width: '90%',
    marginTop: 14,
    //   backgroundColor: "maroon",
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 5
  },

  phone: {
    width: '90%',
    height: 50,
   //    backgroundColor: "lightgreen",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  phoneNumber: {
    marginRight: 10,
  //  backgroundColor: "red"
  },

  status: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    backgroundColor: 'yellow',
    transform: [{ scaleX: 1 }, { scaleY: 1 }]
  },

  avatar: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center'
    // backgroundColor: 'red'
  }
})
