import React, { Component } from "react";
import { StyleSheet, View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import TextFieldSVG from '../assets/svg/forget-passwd/forget-passwd-shade.svg';
import { Auth } from 'aws-amplify';

export default class ChangePasswdPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            username: '',
            password: '',
            confirmPassword: '',
        }
    }

    async submitNewPassword() {
        const { username, password, confirmPassword, code } = this.state;
        if (!username || !code || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
        try {
            await Auth.forgotPasswordSubmit(username, code, password);
            Alert.alert('Success', 'Your password has been successfully changed', [{
                text: 'OK',
                onPress: () => this.props.navigation.navigate('SignIn')
            }]);
        } catch (err) {
            console.log('Error submitting new password: ', err);
            Alert.alert('Error', 'There was an error changing your password. Please try again.');
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#B7BA44', '#FBBC05']}
                    style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <SafeAreaView>
                        {/* Title */}
                        <Text style={styles.title}>Change Password</Text>

                        {/* Code Input */}
                        <View style={styles.textFieldContainer}>
                            <TextFieldSVG />
                            <TextInput
                                style={styles.textFieldInput}
                                returnKeyType="next"
                                placeholder="Code"
                                onChangeText={(text) => this.setState({ code: text })}
                                value={this.state.code}
                            />
                        </View>

                        {/* Username Input */}
                        <View style={styles.textFieldContainer}>
                            <TextFieldSVG />
                            <TextInput
                                style={styles.textFieldInput}
                                returnKeyType="next"
                                placeholder="Username"
                                onChangeText={(text) => this.setState({ username: text })}
                                value={this.state.username}
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.textFieldContainer}>
                            <TextFieldSVG />
                            <TextInput
                                style={styles.textFieldInput}
                                secureTextEntry={true}
                                placeholder="New Password"
                                onChangeText={(text) => this.setState({ password: text })}
                                value={this.state.password}
                            />
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.textFieldContainer}>
                            <TextFieldSVG />
                            <TextInput
                                style={styles.textFieldInput}
                                secureTextEntry={true}
                                placeholder="Confirm Password"
                                onChangeText={(text) => this.setState({ confirmPassword: text })}
                                value={this.state.confirmPassword}
                            />
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={styles.submitBtn}
                            onPress={() => this.submitNewPassword()}
                        >
                           
                            <Text style={styles.signUpBtnText}>SUBMIT</Text>
                        </TouchableOpacity>

                    </SafeAreaView>
                </LinearGradient>
            </View>
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
    },
});