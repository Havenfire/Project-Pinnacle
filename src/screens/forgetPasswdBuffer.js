import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, Pressable, TouchableOpacity, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Padding, Border, FontSize, Color } from "../GlobalStyles";
import { Auth } from "aws-amplify";

export default class ForgetPasswdBufferPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            username: "",
        };
    }

    async resendConfirmationCode() {
        try {
            await Auth.forgotPassword(this.state.username);
            console.log("Verification code sent successfully");
            this.props.navigation.navigate("ForgetPasswd", { username: this.state.username });
        } catch (err) {
            console.log("Error sending verification code: ", err);
            Alert.alert("Error", "There was an error sending the verification code. Please try again.");
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
                        <Text style={[styles.resetPassword]}>Send Reset Code</Text>
                        <TextInput
                            style={[styles.text, styles.button]}
                            returnKeyType="next"
                            placeholder="Username"
                            onChangeText={(text) => this.setState({ username: text })}
                            placeholderTextColor={Color.lightButtonText}
                            value={this.state.username}
                        />
                        <TouchableOpacity
                            style={[styles.reset, styles.button]}
                            activeOpacity={0.2}
                            onPress={() => this.resendConfirmationCode()}>
                            <Text style={[styles.buttonText, styles.buttonTextTypo]}>SEND CODE</Text>
                        </TouchableOpacity>
                    </View>
                    <Pressable style={[styles.backButton]} onPress={() => this.props.navigation.goBack()}>
                        <Image
                            style={styles.icon}
                            resizeMode="cover"
                            source={require("../assets/back-button-light4.png")}
                        />
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
        paddingHorizontal: Padding.p_6xl,
        flexDirection: "row",
        borderRadius: Border.br_12xl_5,
        alignSelf: "stretch",
        alignItems: "center",
    },
    resetPassword: {
        fontSize: FontSize.size_19xl,
        fontFamily: FontFamily.montserratExtrabold,
        color: Color.black,
        textAlign: "center",
    },
    text: {
        backgroundColor: Color.darkButton,
        height: 60,
        marginTop: 16,
        paddingVertical: Padding.p_xl,
        color: "rgba(36, 28, 28, 0.6)",
    },
    buttonText: {
        fontSize: FontSize.size_xl,
        color: Color.lightText,
        fontFamily: FontFamily.montserratExtrabold,
        textAlign: "left",
    },
    reset: {
        backgroundColor: Color.black,
        height: 60,
        marginTop: 16,
        paddingVertical: Padding.p_base,
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
