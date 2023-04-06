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

const FrameComponent1 = ({ style }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.historyParent, style]}
      onPress={() => navigation.navigate("YourPinsScreen")}
    >
      <Text style={styles.history}>History</Text>
      <Image
        style={[styles.iconClock, styles.ml16]}
        resizeMode="cover"
        source={require("../assets/-icon-clock.png")}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ml16: {
    marginLeft: 16,
  },
  history: {
    flex: 1,
    fontSize: FontSize.size_xl,
    fontFamily: FontFamily.montserratRegular,
    color: Color.black,
    textAlign: "right",
  },
  iconClock: {
    width: 30,
    height: 30,
  },
  historyParent: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default FrameComponent1;
