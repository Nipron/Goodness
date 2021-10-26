import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Camera from '../../Images/Camera.svg'
import { g } from '../../styles/global'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-picker';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

import ImageResizer from 'react-native-image-resizer';

import * as ImageManipulator from 'expo-image-manipulator';

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
             
        if (!result.cancelled) {    
            
            const manipResult = await ImageManipulator.manipulateAsync(
                result.uri,
                [{resize: {height: 200}}],
                { compress: 0.8, format: ImageManipulator.SaveFormat.PNG }
              );

          //    console.log(manipResult)


         /*   const resize = () => {
                return new Promise((resolve, reject) => {
                    ImageResizer.createResizedImage(result.uri, 240, 240, 'JPEG', 90, 0).then((response) => {
                        resolve(response);
                    }).catch((err) => {
                        reject(err);
                    });
                });
            }

            await resize().then((response) => {
                console.log("hh")
                newPic = response;
            }, error => {
                // Handle error
            });




            console.log("RESULT RESULT")

            const newImg = await ImageResizer.createResizedImage(result.uri, 200, 200, "JPEG", 80, 0)
                .then(response => {
                    console.log("ZZZZZZ")
                    console.log(response)
                    // response.uri is the URI of the new image that can now be displayed, uploaded...
                    // response.path is the path of the new image
                    // response.name is the name of the new image with the extension
                    // response.size is the size of the new image
                })
                .catch(err => {
                    console.log(err)
                    // Oops, something went wrong. Check that the filename is correct and
                    // inspect err to get more details.
                });
            console.log(newImg)*/
           // console.log(result)
            props.setImage(manipResult);
        }
    };


    //  console.log(props.image)
    //   console.log(data.avatar)

    return (
        <TouchableOpacity style={s.photoOuter} onPress={pickImage}>
            {!props.image && !data.avatar ?
                <View style={s.photoInner}>
                    <Camera />
                    <Text style={g.text17_400_white}>הוספת תמונה</Text>
                </View>
                :

                props.image ?
                    <View style={s.photoInner}>
                        <ImageBackground source={{ uri: props.image.uri }}
                            resizeMethod={'auto'} style={s.image} />
                    </View> :
                    data.avatar &&
                    <View style={s.photoInner}>
                        <ImageBackground source={{ uri: `http://52.48.233.122:3001/${data.avatar.path}` }}
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
        marginTop: -115,
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



