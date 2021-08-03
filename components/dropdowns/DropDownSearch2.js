import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, Pressable, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { g } from '../../styles/global'

const DropDownSearch2 = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <DropDownPicker
            onChangeValue={props.onChangeValue}
            style={[s.picker, { zIndex: props.index }]}
            // containerStyle={s.container}
            textStyle={[g.text20_400_blue, s.text]}
            open={/*props.*/open}
            value={props.value}
            items={props.items}
            setOpen={/*props.*/setOpen}
            setValue={props.setValue}
            setItems={props.setItems}
        />
    );
}

export default DropDownSearch2


const s = StyleSheet.create({

    picker: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: 60,
        borderRadius: 15
    },

    text: {
        textAlign: "right"
    }

})