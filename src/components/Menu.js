import * as React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { FontFamily, Color } from "../GlobalStyles";

const Menu = () => {
  return (
    <View style={[styles.frameParent, styles.mt16]}>
      <TouchableOpacity
        style={styles.wrapperFlexBox}
        activeOpacity={0.2}
        onPress={() => { }}
      >
        <Text style={styles.saved}>Saved</Text>
      </TouchableOpacity>
      <Image
        style={[styles.frameChild, styles.mt14]}
        resizeMode="cover"
        source={require("../assets/vector-2.png")}
      />
      <TouchableOpacity
        style={[styles.wrapperFlexBox, styles.mt14]}
        activeOpacity={0.2}
        onPress={() => { }}
      >
        <Text style={styles.saved}>History</Text>
      </TouchableOpacity>
      <Image
        style={[styles.frameChild, styles.mt14]}
        resizeMode="cover"
        source={require("../assets/vector-2.png")}
      />
      <TouchableOpacity
        style={[styles.settingsWrapper, styles.mt14, styles.wrapperFlexBox]}
        activeOpacity={0.2}
        onPress={() => { }}
      >
        <Text style={styles.saved}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mt14: {
    marginTop: 14,
  },
  wrapperFlexBox: {
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  saved: {
    flex: 1,
    fontSize: 20,
    fontFamily: FontFamily.montserratRegular,
    color: Color.black,
    textAlign: "left",
  },
  frameChild: {
    maxWidth: "100%",
    overflow: "hidden",
    height: 2,
    width: "100%",
    alignSelf: "stretch",
  },
  settingsWrapper: {
    justifyContent: "flex-end",
  },
  frameParent: {
    justifyContent: "center",
    alignSelf: "stretch",
  },
});

export default Menu;
