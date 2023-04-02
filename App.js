import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInPage from "./src/screens/signIn";
import SignUpPage from "./src/screens/signUp";
import DefaultMap from "./src/screens/defaultMap";
import Profile from "./src/screens/profile";
import GoogleAuth from "./src/screens/googleAuth";
import ForgetPasswdPage from "./src/screens/forgetPasswd";
import ConfirmationCodeScreen from "./src/screens/ConfirmationCodeScreen";
import { Amplify } from 'aws-amplify';
// import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';

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
                <Stack.Screen name="ConfirmationCodeScreen" component={ConfirmationCodeScreen} />
                <Stack.Screen name="DefaultMap" component={DefaultMap} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}