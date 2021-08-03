import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Camera from '../../Images/Camera.svg'
import { g } from '../../styles/global'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-picker';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';


const CameraAvatar = (props) => {

   // const [image, setImage] = useState(null);

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

        console.log(result);

        if (!result.cancelled) {
            props.setImage(result);
        }
    };

    return (
        <TouchableOpacity style={s.photoOuter} onPress={pickImage}>
            {!props.image &&
                <View style={s.photoInner}>
                    <Camera />
                    <Text style={g.text17_400_white}>הוספת תמונה</Text>
                </View>
            }
            {
                props.image &&
                <View style={s.photoInner}>
                    <ImageBackground source={{uri : props.image.uri}}
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
        marginTop: -113,
        width: 146,
        height: 146,
        borderRadius: 73,
        backgroundColor: "#FDC27A",
        alignItems: 'center',
        justifyContent: 'center'
    },
    photoInner: {
        width: 130,
        height: 130,
        borderRadius: 65,
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



