import React, { Component } from "react";
import { Text, StyleSheet, TextInput, Pressable, TouchableOpacity, View, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Color } from "../GlobalStyles";
import { Auth } from "aws-amplify";

export default class ChangePasswdPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            username: "",
            password: "",
            confirmPassword: "",
        };
    }

    async submitNewPassword() {
        const { username, password, confirmPassword, code } = this.state;
        if (!username || !code || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        try {
            await Auth.forgotPasswordSubmit(username, code, password);
            Alert.alert("Success", "Your password has been successfully changed", [
                {
                    text: "OK",
                    onPress: () => this.props.navigation.navigate("SignIn"),
                },
            ]);
        } catch (err) {
            console.log("Error submitting new password: ", err);
            Alert.alert("Error", "There was an error changing your password. Please try again.");
        }
    }

    render() {
        return (
            <LinearGradient
                colors={["#B7BA44", "#FBBC05"]}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}>
                <View style={[styles.resetPasswordScreen, styles.resetFlexBox]}>
                    <View style={[styles.resetPasswordParent, styles.resetFlexBox]}>
                        <Text style={[styles.resetPassword]}>Reset Password</Text>
                        <TextInput
                            style={[styles.text, styles.button]}
                            returnKeyType="next"
                            placeholder="Code"
                            onChangeText={(text) => this.setState({ code: text })}
                            placeholderTextColor={Color.lightButtonText}
                            value={this.state.code}
                        />
                        <TextInput
                            style={[styles.text, styles.button]}
                            returnKeyType="next"
                            placeholder="Username"
                            placeholderTextColor={Color.lightButtonText}
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.username}
                        />
                        <TextInput
                            style={[styles.text, styles.button]}
                            secureTextEntry={true}
                            placeholder="New Password"
                            placeholderTextColor={Color.lightButtonText}
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                        />
                        <TextInput
                            style={[styles.text, styles.button]}
                            secureTextEntry={true}
                            placeholder="Confirm Password"
                            placeholderTextColor={Color.lightButtonText}
                            onChangeText={(text) => this.setState({ confirmPassword: text })}
                            value={this.state.confirmPassword}
                        />
                        <TouchableOpacity
                            style={[styles.reset, styles.button]}
                            activeOpacity={0.2}
                            onPress={() => this.submitNewPassword()}>
                            <Text style={[styles.buttonText, styles.buttonTextTypo]}>RESET</Text>
                        </TouchableOpacity>
                    </View>
                    <Pressable style={[styles.backButton]} onPress={() => this.props.navigation.goBack()}>
                        <Image style={styles.icon} resizeMode="cover" source={require("../assets/back-button-light4.png")} />
                    </Pressable>
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mt16: {
        marginTop: 16,
    },
    resetFlexBox: {
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        paddingHorizontal: 25,
        flexDirection: "row",
        borderRadius: 32,
        alignSelf: "stretch",
        alignItems: "center",
    },
    resetPassword: {
        fontSize: 38,
        fontFamily: FontFamily.montserratExtrabold,
        color: Color.black,
        textAlign: "center",
    },
    text: {
        backgroundColor: Color.darkButton,
        height: 60,
        marginTop: 16,
        paddingVertical: 20,
        color: Color.lightButtonText,
    },
    buttonText: {
        fontSize: 20,
        color: Color.lightButtonText,
        fontFamily: FontFamily.montserratExtrabold,
        textAlign: "left",
    },
    reset: {
        backgroundColor: Color.black,
        height: 60,
        marginTop: 16,
        paddingVertical: 16,
        justifyContent: "center",
    },
    icon: {
        height: "100%",
        overflow: "hidden",
        width: "100%",
    },
    resetPasswordScreen: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        width: "100%",
    },
    backButton: {
        position: "absolute",
        left: "10%",
        top: "8%",
        width: 30,
        height: 30,
        zIndex: 1,
    },
});
