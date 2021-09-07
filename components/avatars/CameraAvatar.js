import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Camera from '../../Images/Camera.svg'
import { g } from '../../styles/global'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-picker';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';


const CameraAvatar = (props) => {
  
    const data = useSelector(state => state.all) 

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

       // console.log(result);

        if (!result.cancelled) {
            props.setImage(result);
        }
    };

    console.log(props.image)
    console.log(data.avatar)

    return (
        <TouchableOpacity style={s.photoOuter} onPress={pickImage}>
            { !props.image && !data.avatar ?
                <View style={s.photoInner}>
                    <Camera />
                    <Text style={g.text17_400_white}>הוספת תמונה</Text>
                </View>
                :
         
                props.image ?
                <View style={s.photoInner}>
                    <ImageBackground source={{uri : props.image.uri  }}
                        resizeMethod={'auto'} style={s.image} />
                </View> :
                data.avatar &&
                <View style={s.photoInner}>
                    <ImageBackground source={{uri : `http://52.48.233.122:3001/${data.avatar.path}` }}
                        resizeMethod={'auto'} style={s.image} />
                </View>
            }           
        </TouchableOpacity>
    )
}

export default CameraAvatar

const s = StyleSheet.create({
    photoOuter: {
        zIndex: 2,
        marginTop: -60,
        width: 120,
        height: 120,
        borderRadius: 65,
        backgroundColor: "#FDC27A",
        alignItems: 'center',
        justifyContent: 'center'
    },
    photoInner: {
        width: 108,
        height: 108,
        borderRadius: 57,
        backgroundColor: "#034794",
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: "100%"
    }
});



