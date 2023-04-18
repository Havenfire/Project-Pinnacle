import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Color } from "../GlobalStyles";

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
    fontSize: 38,
    fontFamily: FontFamily.montserratBlack,
    color: Color.lightText,
    textAlign: "center",
  },
});

export default Splashscreen;
