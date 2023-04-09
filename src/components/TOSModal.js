import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

const TOSModal = () => {
  return (
    <View style={styles.tosModal}>
      <Text style={styles.termsOfServiceContainer}>
        <Text style={styles.termsOfService}>
          {"TERMS OF SERVICE\n"}
        </Text>
        <Text style={styles.loremIpsumDolor}>
          {"\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  termsOfService: {
    fontFamily: FontFamily.montserratExtrabold,
    fontSize: 20,
  },
  loremIpsumDolor: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: 14,
  },
  termsOfServiceContainer: {
    alignSelf: "stretch",
    fontSize: FontSize.size_base,
    color: Color.black,
    textAlign: "left",
  },
  tosModal: {
    borderRadius: Border.br_12xl_5,
    backgroundColor: Color.lightText,
    width: 360,
    padding: Padding.p_xl,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

export default TOSModal;
