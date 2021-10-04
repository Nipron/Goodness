import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = ({ setLatitude, setLongitude }) => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                // console.log(Object.keys(data))
                //  console.log(Object.keys(details))
                //  console.log(details.address_components);
                //  console.log(details.adr_address);
                //  console.log(details.formatted_address);

                setLatitude(details.geometry.location.lat)
                setLongitude(details.geometry.location.lng)
                console.log(details.geometry.location)
            }}
            query={{
                key: 'AIzaSyCaZe06IKSzVqycHnVeB4I1c0MgUIB0xTg',
                language: 'he',
            }}
        />
    );
};

export default GooglePlacesInput;