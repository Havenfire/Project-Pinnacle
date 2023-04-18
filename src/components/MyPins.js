import * as React from "react";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import { Color, FontFamily } from "../GlobalStyles";

const MyPinsList = ({ pinList }) => {
    return (
        <ScrollView style={[styles.scrollView]}>
            <View style={styles.itemList}>
                {pinList.length > 0
                    ? <View>
                        {pinList.map((pin) => {
                            return (
                                <View style={styles.itemView}>
                                    <Image style={styles.itemImage} resizeMode="cover" source={{ uri: pin.image }} />
                                    <View style={[styles.itemDetails]}>
                                        <Text style={[styles.itemTitle]}>
                                            {pin.title}
                                        </Text>
                                        <Text style={[styles.itemDescription]}>
                                            {pin.description}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                    : <View style={styles.textContainer}>
                        <Text style={styles.noPinsText}>
                            No pins placed on the map yet!
                        </Text>
                    </View>}
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        alignSelf: "stretch",
    },
    itemList: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch",
    },
    itemView: {
        // flex: 1,
        flexDirection: "row",
        marginVertical: "5%",
    },
    itemImage: {
        borderRadius: 15,
        width: 170,
        height: 105,
    },
    itemTitle: {
        fontSize: 20,
        fontFamily: FontFamily.montserratExtrabold,
        color: Color.darkText,
    },
    itemDescription: {
        fontSize: 14,
        fontFamily: FontFamily.montserratLight,
        paddingTop: "1%",
        flex: 1,
    },
    itemDetails: {
        // alignItems: "left",
        marginLeft: "5%",
        flexDirection: "column",
        justifyContent: "space-between",
        flexShrink: 1,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noPinsText: {
        fontSize: 20,
        fontFamily: FontFamily.montserratLight,
        color: Color.darkText,
    },
});

export default MyPinsList;
