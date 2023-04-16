import * as React from "react";
import { ScrollView, Pressable, Image, StyleSheet, Text, View } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const PinButtonsScrollable = ({ pinList }) => {
    return (
        <ScrollView
            style={[styles.frameParent, styles.mt16]}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.frameScrollViewContent}>
            <View style={styles.rectangleParent}>
                {pinList
                    ? pinList.map((pin) => {
                        return (
                            <React.Fragment>
                                <Image style={styles.frameChild} resizeMode="cover" source={pin.image} />
                                <View style={[styles.artistsAlleyParent, styles.ml16]}>
                                    <Text style={[styles.artistsAlley, styles.artistsAlleyFlexBox]}>{pin.title}</Text>
                                    <View style={[styles.rectangleParent, styles.mt5]}>
                                        <Text style={[styles.coolskeleton95, styles.ml2, styles.artistsAlleyFlexBox]}>
                                            {pin.description}
                                        </Text>
                                    </View>
                                </View>
                            </React.Fragment>
                        );
                    })
                    : null}
            </View>
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
