import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native'
import g from '../../styles/global'

const StatusPanel = ({ status }) => {

  console.log(status)

  return (
    <View style={s.status2}>
      <View style={s.roll1}>
        <ImageBackground
          source={require('../../Images/MedalPlatinum.png')}
          style={s.imageBack}
        />
        <Text style={g.text12_600_blue}>פְּלָטִינָה</Text>
        {status !== 'platinum' && <View style={s.plug}/>}
      </View>
      <View style={s.roll2}>
        <ImageBackground
          source={require('../../Images/MedalGold.png')}
          style={s.imageBack}
        />
        <Text style={g.text12_600_blue}>זהב</Text>
        {(status === 'bronze' || status === 'silver') && <View style={s.plug}/>}
      </View>
      <View style={s.roll3}>
        <ImageBackground
          source={require('../../Images/MedalSilver.png')}
          style={s.imageBack}
        />
        <Text style={g.text12_600_blue}>כסף</Text>
        {status === 'bronze' && <View style={s.plug}/>}
      </View>
      <View style={s.roll4}>
        <ImageBackground
          source={require('../../Images/MedalBronze.png')}
          style={s.imageBack}
        />
        <Text style={g.text12_600_blue}>בְּרוֹנזָה</Text>
       {/*status !== 'bronze' && <View style={s.plug}/>*/}
      </View>
    </View>
  )
}

export default StatusPanel

const s = StyleSheet.create({
  plug: {
    width: '110%',
    height: '100%',
    backgroundColor: '#FFFFFFBB',
    position: 'absolute',
    borderTopLeftRadius: 1000,
    borderBottomLeftRadius: 1000
  },

  imageBack: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    width: 28,
    height: 28,
    borderRadius: 1000,
    marginRight: 4
  },
  roll1: {
    height: '100%',
    width: '29%',
    right: Dimensions.get('window').width * 0.88 * -0.18,
    backgroundColor: '#C7CDD3',
    borderTopLeftRadius: 1000,
    borderBottomLeftRadius: 1000,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 4,
    borderWidth: 3,
    borderColor: 'white',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden'
  },

  roll2: {
    height: '100%',
    width: '29%',
    right: Dimensions.get('window').width * 0.88 * -0.12,
    backgroundColor: '#F4C311',
    borderTopLeftRadius: 1000,
    borderBottomLeftRadius: 1000,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 4,
    borderWidth: 3,
    borderColor: 'white',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden'
  },

  roll3: {
    height: '100%',
    width: '29%',
    right: Dimensions.get('window').width * 0.88 * -0.06,
    backgroundColor: '#97C0DB',
    borderTopLeftRadius: 1000,
    borderBottomLeftRadius: 1000,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 4,
    borderWidth: 3,
    borderColor: 'white',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden'
  },

  roll4: {
    height: '100%',
    width: '27%',
    backgroundColor: '#D28B34',
    borderTopLeftRadius: 1000,
    borderBottomLeftRadius: 1000,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 3,
    borderWidth: 3,
    borderRightWidth: 0,
    borderColor: 'white',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden'
  },

  status2: {
    width: '100%',
    marginVertical: 5,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6
  }
})
