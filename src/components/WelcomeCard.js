import * as React from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, Padding, Border, FontSize } from "../GlobalStyles";

const WelcomeCard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.signInScreenInner}>
      <View style={styles.signInScreenInner}>
        <Text style={[styles.welcome, styles.welcomeTypo]}>Welcome!</Text>
        <TextInput
          style={[
            styles.usernameemailForm,
            styles.mt16,
            styles.signInButtonFlexBox,
          ]}
          placeholder="Username/Email"
          keyboardType="default"
          autoCapitalize="none"
          placeholderTextColor="#f5f4f2"
        />
        <TextInput
          style={[
            styles.usernameemailForm,
            styles.mt16,
            styles.signInButtonFlexBox,
          ]}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry
          placeholderTextColor="#f5f4f2"
        />
        <TouchableOpacity
          style={[styles.signInButton, styles.mt16, styles.signInButtonFlexBox]}
          activeOpacity={0.2}
          onPress={() => navigation.navigate("HomePageOverlay")}
        >
          <Text style={[styles.buttonText, styles.welcomeTypo]}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mt16: {
    marginTop: 16,
  },
  welcomeTypo: {
    color: Color.whitesmoke_100,
    fontFamily: FontFamily.montserratExtrabold,
    fontWeight: "800",
  },
  signInButtonFlexBox: {
    paddingHorizontal: Padding.p_6xl,
    flexDirection: "row",
    borderRadius: Border.br_12xl_5,
    alignItems: "center",
    alignSelf: "stretch",
  },
  welcome: {
    fontSize: FontSize.size_19xl,
    textAlign: "center",
  },
  usernameemailForm: {
    backgroundColor: Color.gray_100,
    height: 60,
    paddingVertical: Padding.p_xl,
  },
  buttonText: {
    fontSize: FontSize.size_base,
    textAlign: "left",
  },
  signInButton: {
    backgroundColor: Color.teal,
    height: 59,
    paddingVertical: Padding.p_base,
    justifyContent: "center",
  },
  signInScreenInner: {
    alignItems: "center",
    alignSelf: "stretch",
  },
});

export default WelcomeCard;
