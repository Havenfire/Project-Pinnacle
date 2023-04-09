import * as React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Padding } from "../GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";

const DrawerMenu = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.drawerMenu}>
            <View style={styles.ellipseParent}>
                <Image
                    style={styles.frameChild}
                    resizeMode="cover"
                    source={require("../assets/ellipse-2.png")}
                />
                <Text style={styles.username487PtsContainer}>
                    <Text style={styles.username487PtsContainer1}>
                        <Text style={styles.savedTypo}>{`USERNAME\n`}</Text>
                        <Text style={styles.pts}>487 PTS</Text>
                    </Text>
                </Text>
            </View>
            <View style={styles.frameParent}>
                <TouchableOpacity
                    style={[styles.savedParent, styles.parentFlexBox]}
                    activeOpacity={0.2}
                    onPress={() => navigation.navigate("SavedPinsScreen")}
                >
                    <Text style={[styles.saved, styles.savedTypo]}>Saved</Text>
                    <Image
                        style={[styles.iconHeart, styles.iconLayout]}
                        resizeMode="cover"
                        source={require("../assets/-icon-heart.png")}
                    />
                </TouchableOpacity>
                <Image
                    style={[styles.frameItem, styles.frameItemSpaceBlock]}
                    resizeMode="cover"
                    source={require("../assets/vector-2.png")}
                />
                <TouchableOpacity
                    style={[styles.historyParent, styles.frameItemSpaceBlock]}
                    activeOpacity={0.2}
                    onPress={() => navigation.navigate("YourPinsScreen")}
                >
                    <Text style={[styles.saved, styles.savedTypo]}>History</Text>
                    <Image
                        style={[styles.iconClock, styles.iconLayout]}
                        resizeMode="cover"
                        source={require("../assets/-icon-clock.png")}
                    />
                </TouchableOpacity>
                <Image
                    style={[styles.frameItem, styles.frameItemSpaceBlock]}
                    resizeMode="cover"
                    source={require("../assets/vector-2.png")}
                />
                <TouchableOpacity
                    style={[styles.historyParent, styles.frameItemSpaceBlock]}
                    activeOpacity={0.2}
                    onPress={() => navigation.navigate("SettingsMenu")}
                >
                    <Text style={[styles.saved, styles.savedTypo]}>Settings</Text>
                    <Image
                        style={[styles.iconClock, styles.iconLayout]}
                        resizeMode="cover"
                        source={require("../assets/-icon-cog.png")}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    parentFlexBox: {
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
    },
    savedTypo: {
        fontFamily: FontFamily.montserratRegular,
        fontSize: FontSize.size_xl,
    },
    iconLayout: {
        width: 30,
        marginLeft: 16,
    },
    frameItemSpaceBlock: {
        marginTop: 14,
        alignSelf: "stretch",
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
        marginLeft: 16,
        color: Color.black,
        alignItems: "center",
        flex: 1,
    },
    ellipseParent: {
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
    },
    saved: {
        textAlign: "right",
        color: Color.black,
        fontSize: FontSize.size_xl,
        flex: 1,
    },
    iconHeart: {
        height: 26,
    },
    savedParent: {
        alignSelf: "stretch",
    },
    frameItem: {
        maxWidth: "100%",
        overflow: "hidden",
        height: 2,
        width: "100%",
        marginTop: 14,
    },
    iconClock: {
        height: 30,
    },
    historyParent: {
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
    },
    frameParent: {
        alignItems: "flex-end",
        justifyContent: "center",
        alignSelf: "stretch",
    },
    drawerMenu: {
        backgroundColor: Color.white,
        height: 800,
        padding: Padding.p_base,
        justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        width: "100%",
    },
    container: {
        flex: 1,
    }
});

export default DrawerMenu;
