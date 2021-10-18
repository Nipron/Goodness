import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  Alert,
  SafeAreaView,
  Button,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import AppLoading from 'expo-app-loading'

import LogoGroup from '../src/LogoGroup'
import ButtonYellow from '../src/ButtonYellow'
import { commonAPI, userAPI } from '../src/api/api'
import HomeLayout from '../components/layouts/HomeLayout'

import { useNavigation, useFocusEffect } from '@react-navigation/native'
import SearchInput from '../components/inputs/SearchInput'
import { setCategoriesThunk } from '../redux/categoriesReducer'
import { setCategoriesFlatThunk } from '../redux/categoriesFlatReducer'
import { updateAll } from '../redux/store'
import { setMessagesThunk } from '../redux/messagesReducer'

export default function Home(props) {
  const dispatch = useDispatch()
  dispatch(updateAll(JSON.stringify({})))

  useFocusEffect(() => {
    dispatch(setCategoriesThunk())
    dispatch(setCategoriesFlatThunk())
    dispatch(updateAll(JSON.stringify({})))
  })

  const navigation = useNavigation()

  const pressHandler = () => {
    navigation.navigate('Create')
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
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <HomeLayout>
        <SafeAreaView style={s.goodnessBlock}>
          <View style={s.searchBlock}>
            <SearchInput />
          </View>

          <View style={s.logoBlock}>
            <LogoGroup />
          </View>

          <View style={s.descriptionBlock}>
            <Text style={s.text}>.</Text>
            <Text style={s.text}>פלטפורמה לשיתוף "מעשים טובים" בין האנשים</Text>
          </View>

          <View style={s.yellowButtonBlock}>
            <ButtonYellow
              name='כניסה'
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </SafeAreaView>
      </HomeLayout>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({
  goodnessBlock: {
    width: '100%',
    flex: 1,
    //  backgroundColor: "azure",
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  searchBlock: {
    marginTop: 5,
    height: "15%",
    paddingHorizontal: 15,
    // backgroundColor: "yellow",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  logoBlock: {
    height: "30%",
    //  backgroundColor: 'peru',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  descriptionBlock: {
    top: -4,
    height: "6%",
    width: '90%',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
   //   backgroundColor: 'red'
  },

  text: {
    color: 'white',
    fontSize: 18,
    lineHeight: 20
  },

  yellowButtonBlock: {
    width: '100%',
    height: '29.64%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //   backgroundColor: "green",
  }
})
