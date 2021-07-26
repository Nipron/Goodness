import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';


const BackgroundSVG = () =>
    <Svg height="100%" width="100%" viewBox="0 0 320 1280" style={s.svgStyle}>
        <Circle
            cx="360"
            cy="50"
            r="200"
            fill="#045CB3"
        />
        <Circle
            cx="-100"
            cy="650"
            r="230"
            fill="#045CB3"
        />
        {/*<Rect x={-140} y={1000} rx={100} width={200} height={200} fill={"#ff0000"} />*/}
        <Circle
            cx="430"
            cy="1140"
            r="100"
            fill="#045CB3"
        />
    </Svg>


const s = StyleSheet.create({
    svgStyle: {        
        position: 'absolute',
    }
});

export default BackgroundSVG
