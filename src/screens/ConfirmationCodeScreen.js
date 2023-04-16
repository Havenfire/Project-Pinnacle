import * as React from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { useRoute } from "@react-navigation/native";

const ConfirmationCodeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const username = route.params.user.user.username;
  const [code, setCode] = React.useState('');

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
      navigation.navigate("DefaultMap", { username });
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
          placeholderTextColor="rgba(36, 28, 28, 0.6)"
          maxLength={6}
          onChangeText={setCode}
        />

        <Pressable
          style={[styles.buttonSolid, styles.mt44, styles.buttonSolidFlexBox]}
          onPress={confirmSignUp}
        >
          <Text style={styles.buttonText}>LET’S GO</Text>
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
    fontSize: FontSize.size_13xl,
    fontWeight: "600",
    fontFamily: FontFamily.montserratSemibold,
    color: Color.black,
    textAlign: "center",
    width: 300,
  },
  pleaseEnterTheConfirmationWrapper: {
    padding: Padding.p_3xs,
    flexDirection: "row",
  },
  confirmationCodeScreenChild: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  buttonText: {
    fontSize: FontSize.size_base,
    fontWeight: "800",
    fontFamily: FontFamily.montserratExtrabold,
    color: Color.lightButtonText,
    textAlign: "left",
  },
  buttonSolid: {

    borderRadius: Border.br_12xl_5,
    backgroundColor: Color.black,
    height: 60,
    paddingHorizontal: Padding.p_6xl,
    paddingVertical: Padding.p_base,
    width: 300,
    flexDirection: "row",
  },
  confirmationCodeScreen: {
    backgroundColor: Color.orange,
    flex: 1,
    width: "100%",
    height: 800,
    padding: Padding.p_11xl,
  },
});

export default ConfirmationCodeScreen;
