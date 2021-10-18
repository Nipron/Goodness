import React, { useEffect, useState, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ImageBackground
} from 'react-native'
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps'
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import ArrowBack from '../../Images/ArrowBack.svg'
import TargetGrey from '../../Images/TargetGrey.svg'
import PlusGrey from '../../Images/PlusGrey.svg'
import MinusGrey from '../../Images/MinusGrey.svg'
import PPlug from '../../Images/PPlug.svg'
import MarkerDarkBlue from '../../Images/MarkerDarkBlue.svg'

import { g } from '../../styles/global'

import { useNavigation } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import SearchPlaceInput from '../inputs/SearchPlaceInput'
import Footer from '../footer/Footer'
import DistancePanel from '../panels/DistancePanel'
import ButtonYellowSelect from '../buttons/ButtonYellowSelect'
import GooglePlacesInput from './GooglePlacesInput'
import CheckV from '../../Images/CheckV.svg'
import CheckCircle from '../../Images/CheckCircle.svg'
import Search from '../../Images/Search.svg'

export default function LocationMap(props) {

  const scaleArrow = 1.2
  const scaleTarget = 1.1
  const scalePlusMinus = 1.1
  const scaleCheck = 2.0
  const scaleMarker = 1.2
  const scaleSearch = 0.8

  const [latitude, setLatitude] = useState(32.05)
  const [longitude, setLongitude] = useState(34.805)
  const [latitudeDelta, setLatitudeDelta] = useState(0.5)
  const [longitudeDelta, setLongitudeDelta] = useState(0.5)

  const [latitudeMarker, setLatitudeMarker] = useState(32.0853)
  const [longitudeMarker, setLongitudeMarker] = useState(34.7818)

  const [tempLatitude, setTempLatitude] = useState(32.05)
  const [tempLongitude, setTempLongitude] = useState(34.805)

  if (props.result.length > 0) {
    // console.log(props.result.length)
    //   console.log(props.result[0].coordinates.coordinates)
  }

  const data = useSelector(state => state.all)

  //console.log(props, " hhh ")

  const map = useRef(null)

  const [zoom, setZoom] = useState(1)

  const coordinatePress = async e => {
    Promise.all([map.current.getCamera(), e.nativeEvent])
      .then(values => {
       // console.log(zoom)
        const cam = values[0]
        const coords = values[1]
     //   console.log(cam.zoom)
     //   setLatitude(cam.center.latitude)
     //   setLongitude(cam.center.longitude)
        setLatitudeMarker(coords.coordinate.latitude)
        setLongitudeMarker(coords.coordinate.longitude)
        props.setCoordinate({ latitude: coords.coordinate.latitude, longitude: coords.coordinate.longitude })
      })
  }

  const [camera, setCamera] = useState({
    center: {
      latitude: 32.0853,
      longitude: 34.7818,
   //  latitude: props.coordinate.latitude,
   //  longitude: props.coordinate.longitude,
    },
    pitch: 0,
    heading: 0,
    altitude: 0,
    zoom: 12
  })


  const onZoomInPress = async () => {
    const cam = await map.current.getCamera()

    setCamera({...cam, altitude: 0, zoom: cam.zoom + 0.5})

    setLatitude(cam.center.latitude)
    setLongitude(cam.center.longitude)
    setLatitudeDelta(latitudeDelta / 1.5)
    setLongitudeDelta(longitudeDelta / 1.5)

    //map.current.setCamera({...cam, zoom: cam.zoom + 0.5})

    /*  map.current.getCamera().then(cam => {
        console.log(cam)
      })*/
    /*map.current.getCamera().then(cam => {
      setZoom(zoom + 1)
      setX(x / 2)
      cam.zoom += 1
      map.current.animateCamera(cam)
    })*/
  }

  

//console.log(camera.center)

  //const [cam, setCam] = useState({})

  const onZoomOutPress = async () => {
    const cam = await map.current.getCamera()
    //  map.current.setCamera({...cam, zoom: cam.zoom - 0.5})

    setCamera({...cam, altitude: 0, zoom: cam.zoom - 0.5})

    setLatitude(cam.center.latitude)
    setLongitude(cam.center.longitude)
    setLatitudeDelta(latitudeDelta * 1.5)
    setLongitudeDelta(longitudeDelta * 1.5)

    /*  map.current.getCamera().then(cam => {
        console.log(cam)
      })*/
    /* map.current.getCamera().then(cam => {
      setZoom(zoom - 1)
      setX(x * 2)
      cam.zoom -= 1
      map.current.animateCamera(cam)
    })*/
  }

  const onGeoLocation = () => {
    console.log('PRESSED Geo Location')
  }

  const handleBackArrowPress = () => {
    props.setShowMap(false)
    //   props.setCoordinate({  })
  }


  return (
    <Modal transparent={true} animationType='slide' visible={props.showMap}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <View style={s.outer}>
          <View style={s.inner1}>
            <View style={s.mapBlock}>
              <MapView
                ref={map}
                onPress={coordinatePress}
                style={s.mapview}
                provider={PROVIDER_GOOGLE}
                // customMapStyle={mapStyle}
               /* initialRegion={{
                  latitude: 32,
                  longitude: 35,
                  latitudeDelta: 1.11,
                  longitudeDelta: 0.74
                }}*/
                initialCamera={{
                  center: {
                    latitude: 32.0853,
                    longitude: 34.7818,
                 //   latitude: props.coordinate.latitude,
                 //   longitude: props.coordinate.longitude,
                //     latitude: latitudeMarker,
                 //   longitude: longitudeMarker,
                  },
                  pitch: 0,
                  heading: 0,
                  altitude: 0,
                  zoom: 12
                }}
                camera={camera}
                /* region={{
                   latitude: latitude,
                   longitude: longitude,
                   latitudeDelta: latitudeDelta,
                   longitudeDelta: longitudeDelta
                 }}*/
                mapType='standard'
              /*  onRegionChangeComplete={async region => {
                  const cam = await map.current.getCamera()
                  //setCam(cam)
                  console.log("ZZZ      ZZZZ       ZZZ")
                  console.log(cam.zoom)
                  // setZoom(cam.zoom)
                //console.log(region.latitude)
                //  console.log(cam.center.latitude)
                  //   console.log((region.latitude - cam.center.latitude)*100000 - 1414)
               //   console.log(region.longitude)
               //   console.log(cam.center.longitude)
                  console.log("ZZZ      ZZZZ       ZZZ")
                }}*/
              >
                <Marker key={1} coordinate={{
                  latitude: latitudeMarker,
                  longitude: longitudeMarker
                }} title={'המיקום שלי'} />
                {props.createMode && <Circle
                  center={{
                    latitude: latitudeMarker,
                    longitude: longitudeMarker
                  }}
                  radius={(props.distance > 24999) ? (props.distance - 25000) * 1000 : 0}
                  fillColor={'#00Df3125'}
                  strokeWidth={0}
                />}
                {/*(props.result.length > 0) &&
                  props.result.map(item => <Marker key={item.id}
                    coordinate={{ latitude: item.coordinates.coordinates[0], longitude: item.coordinates.coordinates[1] }}
                    title={item.name}
                  >
                    <View style={s.avaBlock}>
                      <ImageBackground source={{ uri: `http://52.48.233.122:3001/${item.author.avatar.path}` }}
                        resizeMethod={'auto'} style={s.mark} />
                    </View>

                  </Marker>)
                  */}

              </MapView>
              <View style={s.buttonsBlock} pointerEvents='box-none'>
                <View style={s.topButtons} pointerEvents='box-none'>
                  <TouchableOpacity
                    style={s.backButton}
                    onPress={handleBackArrowPress}
                  >
                    <ArrowBack
                      style={{
                        transform: [
                          { scaleX: scaleArrow },
                          { scaleY: scaleArrow }
                        ]
                      }}
                    />
                  </TouchableOpacity>
                  <View style={s.google} pointerEvents='box-none'>
                    <GooglePlacesInput map={map} setCamera={setCamera} setCoordinate={props.setCoordinate} setLatitude={setLatitude} setLongitude={setLongitude} setLatitudeMarker={setLatitudeMarker} setLongitudeMarker={setLongitudeMarker} />
                    <View style={s.placesIcons} pointerEvents='none'>
                      <MarkerDarkBlue style={[{ transform: [{ scaleX: scaleMarker }, { scaleY: scaleMarker }] }, { marginLeft: 12 }]} />
                      <View style={s.searchIcon}>
                        <Search style={[{ transform: [{ scaleX: scaleSearch }, { scaleY: scaleSearch }] }, { marginLeft: 0 }]} />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={s.bottomButtons} pointerEvents='box-none'>
                  {/*<TouchableOpacity
                    style={s.geolocation}
                    onPress={onGeoLocation}
                  >
                    <TargetGrey
                      style={{
                        transform: [
                          { scaleX: scaleTarget },
                          { scaleY: scaleTarget }
                        ]
                      }}
                    />
                  </TouchableOpacity>*/}
                  <TouchableOpacity style={s.zoomIn} onPress={onZoomInPress}>
                    <PlusGrey
                      style={{
                        transform: [
                          { scaleX: scalePlusMinus },
                          { scaleY: scalePlusMinus }
                        ]
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={s.zoomOut} onPress={onZoomOutPress}>
                    <MinusGrey
                      style={{
                        transform: [
                          { scaleX: scalePlusMinus },
                          { scaleY: scalePlusMinus }
                        ]
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {props.createMode && <View style={s.panelBlock}>
              <Text style={s.description}>אנא בחר מרחק מרבי</Text>
              <DistancePanel
                distance={props.distance}
                setDistance={props.setDistance}
              />
            </View>}
          </View>
          <View style={s.inner2}>
            {
              props.createMode &&
              <TouchableOpacity style={s.atPlaceOuter} onPress={() => props.setDistance(24999)}>
                <View style={s.checkBlock} >
                  <CheckCircle style={{ transform: [{ scaleX: scaleCheck }, { scaleY: scaleCheck }] }} />
                  {(props.distance === 24999) && <CheckV style={[s.v, { transform: [{ scaleX: scaleCheck }, { scaleY: scaleCheck }] }]} />}
                </View>
                <View style={s.checkText}>
                  <Text style={[g.text16_600_blue, s.terms]}>השירות בכתובת מצוינת בלבד</Text>
                </View>

              </TouchableOpacity>
            }
            <ButtonYellowSelect name={'בחר'} onPress={handleBackArrowPress} />
          </View>
          <Footer />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const s = StyleSheet.create({

  searchIcon: {
    width: 32,
    height: 32,
    marginRight: 9,
    borderRadius: 1000,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.2,
    // shadowColor: "blue",
    shadowRadius: 3
  },

  placesIcons: {
    position: "absolute",
    // backgroundColor: "yellow",
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  checkText: {
    width: "60%",
    //  backgroundColor: "green"
  },

  v: {
    position: "absolute"
  },

  checkBlock: {
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center"
  },

  atPlaceOuter: {
    width: "44%",
    height: "100%",
    //  backgroundColor: "pink",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  avaBlock:
  {
    width: 40,
    height: 40,
    borderRadius: 1000,
    overflow: "hidden"
  },

  mark: {
    width: "100%",
    height: "100%",
  },

  google: {
    width: '80%',
    height: 350,
    //  backgroundColor: "pink"
  },

  outer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  inner1: {
    width: '100%',
    height: '83%',
    //   backgroundColor: 'green'
  },
  inner2: {
    width: '100%',
    height: '8%',
    //    backgroundColor: 'yellow',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'
  },

  mapBlock: {
    flex: 1,
    //   backgroundColor: 'pink',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },

  panelBlock: {
    alignItems: 'center',
    marginBottom: 5
  },

  mapview: {
    width: '100%',
    height: '100%',
    backgroundColor: 'olive',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  buttonsBlock: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },

  topButtons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 15,
    marginTop: 45
  },

  bottomButtons: {
    //   width: "100%",
    //   backgroundColor: "orange",
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  backButton: {
    width: 50,
    height: 50,
    backgroundColor: 'navy',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },

  searchPlaceBlock: {
    width: '80%'
  },

  geolocation: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#243663',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20
  },

  zoomIn: {
    width: 35,
    height: 35,
    backgroundColor: '#243663',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10
  },

  zoomOut: {
    width: 35,
    height: 35,
    backgroundColor: '#243663',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20
  },

  description: {
    color: '#B4B4B4'
  },

  block1: {
    width: '100%',
    height: '20%',
    backgroundColor: 'green'
  },

  close: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },

  showMapBlock: {
    width: '100%',
    height: 60,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },

  showMapButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: 'navy',
    justifyContent: 'center',
    alignItems: 'center'
  },

  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10
  },

  zoomInContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  zoomOutContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  pinContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  point: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'purple'
  },

  mapcont: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
