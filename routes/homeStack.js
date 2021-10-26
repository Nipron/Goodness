import React from 'react'

import Crash from '../screens/crash'
import Home from '../screens/home'
import Login from '../screens/login'
import Registration from '../screens/registration'
import Profile from '../screens/profile'
import Terms from '../screens/terms'
import About from '../screens/about'
import Messages from '../screens/messages'
import Create from '../screens/create'
import EditProfile from '../screens/editProfile'
import UserInfo from '../screens/userInfo'
import Services from '../screens/services'
import Test from '../screens/test'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

export default function Navigate () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false/*, animationEnabled: false */}}>
     {/* <Stack.Screen
          name='Test'
          component={Test}
          option={{ title: 'Test' }}
     />*/}
        <Stack.Screen
          name='Crash'
          component={Crash}
          option={{ title: 'Crash' }}
        />        
        <Stack.Screen
          name='Home'
          component={Home}
          option={{ title: 'Главная' }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          option={{ title: 'LOg in' }}
        />
        <Stack.Screen
          name='Registration'
          component={Registration}
          option={{ title: 'reg' }}
        />      
        
        <Stack.Screen
          name='About'
          component={About}
          option={{ title: 'About' }}
        />
        <Stack.Screen
          name='Messages'
          component={Messages}
          option={{ title: 'Messages' }}
        />        
        <Stack.Screen
          name='Create'
          component={Create}
          option={{ title: 'Create' }}
        />
        <Stack.Screen
          name='Services'
          component={Services}
          option={{ title: 'Services' }}
        />
        <Stack.Screen
          name='Profile'
          component={Profile}
          option={{ title: 'LOg in' }}
        />
        <Stack.Screen
          name='EditProfile'
          component={EditProfile}
          option={{ title: 'Edit Profile' }}
        />
        <Stack.Screen
          name='UserInfo'
          component={UserInfo}
          option={{ title: 'User Info' }}
        />
        <Stack.Screen
          name='Terms'
          component={Terms}
          option={{ title: 'Terms' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
