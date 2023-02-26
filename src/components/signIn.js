import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, Button, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { LinearGradient } from "expo-linear-gradient";
import TextFieldSVG from '../assets/svg/sign-in/sign-in-shade.svg';
import SignInBtnSVG from '../assets/svg/sign-in/sign-in-button.svg';
import SignUpBtnSVG from '../assets/svg/sign-in/create-account-button.svg';
import SignInGoogleSVG from '../assets/svg/sign-in/sign-in-google.svg';

export default class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
        }
    }

    async componentDidMount() {
        try {
            await Font.loadAsync({
                "Montserrat": require('../assets/font/Montserrat/Regular.ttf'),
                // "Montserrat-Italic": require('../assets/font/Montserrat/Italic.ttf'),
                // "Montserrat-Bold": require('../assets/font/Montserrat/Bold.ttf'),
                // "Montserrat-BoldItalic": require('../assets/font/Montserrat/BoldItalic.ttf'),
                // "Montserrat-Thin": require('../assets/font/Montserrat/Thin.ttf'),
                // "Montserrat-ThinItalic": require('../assets/font/Montserrat/ThinItalic.ttf'),
                // "Montserrat-ExtraLight": require('../assets/font/Montserrat/ExtraLight.ttf'),
                // "Montserrat-ExtraLightItalic": require('../assets/font/Montserrat/ExtraLightItalic.ttf'),
                "Montserrat-Light": require('../assets/font/Montserrat/Light.ttf'),
                "Montserrat-LightItalic": require('../assets/font/Montserrat/LightItalic.ttf'),
                "Montserrat-Medium": require('../assets/font/Montserrat/Medium.ttf'),
                // "Montserrat-MediumItalic": require('../assets/font/Montserrat/MediumItalic.ttf'),
                // "Montserrat-SemiBold": require('../assets/font/Montserrat/SemiBold.ttf'),
                // "Montserrat-SemiBoldItalic": require('../assets/font/Montserrat/SemiBoldItalic.ttf'),
                "Montserrat-ExtraBold": require('../assets/font/Montserrat/ExtraBold.ttf'),
                // "Montserrat-ExtraBoldItalic": require('../assets/font/Montserrat/ExtraBoldItalic.ttf'),
                // "Montserrat-Black": require('../assets/font/Montserrat/Black.ttf'),
                // "Montserrat-BlackItalic": require('../assets/font/Montserrat/BlackItalic.ttf'),
            })
            this.setState({ fontLoaded: true })
        } catch (error) {
            console.log(error)
            return
        }
    }

    render() {
        const { fontLoaded } = this.state
        if (fontLoaded) {
            return (
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#5DB45B', '#B7BA44']}
                        style={styles.container}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <SafeAreaView>
                            {/* Title */}
                            <Text style={styles.title}>Welcome!</Text>

                            {/* Username Input */}
                            <View style={styles.textFieldContainer}>
                                <TextFieldSVG
                                    style={styles.button}
                                />
                                <TextInput
                                    style={styles.textFieldInput}
                                    placeholder="Username / Email"
                                ></TextInput>
                            </View>

                            {/* Password Input */}
                            <View style={styles.textFieldContainer}>
                                <TextFieldSVG
                                    style={styles.button}
                                />
                                <TextInput
                                    style={styles.textFieldInput}
                                    placeholder="Password"
                                ></TextInput>
                            </View>

                            {/* Sign In Button */}
                            <TouchableOpacity style={styles.textFieldContainer}>
                                <SignInBtnSVG
                                    style={styles.button}
                                />
                                <Text
                                    style={styles.signInBtnText}
                                >SIGN IN</Text>
                            </TouchableOpacity>

                            {/* OR Text */}
                            <View style={styles.textContainer}>
                                <Text
                                    style={styles.textOR}
                                >OR</Text>
                            </View>

                            {/* Create Account Button */}
                            <TouchableOpacity style={styles.textFieldContainer}>
                                <SignUpBtnSVG
                                    style={styles.button}
                                />
                                <Text
                                    style={styles.signInBtnText}
                                >CREATE ACCOUNT</Text>
                            </TouchableOpacity>

                            {/* Forget Password Text */}
                            <View style={styles.textContainer}>
                                <Text
                                    style={styles.textForget}
                                >Forgot Password?</Text>
                            </View>

                            {/* Sign In With Google */}
                            <TouchableOpacity style={styles.googleIconContainer}>
                                <SignInGoogleSVG
                                    style={styles.button}
                                />
                            </TouchableOpacity>
                        </SafeAreaView>
                    </LinearGradient>
                </View>
            )
        }
        return (
            // Default loading screen
            <View style={styles.container} >
                <LinearGradient
                    colors={['#5DB45B', '#B7BA44']}
                    style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontFamily: 'Montserrat-ExtraBold',
        fontSize: 38,
        color: '#F5F4F2',
        textAlign: 'center',
        marginTop: "30%",
        marginBottom: "20%",
    },
    textFieldContainer: {
        marginBottom: "20%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    textContainer: {
        marginTop: "-8%",
        marginBottom: "17%",
        alignSelf: 'center',
        flex: 1,
    },
    textFieldInput: {
        position: 'absolute',
        fontSize: 18,
        fontFamily: 'Montserrat-Medium',
        alignSelf: 'left',
        marginLeft: 20,
        color: '#241C1C',
        opacity: 0.7
    },
    signInBtnText: {
        position: 'absolute',
        fontSize: 24,
        fontFamily: 'Montserrat-ExtraBold',
        alignSelf: 'center',
        color: '#F5F4F2',
    },
    textOR: {
        position: 'absolute',
        fontSize: 16,
        fontFamily: 'Montserrat-Light',
        alignSelf: 'center',
        color: '#F5F4F2',
    },
    textForget: {
        position: 'absolute',
        fontSize: 16,
        fontFamily: 'Montserrat-LightItalic',
        alignSelf: 'right',
        color: '#2C847F',
    },
    googleIconContainer: {
        marginTop: "10%",
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
    }
});