import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable, Alert, SafeAreaView, Button, ImageBackground, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AppLoading from 'expo-app-loading';

import LogoGroup from '../src/LogoGroup';
import ButtonYellow from '../src/ButtonYellow'
import { userAPI } from '../src/api/api';
import HomeLayout from '../components/layouts/HomeLayout';

import { useNavigation } from '@react-navigation/native'
import SearchInput from '../components/inputs/SearchInput';

export default function Home(props) {

  const navigation = useNavigation()

  const pressHandler = () => {
    navigation.navigate('Login')

    // Alert.alert('OOPS!', "Epta kukuha", [{text: "IN-NA", onPress: () => console.log('alet umer')}])
  }

  const goRegistration = () => {
    navigation.navigate('Registration')



    // Alert.alert('OOPS!', "Epta kukuha", [{text: "IN-NA", onPress: () => console.log('alet umer')}])
  }

  const goTerms = () => {
    navigation.navigate('Terms')
  }

  const poehali = () => {
    userAPI.getSMS(999999999999)
  }

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <HomeLayout >
        <SafeAreaView style={s.goodnessBlock}>

          <View style={s.searchBlock}>
            <SearchInput />
          </View>

          <View style={s.logoBlock}>
            <LogoGroup />
          </View>

          <View style={s.descriptionBlock}>
            <Text style={s.text}>שיתוף בין אנשים את מה שהם יכולים לתת</Text>
            <Text style={s.text}>בזמנם הפנוי ובתמורה לקבל מעשה טוב</Text>
            <Text style={s.text}>של אדם אחר.</Text>
          </View>
        </SafeAreaView>

        <View style={s.yellowButtonBlock}>
          <ButtonYellow name="כניסה" onPress={() => navigation.navigate('Login')} />
        </View>

      </HomeLayout>
    </TouchableWithoutFeedback>

  );
}

const s = StyleSheet.create({

  goodnessBlock: {
    width: "100%",
    // backgroundColor: "pink",
    alignItems: 'center',
    justifyContent: 'flex-start',

  },

  searchBlock: {
    marginTop: 0,
    height: 70,
    paddingHorizontal: 15,
    // backgroundColor: "yellow",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchInput: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 50,
    width: '90%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#3949ab'
  },

  logoBlock: {
    marginTop: 80
  },

  descriptionBlock: {
    height: 120,
    width: "90%",
    alignItems: 'center',
    justifyContent: 'center',
    //   backgroundColor: "pink"
  },

  text: {
    color: 'white',
    fontSize: 20
  },

  yellowButtonBlock: {
    width: "100%",
    height: "26%",
    // backgroundColor: "green",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

});