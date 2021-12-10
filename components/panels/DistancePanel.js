import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import WalkBlue from '../../Images/Cartoons/WalkBlue.png'
import WalkYellow from '../../Images/Cartoons/WalkYellow.png'
import BikeBlue from '../../Images/Cartoons/BikeBlue.png'
import BikeYellow from '../../Images/Cartoons/BikeYellow.png'
import CarBlue from '../../Images/Cartoons/CarBlue.png'
import CarYellow from '../../Images/Cartoons/CarYellow.png'
import OnlineBlue from '../../Images/Cartoons/OnlineBlue.png'
import OnlineYellow from '../../Images/Cartoons/OnlineYellow.png'

const DistancePanel = ({ distance, setDistance }) => {

    const color1 = "#3993D6"
    const color2 = "white"
    const color3 = "white"
    const color4 = "black"
    const fontSize = 16

    return (
        <View style={s.outer}>
            <TouchableOpacity style={[s.first, s.distanceContainer, { backgroundColor: distance === 25001 ? color2 : color2 }]}
                onPress={() => setDistance(25001)}>
                {(distance === 25001) ?
                    <View style={s.cartCont}>
                        <ImageBackground source={WalkYellow} resizeMode="cover" style={{ flex: 1 }}></ImageBackground>
                    </View> :
                    <View style={s.cartCont}>
                        <ImageBackground source={WalkBlue} resizeMode="cover" style={{ flex: 1 }}></ImageBackground>
                    </View>}
            </TouchableOpacity>
            {/*((distance !== 25001) && (distance !== 25007)) ? <View style={s.palka} /> : <View style={s.palkaEmpty} />*/}
            <TouchableOpacity style={[s.distanceContainer, { backgroundColor: distance === 25007 ? color2 : color2 }]}
                onPress={() => setDistance(25007)}>
                {(distance === 25007) ?
                    <View style={s.cartCont}>
                        <ImageBackground source={BikeYellow} resizeMode="cover" style={{ flex: 1 }}></ImageBackground>
                    </View> :
                    <View style={s.cartCont}>
                        <ImageBackground source={BikeBlue} resizeMode="cover" style={{ flex: 1 }}></ImageBackground>
                    </View>}
            </TouchableOpacity>
            {/*((distance !== 25007) && (distance !== 25025)) ? <View style={s.palka} /> : <View style={s.palkaEmpty} />*/}
            <TouchableOpacity style={[s.distanceContainer, { backgroundColor: distance === 25025 ? color2 : color2 }]}
                onPress={() => setDistance(25025)}>
                {(distance === 25025) ?
                    <View style={s.cartCont}>
                        <ImageBackground source={CarYellow} resizeMode="cover" style={{ flex: 1 }}></ImageBackground>
                    </View> :
                    <View style={s.cartCont}>
                        <ImageBackground source={CarBlue} resizeMode="cover" style={{ flex: 1 }}></ImageBackground>
                    </View>}
            </TouchableOpacity>
            {/*((distance !== 25025) && (distance !== 25000)) ? <View style={s.palka} /> : <View style={s.palkaEmpty} />*/}
            <TouchableOpacity style={[s.last, s.distanceContainer, { backgroundColor: distance === 25000 ? color2 : color2 }]}
                onPress={() => setDistance(25000)}>
                {(distance === 25000) ?
                    <View style={s.cartCont}>
                        <ImageBackground source={OnlineYellow} resizeMode="cover" style={{ flex: 1 }}></ImageBackground>
                    </View> :
                    <View style={s.cartCont}>
                        <ImageBackground source={OnlineBlue} resizeMode="cover" style={{ flex: 1 }}></ImageBackground>
                    </View>}
            </TouchableOpacity>
        </View>
    )

    /* return (
         <View style={s.outer}>
             <TouchableOpacity style={[s.first, s.distanceContainer, { backgroundColor: distance === 25001 ? color1 : color2 }]}
                 onPress={() => setDistance(25001)}>
                 <Text style={{ fontWeight: distance === 25001 ? "bold" : "normal", color: distance === 25001 ? color3 : color4, fontSize }}>1 ק"מ</Text>
             </TouchableOpacity>
             {((distance !== 25001) && (distance !== 25007))? <View style={s.palka} /> : <View style={s.palkaEmpty} />}
             <TouchableOpacity style={[s.distanceContainer, { backgroundColor: distance === 25007 ? color1 : color2 }]}
                 onPress={() => setDistance(25007)}>
                 <Text style={{ fontWeight: distance === 25007 ? "bold" : "normal", color: distance === 25007 ? color3 : color4, fontSize }}>7 ק"מ</Text>
             </TouchableOpacity>
             {((distance !== 25007) && (distance !== 25025)) ? <View style={s.palka} /> : <View style={s.palkaEmpty} />}
             <TouchableOpacity style={[s.distanceContainer, { backgroundColor: distance === 25025 ? color1 : color2 }]}
                 onPress={() => setDistance(25025)}>
                 <Text style={{ fontWeight: distance === 25025 ? "bold" : "normal", color: distance === 25025 ? color3 : color4, fontSize }}>אזור העיר</Text>
             </TouchableOpacity>
             {((distance !== 25025) && (distance !== 25000)) ? <View style={s.palka} /> : <View style={s.palkaEmpty} />}
             <TouchableOpacity style={[s.last, s.distanceContainer, { backgroundColor: distance === 25000 ? color1 : color2 }]}
                 onPress={() => setDistance(25000)}>
                 <Text style={{ fontWeight: distance === 25000 ? "bold" : "normal", color: distance === 25000 ? color3 : color4, fontSize }}>Online</Text>
             </TouchableOpacity>
         </View>
     )*/
}

export default DistancePanel

const s = StyleSheet.create({

    cartCont: {
        width: 62.5,
        height: 56,
        //  backgroundColor: "red"
    },

    palka: {
        width: 2,
        height: '60%',
        backgroundColor: '#BCE0FD'
    },

    palkaEmpty: {
        width: 2,
        height: '60%',
        // backgroundColor: '#BCE0FD'
    },


    first: {
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },
    last: {
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    },

    outer: {
        width: '90%',
        height: 60,
        borderRadius: 15,
        backgroundColor: "ivory",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        overflow: 'hidden',
        borderWidth: 0,
        borderColor: "#243663"
    },

    distanceContainer: {
        width: "24.5%",
        height: "100%",
        backgroundColor: "pink",
        alignItems: "center",
        justifyContent: "center",
        //  borderWidth: 1,
        //  borderColor: "#243663"
    }
});