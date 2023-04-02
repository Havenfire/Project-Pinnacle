import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as Font from 'expo-font';
import { LinearGradient } from "expo-linear-gradient";
import TextFieldSVG from '../assets/svg/forget-passwd/forget-passwd-shade.svg';
import ForgetPasswdBtn from '../assets/svg/forget-passwd/forget-passwd-button.svg';
import BackBtnSVG from '../assets/svg/common/back-button.svg'

export default class ForgetPasswdPage extends Component {
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
                        colors={['#B7BA44', '#FBBC05']}
                        style={styles.container}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <SafeAreaView>
                            {/* Back Button */}
                            <TouchableOpacity
                                style={styles.backBtnContainer}
                                onPress={() => this.props.navigation.goBack()}
                            >
                                <BackBtnSVG />
                            </TouchableOpacity>

                            {/* Title */}
                            <Text style={styles.title}>Reset Password</Text>

                            {/* Blank Space */}
                            <View style={styles.textFieldContainer}>
                            </View>

                            {/* Email Input */}
                            <View style={styles.textFieldContainer}>
                                <TextFieldSVG />
                                <TextInput
                                    style={styles.textFieldInput}
                                    returnKeyType="next"
                                    type="email"
                                    inputMode="email"
                                    keyboardType="email-address"
                                    placeholder="Email"
                                />
                            </View>

                            {/* Sign Up Button */}
                            <TouchableOpacity
                                style={styles.textFieldContainer}
                                onPress={() => this.props.navigation.navigate('SignIn')}
                            >
                                <ForgetPasswdBtn />
                                <Text style={styles.signUpBtnText}>RESET</Text>
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
                    colors={['#B7BA44', '#FBBC05']}
                    style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                />
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backBtnContainer: {
        position: 'absolute',
        marginLeft: 28,
        marginTop: "15%",
        width: 25,
        height: 25,
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
    signUpBtnText: {
        position: 'absolute',
        fontSize: 24,
        fontFamily: 'Montserrat-ExtraBold',
        alignSelf: 'center',
        color: '#F5F4F2',
    }
});