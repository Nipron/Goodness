import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = ({ map, setCamera, setLatitude, setLongitude, setLatitudeMarker, setLongitudeMarker, setCoordinate }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='מיקום החיפוש'
            fetchDetails={true}
            minLength={3}
            multiLine
            numberOfLines={5}
            onPress={async (data, details = null) => {
                
                const cam = await map.current.getCamera()
    //  map.current.setCamera({...cam, zoom: cam.zoom - 0.5})
    console.log(cam.current)

    setCamera({...cam, altitude: 0, center: {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng
    }})


                setLatitude(details.geometry.location.lat)
                setLongitude(details.geometry.location.lng)
                setLatitudeMarker(details.geometry.location.lat)
                setLongitudeMarker(details.geometry.location.lng)
                setCoordinate({latitude: details.geometry.location.lat, longitude: details.geometry.location.lng})
                console.log(details.geometry.location)
            }}
            styles={{
              textInput: {
                height: 50,
                borderRadius: 1000,
                paddingRight: 48,
                color: '#5d5d5d',
                fontSize: 13,
                textAlign: 'right'
              },
              }}
            query={{
                key: 'AIzaSyCaZe06IKSzVqycHnVeB4I1c0MgUIB0xTg',
                language: 'he',
            }}
        />
    );
};

export default GooglePlacesInput;