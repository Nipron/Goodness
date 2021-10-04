import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import StarEmpty from '../../Images/StarEmpty.svg'
import StarFull from '../../Images/StarFull.svg'

const RatingForCardPanel = ({ rating, scale }) => {

    return (
        <View style={[s.outer, { transform: [{ scaleX: scale }, { scaleY: scale }] }]}>
            {(rating < 4.5) ? <StarEmpty /> : <StarFull />}
            {(rating < 3.5) ? <StarEmpty /> : <StarFull />}
            {(rating < 2.5) ? <StarEmpty /> : <StarFull />}
            {(rating < 1.5) ? <StarEmpty /> : <StarFull />}
            {(rating < 0.5) ? <StarEmpty /> : <StarFull />}
        </View>
    )
}

export default RatingForCardPanel

const s = StyleSheet.create({

    outer: {
        width: 200,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        overflow: 'hidden',
    }
});