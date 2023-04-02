import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
import * as Font from 'expo-font';
import { LinearGradient } from "expo-linear-gradient";
import TextFieldSVG from '../assets/svg/sign-in/sign-in-shade.svg';
import SignInBtnSVG from '../assets/svg/sign-in/sign-in-button.svg';
import SignUpBtnSVG from '../assets/svg/sign-in/create-account-button.svg';
import SignInGoogleSVG from '../assets/svg/sign-in/sign-in-google.svg';
import { Auth } from 'aws-amplify';
import WelcomeCard from "../components/WelcomeCard";
import Buttons from "../components/Buttons";
import { Padding } from "../GlobalStyles";

export default class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            username: '',
            password: '',
            isLoading: false, // new state variable for loading indicator
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
        const { fontLoaded, isLoading } = this.state
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
                                <TextFieldSVG />
                                <TextInput
                                    style={styles.textFieldInput}
                                    returnKeyType="next"
                                    placeholder="Username / Email"
                                    onChangeText={(text) => this.setState({ username: text })}
                                    value={this.state.username}
                                />
                            </View>

                            {/* Password Input */}
                            <View style={styles.textFieldContainer}>
                                <TextFieldSVG />
                                <TextInput
                                    style={styles.textFieldInput}
                                    type="password"
                                    returnKeyType="done"
                                    secureTextEntry={true}
                                    placeholder="Password"
                                    onChangeText={(text) => this.setState({ password: text })}
                                    value={this.state.password}
                                />
                            </View>

                            {/* Sign In Button */}
                            <TouchableOpacity
                                style={styles.textFieldContainer}
                                onPress={async () => {
                                    this.setState({ isLoading: true });
                                    try {
                                        const user = await Auth.signIn({
                                            username: this.state.username,
                                            password: this.state.password,
                                        });

                                        this.props.navigation.navigate("DefaultMap");

                                    } catch (error) {
                                        Alert.alert(error.message);
                                        console.log(error);
                                    }
                                    this.setState({ isLoading: false });
                                }}
                            >
                                <SignInBtnSVG />
                                <Text style={styles.signInBtnText}>{this.state.isLoading ? 'LOADING...' : 'SIGN IN'}</Text>
                            </TouchableOpacity>

                            {/* OR Text */}
                            <View style={styles.textContainer}>
                                <Text style={styles.textOR}>OR</Text>
                            </View>

                            {/* Create Account Button */}
                            <TouchableOpacity
                                style={styles.textFieldContainer}
                                onPress={() => { this.props.navigation.navigate('SignUp') }}
                            >
                                <SignUpBtnSVG />
                                <Text style={styles.signInBtnText}>CREATE ACCOUNT</Text>
                            </TouchableOpacity>

                            {/* Forget Password Text */}
                            <View style={styles.textContainer}>
                                <Pressable onPress={() => { this.props.navigation.navigate('ForgetPasswd') }}>
                                    <Text style={styles.textForget}>Forgot Password?</Text>
                                </Pressable>
                            </View>

                            {/* Continue without Sign In */}
                            <View style={styles.textContainer}>
                                <Pressable onPress={() => { this.props.navigation.navigate('DefaultMap') }}>
                                    <Text style={styles.textForget}>Continue w/o Sign In</Text>
                                </Pressable>
                            </View>

                            {/* Sign In With Google */}
                            <TouchableOpacity
                                style={styles.googleIconContainer}
                                onPress={() => { this.props.navigation.navigate('GoogleAuth') }}
                            >
                                <SignInGoogleSVG />
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
            </View>
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
        textAlign: 'left',
        width: 279,
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
        textAlign: 'right',
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