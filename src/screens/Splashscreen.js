import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Splashscreen = () => {
  return (
    <LinearGradient
      style={[styles.splashscreen, styles.splashscreenFlexBox]}
      locations={[0, 1]}
      colors={["rgba(255, 190, 0, 0.46)", "rgba(255, 190, 0, 0)"]}
    >
      <Text style={[styles.projectPinnacle, styles.splashscreenFlexBox]}>
        Project Pinnacle
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  splashscreenFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  projectPinnacle: {
    alignSelf: "stretch",
    fontSize: FontSize.size_13xl,
    fontWeight: "900",
    fontFamily: FontFamily.montserratBlack,
    color: Color.whitesmoke_100,
    textAlign: "center",
    display: "flex",
  },
  splashscreen: {
    backgroundColor: '#5DB45B',
    width: "100%",
    height: 800,
    flexDirection: "row",
    padding: Padding.p_3xs,
  },
});

export default Splashscreen;
