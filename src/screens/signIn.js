import * as React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Color } from "../GlobalStyles";
import { Auth } from 'aws-amplify';
import { useRef } from "react";

const SignInPage = ({ navigation }) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const signIn = async () => {
        setIsLoading(true);
        try {
            const user = await Auth.signIn({
                username: username,
                password,
            });
            const nav_username = user.username;
            navigation.navigate("DefaultMap", { nav_username });
        } catch (error) {
            if (error.name === "UserNotConfirmedException") {
                navigation.navigate("ConfirmationCodeScreen", { user: { user: { username: username } } });
            }
            Alert.alert(error.message);
            console.log(JSON.stringify(error));
        }
        setIsLoading(false);
    }

    const passwordRef = useRef();
    return (
        <LinearGradient
            colors={["#5DB45B", "#B7BA44"]}
            style={styles.signInScreen}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            {/* WelcomeCard */}
            <Text style={[styles.welcome]}>Welcome!</Text>
            <TextInput
                style={[styles.usernameemailForm, styles.signInButtonFlexBox]}
                placeholder="Username"
                autoCapitalize="none"
                placeholderTextColor={Color.lightButtonText}
                returnKeyType="next"
                onChangeText={setUsername}
                value={username}
                onSubmitEditing={() => {
                    if (username.slice(-1) === ' ') {
                        setUsername(username.slice(0, -1));
                    }
                    passwordRef.current.focus();
                }}
                blurOnSubmit={false}
            />
            <TextInput
                style={[styles.usernameemailForm, styles.signInButtonFlexBox]}
                placeholder="Password" ref={passwordRef}
                keyboardType="default"
                secureTextEntry
                placeholderTextColor={Color.lightButtonText}
                onChangeText={setPassword}
                value={password}
            />
            <TouchableOpacity
                style={[styles.signInButton, styles.mt16, styles.signInButtonFlexBox]}
                activeOpacity={0.2}
                onPress={signIn}>
                <Text style={[styles.signInText, styles.buttonTypo]}>
                    {isLoading ? "LOADING..." : "SIGN IN"}
                </Text>
            </TouchableOpacity>

            {/* Buttons */}
            <View style={[styles.orParent, styles.mt10]}>
                <Text style={[styles.or, styles.orTypo]}>OR</Text>
                <View style={[styles.frameParent]}>
                    <TouchableOpacity
                        style={[styles.createAccountButton, styles.buttonFlexBox]}
                        activeOpacity={0.2}
                        onPress={() => {
                            navigation.navigate("SignUp");
                        }}>
                        <Text style={[styles.createAccountText, styles.buttonTypo]}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.forgotPasswordButton, styles.mt10]}
                        activeOpacity={0.2}
                        onPress={() => {
                            navigation.navigate("ForgetPasswdBuffer");
                        }}>
                        <Text style={[styles.forgotPasswordText]}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    mt10: {
        marginTop: 10,
    },
    signInScreen: {
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: 800,
        paddingHorizontal: 30,
        paddingVertical: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    signInButtonFlexBox: {
        paddingHorizontal: 25,
        flexDirection: "row",
        borderRadius: 32,
        alignItems: "center",
        alignSelf: "stretch",
        marginTop: 16,
    },
    welcome: {
        fontSize: 38,
        textAlign: "center",
        color: Color.lightText,
        fontFamily: FontFamily.montserratExtrabold,
    },
    usernameemailForm: {
        backgroundColor: Color.darkButton,
        height: 60,
        paddingVertical: 20,
        color: Color.lightButtonText,
    },
    signInText: {
        fontSize: 16,
        textAlign: "center",
        color: Color.lightText,
        fontFamily: FontFamily.montserratExtrabold,
    },
    signInButton: {
        backgroundColor: Color.teal,
        height: 60,
        justifyContent: "center",
    },
    signInScreenInner: {
        alignItems: "center",
        alignSelf: "stretch",
    },
    mt16: {
        marginTop: 16,
    },
    orTypo: {
        fontWeight: "300",
        textAlign: "center",
    },
    buttonFlexBox: {
        justifyContent: "center",
        borderRadius: 32,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        marginTop: 10,
    },
    buttonTypo: {
        fontFamily: FontFamily.montserratBold,
        fontSize: 20,
    },
    or: {
        fontFamily: FontFamily.montserratLight,
        textAlign: "center",
        color: Color.lightButtonText,
        fontSize: 16,
    },
    signInWithButton: {
        backgroundColor: Color.lightText,
        height: 60,
    },
    createAccountText: {
        textAlign: "left",
        color: Color.lightText,
    },
    createAccountButton: {
        borderStyle: "solid",
        borderColor: "#f4f4f4",
        borderWidth: 3,
        height: 60,
    },
    forgotPasswordText: {
        fontStyle: "italic",
        fontFamily: FontFamily.montserratLightItalic,
        color: Color.teal,
        textAlign: "center",
    },
    forgotPasswordButton: {
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
    },
    frameParent: {
        alignItems: "flex-end",
        alignSelf: "stretch",
    },
    orParent: {
        alignItems: "center",
        alignSelf: "stretch",
    },
});

export default SignInPage;
