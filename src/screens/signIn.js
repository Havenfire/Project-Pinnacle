import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Padding, FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { Auth } from "aws-amplify";

export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameOrEmail: "",
      password: "",
      isLoading: false, // new state variable for loading indicator
    };
  }

  render() {
    return (
      <LinearGradient
        colors={["#5DB45B", "#B7BA44"]}
        style={styles.signInScreen}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* WelcomeCard */}
        <Text style={[styles.welcome]}>Welcome!</Text>
        <TextInput
          style={[styles.usernameemailForm, styles.signInButtonFlexBox]}
          placeholder="Username or Email"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={Color.lightButtonText}
          returnKeyType="next"
          onChangeText={(text) =>
            this.setState({ usernameOrEmail: text })
          }
          value={this.state.usernameOrEmail}
        />
        <TextInput
          style={[styles.usernameemailForm, styles.signInButtonFlexBox]}
          placeholder="Password"
          keyboardType="default"
          secureTextEntry
          placeholderTextColor={Color.lightButtonText}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={[styles.signInButton, styles.mt16, styles.signInButtonFlexBox]}
          activeOpacity={0.2}
          onPress={async () => {
            this.setState({ isLoading: true });
            try {
              const user = await Auth.signIn({
                username: this.state.usernameOrEmail,
                password: this.state.password,
              });
              this.props.navigation.navigate("DefaultMap");
            } catch (error) {
              Alert.alert(error.message);
              console.log(error);
            }
            this.setState({ isLoading: false });
          }}
        >
          <Text style={[styles.signInText, styles.buttonTypo]}>
            {this.state.isLoading ? "LOADING..." : "SIGN IN"}
          </Text>
        </TouchableOpacity>

        {/* Buttons */}
        <View style={[styles.orParent, styles.mt10]}>
          <Text style={[styles.or, styles.orTypo]}>OR</Text>
          <View style={[styles.frameParent]}>
            <TouchableOpacity
              style={[
                styles.createAccountButton,
                styles.buttonFlexBox,
              ]}
              activeOpacity={0.2}
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
            >
              <Text style={[styles.createAccountText, styles.buttonTypo]}>
                CREATE ACCOUNT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.forgotPasswordButton, styles.mt10]}
              activeOpacity={0.2}
              onPress={() => {
                this.props.navigation.navigate("ForgetPasswdBuffer");
              }}
            >
              <Text style={[styles.forgotPasswordText]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
    mt10: {
        marginTop: 10,
    },
    signInScreen: {
        backgroundColor: "transparent",
        flex: 1,
        width: "100%",
        height: 800,
        paddingHorizontal: Padding.p_11xl,
        paddingVertical: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    signInButtonFlexBox: {
        paddingHorizontal: Padding.p_6xl,
        flexDirection: "row",
        borderRadius: Border.br_12xl_5,
        alignItems: "center",
        alignSelf: "stretch",
        marginTop: 16,
    },
    welcome: {
        fontSize: FontSize.size_19xl,
        textAlign: "center",
        color: Color.lightText,
        fontFamily: FontFamily.montserratExtrabold,
    },
    usernameemailForm: {
        backgroundColor: Color.darkButton,
        height: 60,
        paddingVertical: Padding.p_xl,
        color: Color.lightButtonText,
    },
    signInText: {
        fontSize: FontSize.size_base,
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
        borderRadius: Border.br_12xl_5,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
        marginTop: 10,
    },
    buttonTypo: {
        fontFamily: FontFamily.montserratBold,
        fontSize: FontSize.size_xl,
    },
    or: {
        fontFamily: FontFamily.montserratLight,
        textAlign: "center",
        color: Color.lightButtonText,
        fontSize: FontSize.size_base,
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
        borderColor: "#f5f4f2",
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