import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color } from "../GlobalStyles";
import { Auth } from 'aws-amplify';
import { useRoute } from "@react-navigation/native";

const ConfirmationCodeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const username = route.params.user.user.username;
  const nav_username = username;
  const [code, setCode] = React.useState('');

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
      navigation.navigate("SignIn", { nav_username });
    } catch (error) {
      console.log('error confirming sign up', error);
    }
  }

  async function resendConfirmationCode() {
    try {
      await Auth.resendSignUp(username);
      console.log('code resent successfully');
    } catch (err) {
      console.log('error resending code: ', err);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={[styles.confirmationCodeScreen, styles.buttonSolidFlexBox]}>
        <View style={styles.pleaseEnterTheConfirmationWrapper}>
          <Text style={styles.pleaseEnterThe}>
            Please enter the confirmation code sent to your email
          </Text>
        </View>

        <TextInput
          style={[styles.confirmationCodeScreenChild, styles.mt44]}
          placeholder="000000"
          keyboardType="number-pad"
          placeholderTextColor="rgba(28, 28, 28, 0.6)"
          maxLength={6}
          onChangeText={setCode}
        />

        <Pressable
          style={[styles.buttonSolid, styles.mt44, styles.buttonSolidFlexBox]}
          onPress={confirmSignUp}
        >
          <Text style={styles.buttonText}>LET'S GO</Text>
        </Pressable>

        <Pressable
          style={[styles.resendCodeButton, styles.mt44, styles.buttonSolidFlexBox]}
          onPress={resendConfirmationCode}
        >
          <Text style={styles.buttonText}>Resend Code</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mt44: {
    marginTop: 44,
  },
  buttonSolidFlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  pleaseEnterThe: {
    fontSize: 38,
    fontFamily: FontFamily.montserratExtrabold,
    color: Color.darkText,
    textAlign: "center",
  },
  pleaseEnterTheConfirmationWrapper: {
    padding: 10,
    flexDirection: "row",
  },
  confirmationCodeScreenChild: {
    alignSelf: "center",
    alignItems: "center",
    fontFamily: FontFamily.montserratMedium,
    fontSize: 16,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: FontFamily.montserratExtrabold,
    color: Color.lightText,
  },
  buttonSolid: {
    justifyContent: "center",
    borderRadius: 32,
    backgroundColor: Color.darkText,
    paddingVertical: 20,
    alignItems: "center",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  confirmationCodeScreen: {
    backgroundColor: Color.orange,
    flex: 1,
    width: "100%",
    height: 800,
    padding: 30,
  },
});

export default ConfirmationCodeScreen;
