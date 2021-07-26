import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux'

import { g } from '../../styles/global'
import TestCard from '../cards/TestCard';

import Date from '../../Images/Date.svg'
import Arrow from '../../Images/Arrow.svg'

const DropDownBlue = ({name}) => {

    const scaleDate = 1.8
    const scaleArrow = 1.4

    const [open, setOpen] = useState(false)

    const handlePress = () => {
        setOpen(!open)
        //  animate(Easing.ease)
    }

    return (
        <View style={s.outer}>
            <TouchableOpacity style={s.header} onPress={handlePress}>
                <View style={s.arrow}>
                <Arrow style={{ transform: [{ scaleX: scaleArrow }, { scaleY: scaleArrow }, {rotate: open ? "90deg" : "0deg"}] }} />
                </View>
                <View style={s.name}>
                    <Text style={[g.text17_400_grey, s.text]}>{name}</Text>
                    <Date style={{ transform: [{ scaleX: scaleDate }, { scaleY: scaleDate }] }} />
                </View>
            </TouchableOpacity>

            {open &&
                <View style={s.cards}>
                    <TestCard />
                    <TestCard />
                    <TestCard />
                </View>
            }
        </View>
    )
}

export default DropDownBlue

const s = StyleSheet.create({

    outer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: "100%",
     //   backgroundColor: "maroon",
      //  borderRadius: 20,
           backgroundColor: "#EEEEEE",
    },

    header: {
        width: "100%",
        height: 60,
      //  backgroundColor: "tan",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    arrow: {        
     //   backgroundColor: "ivory",
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16
    },

    name: {       
     //   backgroundColor: "pink",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 16
    },

    text: {
        paddingRight: 8
    },

    cards: {
        width: "95%",
      //  backgroundColor: "pink",
        paddingHorizontal: 8
    }



})

/*

import React from "react";
import { Animated, Easing, SectionList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const App = () => {
  let opacity = new Animated.Value(0);

  const animate = easing => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      easing
    }).start();
  };

  const size = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80]
  });

  const animatedStyles = [
    styles.box,
    {
      opacity,
      width: size,
      height: size
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>
        Press rows below to preview the Easing!
      </Text>
      <View style={styles.boxContainer}>
        <Animated.View style={animatedStyles} />
      </View>
      <SectionList
        style={styles.list}
        sections={SECTIONS}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => animate(item.easing)}
            style={styles.listRow}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
      />
    </View>
  );
};

const SECTIONS = [
  {
    title: "Predefined animations",
    data: [
      { title: "Bounce", easing: Easing.bounce },
      { title: "Ease", easing: Easing.ease },
      { title: "Elastic", easing: Easing.elastic(4) }
    ]
  },
  {
    title: "Standard functions",
    data: [
      { title: "Linear", easing: Easing.linear },
      { title: "Quad", easing: Easing.quad },
      { title: "Cubic", easing: Easing.cubic }
    ]
  },
  {
    title: "Additional functions",
    data: [
      {
        title: "Bezier",
        easing: Easing.bezier(0, 2, 1, -1)
      },
      { title: "Circle", easing: Easing.circle },
      { title: "Sin", easing: Easing.sin },
      { title: "Exp", easing: Easing.exp }
    ]
  },
  {
    title: "Combinations",
    data: [
      {
        title: "In + Bounce",
        easing: Easing.in(Easing.bounce)
      },
      {
        title: "Out + Exp",
        easing: Easing.out(Easing.exp)
      },
      {
        title: "InOut + Elastic",
        easing: Easing.inOut(Easing.elastic(1))
      }
    ]
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#20232a"
  },
  title: {
    marginTop: 10,
    textAlign: "center",
    color: "#61dafb"
  },
  boxContainer: {
    height: 160,
    alignItems: "center"
  },
  box: {
    marginTop: 32,
    borderRadius: 4,
    backgroundColor: "#61dafb"
  },
  list: {
    backgroundColor: "#fff"
  },
  listHeader: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f4f4f4",
    color: "#999",
    fontSize: 12,
    textTransform: "uppercase"
  },
  listRow: {
    padding: 8
  }
});

export default App;*/