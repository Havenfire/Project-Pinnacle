import React, { useState } from 'react';
import DefaultMap from './src/components/defaultMap';
import Camera from './src/components/camera';
import Profile from './src/components/profile';
import { View } from 'react-native';
import GoogleAuth from './src/components/googleAuth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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
            <Stack.Navigator>


                {<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <GoogleAuth />
                    <Profile
                        profile_pic={profile_pic}
                        first_name={first_name}
                        last_name={last_name}
                        full_name={full_name}
                        username={username}
                        email={email}
                    />
                </View>}

            </Stack.Navigator>

        </NavigationContainer>








    );
}
