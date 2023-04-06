import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInPage from "./src/components/signIn";
import SignUpPage from "./src/components/signUp";
import DefaultMap from "./src/components/defaultMap";
import Profile from "./src/components/profile";
import GoogleAuth from "./src/components/googleAuth";
import ForgetPasswdPage from "./src/components/forgetPasswd";
import ConfirmationCodeScreen from "./src/components/ConfirmationCodeScreen";
import { Amplify } from 'aws-amplify';

// import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig);

export default function App() {
    const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
    const [fontsLoaded, error] = useFonts({
        Montserrat_light: require("./src/assets/fonts/Montserrat_light.ttf"),
        Montserrat: require("./src/assets/fonts/Montserrat_regular.ttf"),
        Montserrat_medium: require("./src/assets/fonts/Montserrat_medium.ttf"),
        Montserrat_semibold: require("./src/assets/fonts/Montserrat_semibold.ttf"),
        Montserrat_bold: require("./src/assets/fonts/Montserrat_bold.ttf"),
        Montserrat_extrabold: require("./src/assets/fonts/Montserrat_extrabold.ttf"),
        Montserrat_black: require("./src/assets/fonts/Montserrat_black.ttf"),
        Montserrat_light_italic: require("./src/assets/fonts/Montserrat_light_italic.ttf"),
    });

    React.useEffect(() => {
        setTimeout(() => {
            setHideSplashScreen(true);
        }, 3000);
    }, []);

    if (!fontsLoaded && !error) {
        return null;
    }
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
                <Stack.Screen name="ForgetPasswdBuffer" component={ForgetPasswdBufferPage} />
                <Stack.Screen name="GoogleAuth" component={GoogleAuth} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="ConfirmationCodeScreen" component={ConfirmationCodeScreen} />
                <Stack.Screen name="DefaultMap" component={DefaultMap} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}