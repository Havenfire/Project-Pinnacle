import React, { useState, useCallback } from "react";
import { Text, StyleSheet, TextInput, Pressable, TouchableOpacity, View, Image, Modal, Alert } from "react-native";
import { Checkbox } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import TOSModal from "../components/TOSModal";
import { FontFamily, Padding, Border, FontSize, Color } from "../GlobalStyles";
import { Auth } from "aws-amplify";

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
                    onChangeText={setUsername}
                    placeholderTextColor="rgba(36, 28, 28, 0.6)"
                />
                <TextInput
                    style={[styles.textBox]}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    type="email"
                    inputMode="email"
                    onChangeText={setEmail}
                    placeholderTextColor="rgba(36, 28, 28, 0.6)"
                />
                <TextInput
                    style={[styles.textBox]}
                    placeholder="Password"
                    keyboardType="default"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    type="new-password"
                    onChangeText={setPassword}
                    placeholderTextColor="rgba(36, 28, 28, 0.6)"
                />
                <TextInput
                    style={[styles.textBox]}
                    placeholder="Confirm Password"
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
                    <TOSModal onClose={closeToS} />
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
        fontSize: FontSize.size_19xl,
        textAlign: "center",
        height: 60,
        color: Color.whitesmoke_100,
        alignSelf: "stretch",
    },
    textBox: {
        backgroundColor: Color.whitesmoke_200,
        height: 60,
        marginTop: 16,
        paddingHorizontal: Padding.p_6xl,
        borderRadius: Border.br_12xl_5,
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
    },
    signUpButton: {
        backgroundColor: Color.orange,
        height: 60,
        marginTop: 16,
        paddingVertical: Padding.p_base,
        justifyContent: "center",
        paddingHorizontal: Padding.p_6xl,
        borderRadius: Border.br_12xl_5,
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
    },
    signUpText: {
        fontSize: FontSize.size_xl,
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
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratLight,
        color: Color.whitesmoke_100,
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
        padding: Padding.p_11xl,
        justifyContent: "center",
        flex: 1,
    },
});

export default SignUpPage;