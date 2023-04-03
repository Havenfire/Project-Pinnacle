import * as React from "react";
import { Text, StyleSheet, TextInput, Pressable, TouchableOpacity, View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Padding, Border, FontSize, Color } from "../GlobalStyles";

const ResetPasswordScreen = () => {
    const navigation = useNavigation();

    return (
        <LinearGradient
            colors={['#B7BA44', '#FBBC05']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <View style={[styles.resetPasswordScreen, styles.resetFlexBox]}>
                <View style={[styles.resetPasswordParent, styles.resetFlexBox]}>
                    <Text style={[styles.resetPassword]}>
                        Reset Password
                    </Text>
                    <TextInput
                        style={[styles.email, styles.button]}
                        placeholder="Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        type="email"
                        inputMode="email"
                        placeholderTextColor="rgba(36, 28, 28, 0.6)"
                    />
                    <TouchableOpacity
                        style={[styles.reset, styles.button]}
                        activeOpacity={0.2}
                        onPress={() => navigation.navigate("SignIn")}
                    >
                        <Text style={[styles.buttonText, styles.buttonTextTypo]}>RESET</Text>
                    </TouchableOpacity>
                </View>
                <Pressable
                    style={[styles.backButton]}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={styles.icon}
                        resizeMode="cover"
                        source={require("../assets/back-button-light4.png")}
                    />
                </Pressable>
            </View>
        </LinearGradient>
    );
};

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
    email: {
        backgroundColor: Color.white,
        height: 60,
        marginTop: 16,
        paddingVertical: Padding.p_xl,
    },
    buttonText: {
        fontSize: FontSize.size_xl,
        color: Color.whitesmoke_100,
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

export default ResetPasswordScreen;