import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import StarEmpty from '../../Images/StarEmpty.svg'
import StarFull from '../../Images/StarFull.svg'

const RatingPanel = ({ rating, setRating }) => {

    const scaleStar = 1.6
    return (
        <View style={s.outer}>
            {(rating < 5) ?
                <TouchableOpacity onPress={() => setRating(5)}>
                    <StarEmpty style={{ transform: [{ scaleX: scaleStar }, { scaleY: scaleStar }] }} />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => setRating(4)}>
                    <StarFull style={{ transform: [{ scaleX: scaleStar }, { scaleY: scaleStar }] }} />
                </TouchableOpacity>}
            {(rating < 4) ?
                <TouchableOpacity onPress={() => setRating(4)}>
                    <StarEmpty style={{ transform: [{ scaleX: scaleStar }, { scaleY: scaleStar }] }} />
                </TouchableOpacity> :
                <TouchableOpacity onPress={(rating > 4) ? () => setRating(4) : () => setRating(3)}>
                    <StarFull style={{ transform: [{ scaleX: scaleStar }, { scaleY: scaleStar }] }} />
                </TouchableOpacity>}
            {(rating < 3) ?
                <TouchableOpacity onPress={() => setRating(3)}>
                    <StarEmpty style={{ transform: [{ scaleX: scaleStar }, { scaleY: scaleStar }] }} />
                </TouchableOpacity> :
                <TouchableOpacity onPress={(rating > 3) ? () => setRating(3) : () => setRating(2)}>
                    <StarFull style={{ transform: [{ scaleX: scaleStar }, { scaleY: scaleStar }] }} />
                </TouchableOpacity>}
            {(rating < 2) ?
                <TouchableOpacity onPress={() => setRating(2)}>
                    <StarEmpty style={{ transform: [{ scaleX: scaleStar }, { scaleY: scaleStar }] }} />
                </TouchableOpacity> :
                <TouchableOpacity onPress={(rating > 2) ? () => setRating(2) : () => setRating(1)}>
                    <StarFull style={{ transform: [{ scaleX: scaleStar }, { scaleY: scaleStar }] }} />
                </TouchableOpacity>}
            {(rating < 1) ?
                <TouchableOpacity onPress={() => setRating(1)}>
                    <StarEmpty style={{ transform: [{ scaleX: scaleStar }, { scaleY: scaleStar }] }} />
                </TouchableOpacity> :
                <TouchableOpacity onPress={(rating > 1) ? () => setRating(1) : () => setRating(0)}>
                    <StarFull style={{ transform: [{ scaleX: scaleStar }, { scaleY: scaleStar }] }} />
                </TouchableOpacity>}


        </View>
    )
}

export default RatingPanel

const s = StyleSheet.create({

    outer: {
        width: '90%',
        height: 60,
        borderRadius: 30,
      //  backgroundColor: "ivory",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        overflow: 'hidden',
        marginVertical: 10
    }
});