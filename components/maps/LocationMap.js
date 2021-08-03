import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

import ArrowBack from '../../Images/ArrowBack.svg'

import { g } from '../../styles/global'


import { useNavigation } from '@react-navigation/native'

import { useSelector, useDispatch } from 'react-redux'
import SearchPlaceInput from '../inputs/SearchPlaceInput';


export default function LocationMap(props) {

    const scaleArrow = 1.2

    const [cats4, setCats4] = useState([
        { label: "Country", value: "country" },
        { label: "City", value: "city" },
        { label: "5km", value: 5 },
        { label: "1km", value: 1 },
    ])


    const [coordinate, setCoordinate] = useState({...props.coordinate})

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
        console.log({...coords.coordinate})
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

    const handleBackArrowPress = () => {
        props.setShowMap(false)
        props.setCoordinate({...coordinate})
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
                            <Marker coordinate={coordinate}
                                title={'My Location'}
                                style={s.pinContainer}>
                                <Text style={g.text24_700_blue}>My Location</Text>
                                <View style={s.point} />
                            </Marker>
                        </MapView>
                        <View style={s.buttonsBlock} pointerEvents='box-none'>
                            <View style={s.topButtons}>
                                <TouchableOpacity style={s.backButton} onPress={handleBackArrowPress}>
                                    <ArrowBack style={{ transform: [{ scaleX: scaleArrow }, { scaleY: scaleArrow }] }} />
                                </TouchableOpacity>
                                <View style={s.searchPlaceBlock}>
                                    <SearchPlaceInput />
                                </View>
                            </View>
                            <View style={s.bottomButtons}>

                            </View>
                        </View>
                    </View>



                    <View style={s.block1}>
                        <View style={s.zoomInContainer}>
                            <TouchableOpacity style={s.zoomIn} onPress={onZoomInPress}>
                                <Text>+</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={s.zoomOutContainer}>
                            <TouchableOpacity style={s.zoomOut} onPress={onZoomOutPress}>
                                <Text>grgrrg</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </TouchableWithoutFeedback>
        </Modal >



    )
}

const s = StyleSheet.create({

    outer: {
        flex: 1
    },

    mapBlock: {
        width: "100%",
        height: "80%",
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
        alignItems: "center",
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
        width: "100%",
        height: 100,
        backgroundColor: "orange",
        
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

    zoomIn: {
        width: 30,
        height: 30,
        backgroundColor: 'olive',
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
    },

    zoomOut: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        marginTop: 40,
        position: 'relative'
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