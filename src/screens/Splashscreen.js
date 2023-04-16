import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Splashscreen = () => {
  return (
    <LinearGradient
      style={[styles.container]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={["#B7BA44", "#5DB45B"]}
    >
      <Text style={[styles.projectPinnacle]}>
        {`Project\nPinnacle`}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  projectPinnacle: {
    alignSelf: "stretch",
    fontSize: FontSize.size_19xl,
    fontFamily: FontFamily.montserratBlack,
    color: Color.lightText,
    textAlign: "center",
  },
});

export default Splashscreen;
