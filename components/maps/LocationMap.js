import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps'
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import ArrowBack from '../../Images/ArrowBack.svg'
import TargetGrey from '../../Images/TargetGrey.svg'
import PlusGrey from '../../Images/PlusGrey.svg'
import MinusGrey from '../../Images/MinusGrey.svg'
import PPlug from '../../Images/PPlug.svg'

import { g } from '../../styles/global'

import { useNavigation } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import SearchPlaceInput from '../inputs/SearchPlaceInput';
import Footer from '../footer/Footer';
import DistancePanel from '../panels/DistancePanel';
import ButtonYellowSelect from '../buttons/ButtonYellowSelect';


export default function LocationMap(props) {

    const scaleArrow = 1.2
    const scaleTarget = 1.1
    const scalePlusMinus = 1.1

    const [cats4, setCats4] = useState([
        { label: "Country", value: "country" },
        { label: "City", value: "city" },
        { label: "5km", value: 5 },
        { label: "1km", value: 1 },
    ])


    const [coordinate, setCoordinate] = useState({ ...props.coordinate })

    useEffect(() => {

    }, [])

    //DropDow open

    const [showMap, setShowMap] = useState(false)

    const data = useSelector(state => state.all)



    const handleSearch = values => {
        console.log(values)
    }



    const coordinatePress = async e => {
        let coords = await e.nativeEvent
        setCoordinate({ ...coords.coordinate })
        console.log("Coor OK")
        console.log({ ...coords.coordinate })
    }


    const map = useRef(null);

    const onZoomInPress = () => {
        map.current.getCamera().then((cam) => {
            cam.zoom += 1;
            map.current.animateCamera(cam);
        });
    };

    const onZoomOutPress = () => {
        map.current.getCamera().then((cam) => {
            cam.zoom -= 1;
            map.current.animateCamera(cam);
        });
    };

    const onGeoLocation = () => {
        console.log("PRESSED Geo Location")
    }

    const handleBackArrowPress = () => {
        props.setShowMap(false)
        props.setCoordinate({ ...coordinate })
    }

    return (

        <Modal
            transparent={true}
            animationType="slide"
            visible={props.showMap}>
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={s.outer}>

                    <View style={s.mapBlock}>
                        <MapView
                            ref={map}
                            onPress={coordinatePress}
                            style={s.mapview}
                            provider={PROVIDER_GOOGLE}
                            // customMapStyle={mapStyle}
                            initialRegion={{
                                latitude: 32,
                                longitude: 34.8,
                                latitudeDelta: 0.3,
                                longitudeDelta: 0.3,
                            }}
                            mapType="standard"
                        >
                            <Marker key={1} coordinate={coordinate} title={"המיקום שלי"} />
                            <Circle center={coordinate}
                                radius={props.distance * 1000}
                                fillColor={'#00Df3125'}
                                strokeWidth={0} />
                        </MapView>
                        <View style={s.buttonsBlock} pointerEvents='box-none'>
                            <View style={s.topButtons} pointerEvents='box-none'>
                                <TouchableOpacity style={s.backButton} onPress={handleBackArrowPress}>
                                    <ArrowBack style={{ transform: [{ scaleX: scaleArrow }, { scaleY: scaleArrow }] }} />
                                </TouchableOpacity>
                                {/*  <View style={s.searchPlaceBlock}>
                                    <SearchPlaceInput coordinate={coordinate}/>
                        </View>*/}
                            </View>
                            {/* <View style={s.google}>
                                <GooglePlacesInput />
                        </View>*/}
                            <View style={s.bottomButtons} pointerEvents='box-none'>
                                <TouchableOpacity style={s.geolocation} onPress={onGeoLocation}>
                                    <TargetGrey style={{ transform: [{ scaleX: scaleTarget }, { scaleY: scaleTarget }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={s.zoomIn} onPress={onZoomInPress}>
                                    <PlusGrey style={{ transform: [{ scaleX: scalePlusMinus }, { scaleY: scalePlusMinus }] }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={s.zoomOut} onPress={onZoomOutPress}>
                                    <MinusGrey style={{ transform: [{ scaleX: scalePlusMinus }, { scaleY: scalePlusMinus }] }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={s.description}>אנא בחר מרחק מרבי</Text>
                    <DistancePanel distance={props.distance} setDistance={props.setDistance} />
                    <ButtonYellowSelect name={"בחר"} onPress={handleBackArrowPress} />
                    <Footer />
                </View>
            </TouchableWithoutFeedback>
        </Modal >



    )
}

const s = StyleSheet.create({

    google: {
        width: "95%",
        height: 100,
        backgroundColor: "red"
    },

    outer: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between"
    },

    mapBlock: {
        width: "100%",
        height: "68%",
        backgroundColor: "pink",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
    },

    mapview: {
        width: "100%",
        height: "100%",
        backgroundColor: "olive",
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },

    buttonsBlock: {
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },

    topButtons: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        marginTop: 45
    },

    bottomButtons: {
        //   width: "100%",
        //   backgroundColor: "orange",
        alignItems: "center",
        justifyContent: "flex-end",
    },

    backButton: {
        width: 50,
        height: 50,
        backgroundColor: "navy",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },

    searchPlaceBlock: {
        width: "80%",
    },

    geolocation: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#243663',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom: 20,
    },

    zoomIn: {
        width: 35,
        height: 35,
        backgroundColor: '#243663',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom: 10,
    },

    zoomOut: {
        width: 35,
        height: 35,
        backgroundColor: '#243663',
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginBottom: 20,
    },

    description: {
        color: "#B4B4B4"
    },










    block1: {
        width: "100%",
        height: "20%",
        backgroundColor: "green"
    },



    close: {
        width: 100,
        height: 100,
        backgroundColor: "red"
    },

    showMapBlock: {
        width: "100%",
        height: 60,
        backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
    },

    showMapButton: {
        width: "100%",
        height: 50,
        borderRadius: 25,
        backgroundColor: 'navy',
        justifyContent: "center",
        alignItems: "center",
    },

    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    },

    zoomInContainer: {
        justifyContent: "center",
        alignItems: "center",
    },

    zoomOutContainer: {
        justifyContent: "center",
        alignItems: "center",
    },




    pinContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    point: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "purple"
    },

    mapcont: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: "pink",
        justifyContent: "center",
        alignItems: "center"
    },



})