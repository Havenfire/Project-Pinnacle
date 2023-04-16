import * as React from "react";
import { Pressable, Image, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PinButtonsScrollable from "../components/PinButtonsScrollable";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";
import { useRoute } from "@react-navigation/native";

const SavedPinsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <SafeAreaView style={styles.savedPinsScreen}>
      <View style={styles.backButtonLightParent}>
        <Pressable
          style={styles.backButtonLight}
          onPress={() => navigation.goBack()}
        >
          <Image
            resizeMode="cover"
            source={require("../assets/back-button-light.png")}
          />
        </Pressable>
        <Text style={styles.savedPinsTitle}>Saved Pins</Text>
      </View>
      {/* <PinButtonsScrollable pinList={ navigation.my_pins } /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButtonLight: {
    width: 30,
    height: 30,
  },
  savedPinsTitle: {
    fontSize: FontSize.size_19xl,
    fontFamily: FontFamily.montserratExtrabold,
    color: Color.darkText,
    textAlign: "center",
  },
  backButtonLightParent: {
    alignSelf: "stretch",
    flexDirection: "row",
    padding: Padding.p_3xs,
    justifyContent: "space-between",
    alignItems: "center",
  },
  savedPinsScreen: {
    backgroundColor: "#f4f4f4",
    flex: 1,
    alignItems: "center",
    alignSelf: "center",
    width: "90%",
  },
});

export default SavedPinsScreen;
