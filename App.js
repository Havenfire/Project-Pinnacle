import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInPage from "./src/components/signIn";
import SignUpPage from "./src/components/signUp";
import DefaultMap from "./src/components/defaultMap";
import Profile from "./src/components/profile";
import GoogleAuth from "./src/components/googleAuth";
import ForgetPasswdPage from "./src/components/forgetPasswd";
import { Amplify } from 'aws-amplify';
//import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
//import signUp from './src/components/signUp';

Amplify.configure(awsconfig);

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="SignIn" component={SignInPage} />
                <Stack.Screen name="SignUp" component={SignUpPage} />
                <Stack.Screen name="ForgetPasswd" component={ForgetPasswdPage} />
                <Stack.Screen name="GoogleAuth" component={GoogleAuth} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="DefaultMap" component={DefaultMap} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}