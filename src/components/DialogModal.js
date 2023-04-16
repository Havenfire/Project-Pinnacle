import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RNModal from "react-native-modal";
import { FontFamily, Color } from "../GlobalStyles";

export const DialogModal = ({ isVisible = false, children, ...props }) => {
    return (
        <RNModal
            backdropOpacity={0}
            isVisible={isVisible}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
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
        backgroundColor: Color.lightDialog,
        borderRadius: 25,
    },
    header: {
        alignItems: "center",
        justifyContent: "center",
    },
    headerText: {
        paddingVertical: 20,
        textAlign: "center",
        fontSize: 26,
        fontFamily: FontFamily.montserratExtrabold,
        color: Color.darkText,
    },
    body: {
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 20,
        color: Color.darkText,
    },
    footer: {
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 20,
        flexDirection: "row",
        color: Color.darkText,
    },
});

DialogModal.Header = ModalHeader;
DialogModal.Container = ModalContainer;
DialogModal.Body = ModalBody;
DialogModal.Footer = ModalFooter;
