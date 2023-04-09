import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import SignInPage from "./src/screens/signIn";
import SignUpPage from "./src/screens/signUp";
import DefaultMap from "./src/screens/defaultMap";
import Profile from "./src/screens/profile";
import GoogleAuth from "./src/screens/googleAuth";
import ChangePasswdPage from "./src/screens/forgetPasswd";
import ForgetPasswdBufferPage from "./src/screens/forgetPasswdBuffer";
import ConfirmationCodeScreen from "./src/screens/ConfirmationCodeScreen";
import { Amplify } from 'aws-amplify';

// import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
// import SettingsMenu from "./src/screens/SettingsMenu";
// import YourPinsScreen from "./src/screens/YourPinsScreen";
import SavedPinsScreen from "./src/screens/SavedPinsScreen";
// import AdjustPinLocationOverlay from "./src/screens/AdjustPinLocationOverlay";
// import EditPinScreen from "./src/screens/EditPinScreen";
// import CameraOverlay from "./src/screens/CameraOverlay";
import DrawerMenu from "./src/screens/DrawerMenu";
// import HomePageOverlay from "./src/screens/HomePageOverlay";
// import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import Splashscreen from "./src/screens/Splashscreen";

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
        <>
            <NavigationContainer>
                {hideSplashScreen ? (
                    <Stack.Navigator
                        initialRouteName="SignIn"
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen
                            name="SavedPinsScreen"
                            component={SavedPinsScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="DrawerMenu"
                            component={DrawerMenu}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="SignIn" component={SignInPage} />
                        <Stack.Screen name="SignUp" component={SignUpPage} />
                        <Stack.Screen name="ForgetPasswd" component={ChangePasswdPage} />
                        <Stack.Screen name="ForgetPasswdBuffer" component={ForgetPasswdBufferPage} />
                        <Stack.Screen name="GoogleAuth" component={GoogleAuth} />
                        <Stack.Screen name="Profile" component={Profile} />
                        <Stack.Screen name="ConfirmationCodeScreen" component={ConfirmationCodeScreen} />
                        <Stack.Screen name="DefaultMap" component={DefaultMap} />
                        <Stack.Screen name="Splashscreen" component={Splashscreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                ) : (
                    <Splashscreen />
                )}
            </NavigationContainer>
        </>
    );
};