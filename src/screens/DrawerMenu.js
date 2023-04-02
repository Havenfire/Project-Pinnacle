import React, { useState } from "react";
import FrameComponent2 from "../components/Frame16";
import FrameComponent1 from "../components/Frame14";
import FrameComponent from "../components/Frame15";
import { Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize, Padding } from "../GlobalStyles";

const DrawerMenu = ({ state, navigation }) => {
  const [drawerItemsNormal] = useState([
    <FrameComponent2 style={styles.mt14} />,
    <FrameComponent1 style={styles.mt14} />,
    <FrameComponent style={styles.mt14} />,
  ]);
  const [drawerItemsActive] = useState([
    <FrameComponent2 style={styles.mt14} />,
    <FrameComponent1 style={styles.mt14} />,
    <FrameComponent style={styles.mt14} />,
  ]);
  const stateIndex = !state ? 0 : state.index;
  return (
    <View style={styles.drawerMenu}>
      <View style={styles.parentFlexBox}>
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={require("../assets/ellipse-2.png")}
        />
        <Text
          style={[styles.username487PtsContainer, styles.ml16, styles.savedClr]}
        >
          <Text style={styles.username487PtsContainer1}>
            <Text style={styles.savedTypo}>{`USERNAME
`}</Text>
            <Text style={styles.pts}>487 PTS</Text>
          </Text>
        </Text>
      </View>
      <View style={styles.frameParent}>
        {stateIndex === 0 ? drawerItemsActive[0] : drawerItemsNormal[0]}
        <Image
          style={[styles.frameItem, styles.mt14]}
          resizeMode="cover"
          source={require("../assets/vector-21.png")}
        />
        {stateIndex === 1 ? drawerItemsActive[1] : drawerItemsNormal[1]}
        <Image
          style={[styles.frameItem, styles.mt14]}
          resizeMode="cover"
          source={require("../assets/vector-21.png")}
        />
        {stateIndex === 2 ? drawerItemsActive[2] : drawerItemsNormal[2]}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ml16: {
    marginLeft: 16,
  },
  mt14: {
    marginTop: 14,
  },
  savedClr: {
    color: Color.black,
    flex: 1,
  },
  parentFlexBox: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  savedTypo: {
    fontFamily: FontFamily.montserratRegular,
    fontSize: FontSize.size_xl,
  },
  frameChild: {
    width: 80,
    height: 80,
  },
  pts: {
    fontSize: FontSize.size_19xl,
    fontWeight: "800",
    fontFamily: FontFamily.montserratExtrabold,
  },
  username487PtsContainer1: {
    lineBreak: "anywhere",
  },
  username487PtsContainer: {
    textAlign: "left",
    display: "flex",
    height: 74,
    alignItems: "center",
  },
  frameItem: {
    maxWidth: "100%",
    overflow: "hidden",
    height: 2,
    width: "100%",
    alignSelf: "stretch",
  },
  frameParent: {
    alignItems: "flex-end",
    justifyContent: "center",
    alignSelf: "stretch",
  },
  drawerMenu: {
    backgroundColor: Color.white,
    width: 320,
    height: 800,
    padding: Padding.p_base,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default DrawerMenu;
