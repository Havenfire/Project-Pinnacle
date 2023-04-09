import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RNModal from "react-native-modal";
import { FontFamily, Color } from "../GlobalStyles";

export const DialogModal = ({ isVisible = false, children, ...props }) => {
    return (
        <RNModal
            backdropOpacity={0}
            isVisible={isVisible}
            animationInTiming={500}
            animationOutTiming={500}
            backdropTransitionInTiming={300}
            backdropTransitionOutTiming={300}
            {...props}>
            {children}
        </RNModal>
    );
};

const ModalContainer = ({ children }) => <View style={styles.container}>{children}</View>;

const ModalHeader = ({ title }) => (
    <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
    </View>
);

const ModalBody = ({ children }) => <View style={styles.body}>{children}</View>;

const ModalFooter = ({ children }) => <View style={styles.footer}>{children}</View>;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.darkDialog,
        borderRadius: 25,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        paddingVertical: 30,
        textAlign: "center",
        fontSize: 26,
        fontFamily: FontFamily.montserratExtrabold,
        color: Color.lightText,
    },
    body: {
        justifyContent: "center",
        paddingHorizontal: 30,
        paddingBottom: 30,
        color: Color.lightText,
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
        flexDirection: "row",
        color: Color.lightText,
    },
});

DialogModal.Header = ModalHeader;
DialogModal.Container = ModalContainer;
DialogModal.Body = ModalBody;
DialogModal.Footer = ModalFooter;
