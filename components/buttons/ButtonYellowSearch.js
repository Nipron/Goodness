import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, Pressable } from 'react-native';
import { g } from '../../styles/global';
import { serviceAPI, userAPI } from '../../src/api/api';

import { useNavigation } from '@react-navigation/native'
import { updateAll } from '../../redux/store';

const ButtonYellowSearch = props => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const onPress = async () => {
        console.log("Ordered ID# ", props.chosenId)
        await serviceAPI.orderService(props.chosenId)
        await userAPI.dashboard()
            .then(data => {
                console.log("UPDATE OK")
                console.log(data)
                dispatch(updateAll(data))
                navigation.navigate('Profile')
            })
    }

    return (
        <Pressable style={[s.button, { marginBottom: props.bottom }]} onPress={onPress}>
            <Text style={[g.text24_700_blue, s.text]}>{props.name}</Text>
        </Pressable>
    );
}

const s = StyleSheet.create({
    button: {
        marginVertical: -26,
        height: 52,
        width: "70%",
        borderRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FECB07",
        borderColor: "#FFFFFF",
        borderWidth: 2,
        zIndex: 10,
    },

    text: {
        marginTop: -2,
    }
});

export default ButtonYellowSearch
