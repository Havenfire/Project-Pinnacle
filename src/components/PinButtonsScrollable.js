import * as React from "react";
import {
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const PinButtonsScrollable = ({
  onFramePressablePress,
  onFramePressablePress1,
  onFramePressablePress2,
}) => {
  return (
    <ScrollView
      style={[styles.frameParent, styles.mt16]}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.frameScrollViewContent}
    >
      <Pressable style={styles.rectangleParent} onPress={onFramePressablePress}>
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={require("../assets/rectangle-9.png")}
        />
        <View style={[styles.artistsAlleyParent, styles.ml16]}>
          <Text style={[styles.artistsAlley, styles.artistsAlleyFlexBox]}>
            Artist’s Alley
          </Text>
          <View style={[styles.rectangleParent, styles.mt5]}>
            <Image
              style={styles.frameItem}
              resizeMode="cover"
              source={require("../assets/ellipse-4.png")}
            />
            <Text
              style={[
                styles.coolskeleton95,
                styles.ml2,
                styles.artistsAlleyFlexBox,
              ]}
            >
              coolskeleton95
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        style={[styles.rectangleParent, styles.mt16]}
        onPress={onFramePressablePress1}
      >
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={require("../assets/rectangle-10.png")}
        />
        <View style={[styles.artistsAlleyParent, styles.ml16]}>
          <Text style={[styles.artistsAlley, styles.artistsAlleyFlexBox]}>
            Artist’s Alley: The Sequel
          </Text>
          <View style={[styles.rectangleParent, styles.mt5]}>
            <Image
              style={styles.frameItem}
              resizeMode="cover"
              source={require("../assets/ellipse-41.png")}
            />
            <Text
              style={[
                styles.coolskeleton95,
                styles.ml2,
                styles.artistsAlleyFlexBox,
              ]}
            >
              coolskeleton96
            </Text>
          </View>
        </View>
      </Pressable>
      <Pressable
        style={[styles.rectangleParent, styles.mt16]}
        onPress={onFramePressablePress2}
      >
        <Image
          style={styles.frameChild}
          resizeMode="cover"
          source={require("../assets/rectangle-11.png")}
        />
        <View style={[styles.artistsAlleyParent, styles.ml16]}>
          <Text style={[styles.artistsAlley, styles.artistsAlleyFlexBox]}>
            Artist’s Alley 3: The Artisting
          </Text>
          <View style={[styles.rectangleParent, styles.mt5]}>
            <Image
              style={styles.frameItem}
              resizeMode="cover"
              source={require("../assets/ellipse-41.png")}
            />
            <Text
              style={[
                styles.coolskeleton95,
                styles.ml2,
                styles.artistsAlleyFlexBox,
              ]}
            >
              coolskeleton97
            </Text>
          </View>
        </View>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ml2: {
    marginLeft: 2,
  },
  mt5: {
    marginTop: 5,
  },
  ml16: {
    marginLeft: 16,
  },
  mt16: {
    marginTop: 16,
  },
  frameScrollViewContent: {
    flexDirection: "column",
  },
  artistsAlleyFlexBox: {
    textAlign: "left",
    color: Color.black,
  },
  frameChild: {
    borderRadius: Border.br_3xs,
    width: 152,
    height: 105,
  },
  artistsAlley: {
    fontSize: FontSize.size_sm,
    fontWeight: "800",
    fontFamily: FontFamily.montserratExtrabold,
    alignSelf: "stretch",
  },
  frameItem: {
    width: 30,
    height: 30,
  },
  coolskeleton95: {
    fontSize: FontSize.size_xs,
    fontWeight: "300",
    fontFamily: FontFamily.montserratLight,
    flex: 1,
  },
  rectangleParent: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
  },
  artistsAlleyParent: {
    width: 121,
    justifyContent: "center",
  },
  frameParent: {
    flex: 1,
    alignSelf: "stretch",
  },
});

export default PinButtonsScrollable;
