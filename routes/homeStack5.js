import React from 'react';

import Home from '../screens/home';
import Login from '../screens/login';
import Registration from '../screens/registration';
import Profile from '../screens/profile';
import Terms from '../screens/terms';
import Messages from '../screens/messages';

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
                option={{ title: 'Terms' }} />
        </Stack.Navigator>
    </NavigationContainer>
}