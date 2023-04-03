import * as React from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, FontFamily, FontSize, Color, Padding } from "../GlobalStyles";

const Buttons = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.orParent, styles.mt10]}>
      <Text style={[styles.or, styles.orTypo]}>OR</Text>
      <View style={[styles.frameParent, styles.mt10]}>
        <View style={styles.signInWithButtonParent}>
          <TouchableOpacity
            style={[styles.signInWithButton, styles.buttonFlexBox]}
            activeOpacity={0.2}
            onPress={() => {}}
          >
            <Image
              style={styles.googleGLogo1Icon}
              resizeMode="cover"
              source={require("../assets/google--g--logo-1.png")}
            />
            <Text
              style={[styles.buttonText, styles.ml15, styles.buttonTypo]}
            >{`Sign in with Google `}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.createAccountButton,
              styles.mt16,
              styles.buttonFlexBox,
            ]}
            activeOpacity={0.2}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            <Text style={[styles.buttonText1, styles.buttonTypo]}>
              CREATE ACCOUNT
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.forgotPasswordButton, styles.mt10]}
          activeOpacity={0.2}
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={[styles.forgotPassword, styles.orTypo]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ml15: {
    marginLeft: 15,
  },
  mt16: {
    marginTop: 16,
  },
  mt10: {
    marginTop: 10,
  },
  orTypo: {
    fontWeight: "300",
    textAlign: "center",
  },
  buttonFlexBox: {
    justifyContent: "center",
    borderRadius: Border.br_12xl_5,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  buttonTypo: {
    fontFamily: FontFamily.montserratBold,
    fontWeight: "700",
    fontSize: FontSize.size_base,
  },
  or: {
    fontFamily: FontFamily.montserratLight,
    textAlign: "center",
    color: Color.whitesmoke_100,
    fontSize: FontSize.size_base,
    fontWeight: "300",
  },
  googleGLogo1Icon: {
    width: 27,
    height: 29,
    overflow: "hidden",
  },
  buttonText: {
    color: Color.gray_200,
    textAlign: "center",
  },
  signInWithButton: {
    backgroundColor: Color.whitesmoke_100,
    height: 57,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_sm,
  },
  buttonText1: {
    textAlign: "left",
    color: Color.whitesmoke_100,
  },
  createAccountButton: {
    borderStyle: "solid",
    borderColor: "#f5f4f2",
    borderWidth: 3,
    height: 59,
    paddingHorizontal: Padding.p_6xl,
    paddingVertical: Padding.p_base,
  },
  signInWithButtonParent: {
    alignSelf: "stretch",
  },
  forgotPassword: {
    fontSize: FontSize.size_sm,
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

export default Buttons;
