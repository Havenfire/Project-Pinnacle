import * as React from "react";
import {
  Pressable,
  StyleProp,
  ViewStyle,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";

const FrameComponent = ({ style }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.settingsParent, style]}
      onPress={() => navigation.navigate("SettingsMenu")}
    >
      <Text style={styles.settings}>Settings</Text>
      <Image
        style={[styles.iconCog, styles.ml16]}
        resizeMode="cover"
        source={require("../assets/-icon-cog.png")}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ml16: {
    marginLeft: 16,
  },
  settings: {
    flex: 1,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.montserratRegular,
    color: Color.black,
    textAlign: "right",
  },
  iconCog: {
    width: 30,
    height: 30,
  },
  settingsParent: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default FrameComponent;
