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

const FrameComponent2 = ({ style }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.savedParent, style]}
      onPress={() => navigation.navigate("SavedPinsScreen")}
    >
      <Text style={styles.saved}>Saved</Text>
      <Image
        style={[styles.iconHeart, styles.ml16]}
        resizeMode="cover"
        source={require("../assets/-icon-heart.png")}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ml16: {
    marginLeft: 16,
  },
  saved: {
    flex: 1,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.montserratRegular,
    color: Color.black,
    textAlign: "right",
  },
  iconHeart: {
    width: 30,
    height: 26,
  },
  savedParent: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default FrameComponent2;
