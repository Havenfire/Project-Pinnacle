import React, { useState, useCallback } from "react";
import { Text, StyleSheet, TextInput, Pressable, TouchableOpacity, View, Image, Modal, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color } from "../GlobalStyles";
import { Auth } from "aws-amplify";
import { useRef } from "react";

const SignUpPage = () => {
    const [ageMinReq, setAgeMinReq] = useState(false);
    const [tosAgree, setTosAgree] = useState(false);
    const [tosVisible, setTosVisible] = useState(false);
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const openTos = useCallback(() => {
        setTosVisible(true);
    }, []);

    const closeToS = useCallback(() => {
        setTosVisible(false);
    }, []);

    async function trySignUp() {
        if (!ageMinReq || !tosAgree) {
            Alert.alert("Please agree to the terms and conditions.");
            return;
        }
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert("Please fill out all fields.");
            return;
        }
        if (password === confirmPassword) {
            try {
                const user = await Auth.signUp({
                    username: username,
                    password: password,
                    attributes: {
                        email: email,
                    },
                });

                navigation.navigate("ConfirmationCodeScreen", { user });

                console.log(user);
            } catch (error) {
                Alert.alert(error.message);
                console.log(error);
            }
        } else {
            Alert.alert("Passwords do not match.");
        }
    }

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    return (
        <>
            <LinearGradient
                style={[styles.signUpScreen]}
                locations={[0, 1]}
                colors={["#2C847F", "#7BA95E"]}>
                <Text style={[styles.signUpTitle, styles.signUpTypo]}>Sign Up</Text>
                {/* Username Input */}
                <TextInput
                    style={[styles.textBox]}
                    placeholder="Username"
                    keyboardType="default"
                    autoCapitalize="none"
                    returnKeyType="next"
                    onChangeText={setUsername}
                    placeholderTextColor="rgba(36, 28, 28, 0.6)"
                    onSubmitEditing={() => {
                        emailRef.current.focus();
                    }}
                    blurOnSubmit={false}
                />
                <TextInput
                    style={[styles.textBox]}
                    placeholder="Email" ref={emailRef}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    type="email"
                    inputMode="email"
                    onChangeText={setEmail}
                    placeholderTextColor="rgba(36, 28, 28, 0.6)"
                    onSubmitEditing={() => {
                        passwordRef.current.focus();
                    }}
                    blurOnSubmit={false}
                />
                <TextInput
                    style={[styles.textBox]}
                    placeholder="Password" ref={passwordRef}
                    keyboardType="default"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    type="new-password"
                    returnKeyType="next"
                    onChangeText={setPassword}
                    placeholderTextColor="rgba(36, 28, 28, 0.6)"
                    onSubmitEditing={() => {
                        confirmPasswordRef.current.focus();
                    }}
                    blurOnSubmit={false}
                />
                <TextInput
                    style={[styles.textBox]}
                    placeholder="Confirm Password" ref={confirmPasswordRef}
                    keyboardType="default"
                    autoCapitalize="none"
                    returnKeyType="done"
                    type="password"
                    secureTextEntry={true}
                    onChangeText={setConfirmPassword}
                    placeholderTextColor="rgba(36, 28, 28, 0.6)"
                />
                <TouchableOpacity
                    style={[styles.signUpButton]}
                    activeOpacity={0.2}
                    onPress={trySignUp}>
                    <Text style={[styles.signUpText]}>SIGN UP</Text>
                </TouchableOpacity>
                <View style={styles.mt16}>
                    <View style={[styles.tosCheck]}>
                        <Checkbox
                            status={ageMinReq ? "checked" : "unchecked"}
                            onPress={() => setAgeMinReq(!ageMinReq)}
                            color="#fbbc05"
                        />
                        <Pressable onPress={() => setAgeMinReq(!ageMinReq)}>
                            <Text style={[styles.tosText]}>
                                I AM AT LEAST 13 YEARS OLD
                            </Text>
                        </Pressable>
                    </View>
                    <View style={[styles.tosCheck, styles.mt16]}>
                        {/* <View> */}
                        <Checkbox
                            style={styles.checkBox}
                            status={tosAgree ? "checked" : "unchecked"}
                            onPress={() => {
                                if (!tosAgree) openTos();
                                setTosAgree(!tosAgree);
                            }}
                            color="#fbbc05"
                        />
                        {/* </View> */}
                        <Pressable onPress={() => { if (!tosAgree) openTos(); setTosAgree(!tosAgree); }}>
                            <Text style={[styles.tosText]}>
                                {"I HAVE READ AND AGREED TO THE TERMS OF SERVICE"}
                            </Text>
                        </Pressable>
                    </View>
                </View>
                <Pressable style={[styles.backButton]} onPress={() => navigation.goBack()}>
                    <Image style={styles.icon} resizeMode="cover" source={require("../assets/back-button-light4.png")} />
                </Pressable>
            </LinearGradient>

            <Modal animationType="fade" transparent visible={tosVisible}>
                <View style={styles.tosOverlay}>
                    <Pressable style={styles.tosOverlayBg} onPress={closeToS} />
                    <View onClose={closeToS} style={styles.tosModal}>
                        <Text style={styles.termsOfServiceContainer}>
                            <Text style={styles.termsOfServiceTitle}>
                                {"TERMS OF SERVICE\n"}
                            </Text>
                            <Text style={styles.termsOfServiceText}>
                                {"\nBy agreeing to the terms and service, you are agreeing to use the Pinnacle app in good faith and conduct yourself in a respectable manner without placing extraneous pins or pictures containing explicit material."}
                            </Text>
                        </Text>
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({

    mt16: {
        marginTop: 16,
    },

    signUpTypo: {
        fontFamily: FontFamily.montserratExtrabold,
        fontWeight: "800",
    },
    signUpTitle: {
        fontSize: 38,
        textAlign: "center",
        height: 60,
        color: Color.lightText,
        alignSelf: "stretch",
    },
    textBox: {
        backgroundColor: Color.lightButton,
        height: 60,
        marginTop: 16,
        paddingHorizontal: 25,
        borderRadius: 32,
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
    },
    signUpButton: {
        backgroundColor: Color.orange,
        height: 60,
        marginTop: 16,
        paddingVertical: 16,
        justifyContent: "center",
        paddingHorizontal: 25,
        borderRadius: 32,
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
    },
    signUpText: {
        fontSize: 20,
        fontFamily: FontFamily.montserratExtrabold,
    },
    signUpParent: {
        alignSelf: "stretch",
        justifyContent: "center",
    },
    tosOverlay: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(245, 244, 242, 0.5)",
    },
    tosOverlayBg: {
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
    },
    tosText: {
        textAlign: "left",
        fontSize: 16,
        fontFamily: FontFamily.montserratLight,
        color: Color.lightButtonText,
    },
    tosCheck: {
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
    },
    icon: {
        height: "100%",
        overflow: "hidden",
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
    signUpScreen: {
        padding: 30,
        justifyContent: "center",
        flex: 1,
    },
    termsOfServiceTitle: {
        fontFamily: FontFamily.montserratExtrabold,
        fontSize: 20,
    },
    termsOfServiceText: {
        fontFamily: FontFamily.montserratRegular,
        fontSize: 14,
    },
    termsOfServiceContainer: {
        alignSelf: "stretch",
        fontSize: 16,
        color: Color.black,
        textAlign: "left",
    },
    tosModal: {
        borderRadius: 32,
        backgroundColor: Color.lightText,
        width: 360,
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "100%",
        maxHeight: "100%",
    },
});

export default SignUpPage;