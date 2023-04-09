import React, { useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { DialogModal } from "./components/DialogModal";

export default function TabTwoScreen() {
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    useEffect(() => {
        const checkForSubscription = setTimeout(() => {
            setIsModalVisible(() => !isModalVisible);
        }, 1500);
        return () => clearTimeout(checkForSubscription);
    }, []);

    const handleSignUp = () => {
        // sign up the user and close the modal
        setIsModalVisible(() => !isModalVisible);
    };

    const handleDecline = () => setIsModalVisible(() => !isModalVisible);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Premium stuff here</Text>
            <View style={styles.separator} />
            <DialogModal isVisible={isModalVisible}>
                <DialogModal.Container>
                    <View style={styles.modal}>
                        <DialogModal.Header title="You're just one step away!" />
                        <DialogModal.Body>
                            <Text style={styles.text}>
                                Want access? We just need your email address
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="email"
                                keyboardType="email-address"
                            />
                        </DialogModal.Body>
                        <DialogModal.Footer>
                            <View style={styles.buttonAlign}>
                                <TouchableOpacity style={styles.button} onPress={onPress}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={onPress}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </DialogModal.Footer>
                    </View>
                </DialogModal.Container>
            </DialogModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    input: {
        paddingTop: 10,
        borderColor: "grey",
        borderBottomWidth: 2,
    },
    buttonAlign: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
    },
    modal: {
        width: "100%",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "blue",
        marginTop: 15,
        paddingVertical: 15,
        borderRadius: 25,
        width: "80%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 18,
    },
});