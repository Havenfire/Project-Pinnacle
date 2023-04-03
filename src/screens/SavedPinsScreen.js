import * as React from "react";
import { Pressable, Image, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PinButtonsScrollable from "../components/PinButtonsScrollable";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const SavedPinsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.savedPinsScreen}>
      <View style={styles.backButtonLightParent}>
        <Pressable
          style={styles.backButtonLight}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require("../assets/back-button-light.png")}
          />
        </Pressable>
        <Text style={styles.savedPins}>Saved Pins</Text>
      </View>
      <PinButtonsScrollable
        onFramePressablePress={() => {}}
        onFramePressablePress1={() => {}}
        onFramePressablePress2={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mt16: {
    marginTop: 16,
  },
  icon: {
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  backButtonLight: {
    width: 30,
    height: 30,
  },
  savedPins: {
    fontSize: FontSize.size_19xl,
    fontWeight: "800",
    fontFamily: FontFamily.montserratExtrabold,
    color: Color.black,
    textAlign: "left",
  },
  backButtonLightParent: {
    alignSelf: "stretch",
    flexDirection: "row",
    padding: Padding.p_3xs,
    justifyContent: "space-between",
    alignItems: "center",
  },
  savedPinsScreen: {
    backgroundColor: Color.white,
    flex: 1,
    height: 800,
    padding: Padding.p_base,
    alignItems: "center",
    width: "100%",
  },
});

export default SavedPinsScreen;
