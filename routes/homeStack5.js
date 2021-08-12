import React from 'react';

import Home from '../screens/home';
import Login from '../screens/login';
import Registration from '../screens/registration';
import Profile from '../screens/profile';
import Terms from '../screens/terms';
import Messages from '../screens/messages';
import Create from '../screens/create';
import EditProfile from '../screens/editProfile';
import UserInfo from '../screens/userInfo';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Home"
                component={Home}
                option={{ title: 'Главная' }} />
            <Stack.Screen
                name="Login"
                component={Login}
                option={{ title: 'LOg in' }} />
            <Stack.Screen
                name="Registration"
                component={Registration}
                option={{ title: 'reg' }} />
            <Stack.Screen
                name="Profile"
                component={Profile}
                option={{ title: 'LOg in' }} />
            <Stack.Screen
                name="Terms"
                component={Terms}
                option={{ title: 'Terms' }} />
            <Stack.Screen
                name="Messages"
                component={Messages}
                option={{ title: 'Messages' }} />
            <Stack.Screen
                name="Create"
                component={Create}
                option={{ title: 'Create' }} />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                option={{ title: 'Edit Profile' }} />
            <Stack.Screen
                name="UserInfo"
                component={UserInfo}
                option={{ title: 'User Info' }} />
        </Stack.Navigator>
    </NavigationContainer>
}