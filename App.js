import React, { useState } from 'react';
import DefaultMap from './src/components/defaultMap';
import Camera from './src/components/camera';
import Profile from './src/components/profile';
import { View } from 'react-native';
import GoogleAuth from './src/components/googleAuth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
    const username = 'JohnDoe';
    const first_name = 'John';
    const last_name = 'Doe';
    const full_name = 'John Doe';
    const email = 'johndoe@example.com';
    const profile_pic = '../src/assets/profile-pic.png';

    const Stack = createNativeStackNavigator();


    return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen
              name="GoogleAuth"
              component={GoogleAuth}
            />
            

            <Stack.Screen
              name="Profile"
              component={Profile}
            />

            <Stack.Screen
              name="DefaultMap"
              component={DefaultMap}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
      
}
