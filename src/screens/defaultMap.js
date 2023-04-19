import React, { Component } from "react";
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Dimensions,
    Alert,
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import MapView from "react-native-map-clustering";
import Camera from "./camera";
import { Svg, Image as ImageSvg } from "react-native-svg";
import mapStyle from "../themes/mapStyle.json";
// import mapStyleDark from "../themes/mapStyleDark.json";

import { FontFamily, Color } from "../GlobalStyles";

import { Storage } from "@aws-amplify/storage";
import { DataStore } from "@aws-amplify/datastore";
import { Pin } from "../models";
import { DialogModal } from "../components/DialogModal";

const statusBarHeight = Constants.statusBarHeight;
const sleep = ms => new Promise(r => setTimeout(r, ms));
export default class DefaultMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: {
                latitude: 33.797187,
                longitude: -84.322187,
                latitudeDelta: 0.1,
                longitudeDelta: 0.05,
            },
            locationResult: null,
            location: {
                coords: {
                    latitude: 33.797187,
                    longitude: -84.322187,
                    accuracy: 25,
                },
            },
            pins: [],
            my_pins: [],
            models: [],
            showAddPinDialog: false,
            showConfirmPinDialog: false,
            tempTitle: null,
            tempDescription: null,
            tempCoordinate: null,
            tempPinCoordinate: null,
            tempImage: null,
            modalPin: null,
            showPinModal: false,
            photo: null,
            username: null,
            theme: mapStyle,
        };
        const route = this.props.route;

        this.state.username = route.params.nav_username;
        this.mapRef = React.createRef();
    }

    async addPin(coordinate, title, description, image, dummy) {
        if (coordinate && title) {
            if (dummy) {
                this.state.dummyPin = {
                    coordinate: {
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                    },
                    title: title,
                    description: description ? description : undefined,
                    image: image ? image : undefined,
                    username: this.state.username,
                };
            } else {
                delete this.state.dummyPin;
                const pin = {
                    coordinate: {
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                    },
                    title: title,
                    description: description ? description : undefined,
                    image: image ? image : undefined,
                    username: this.state.username,
                }
                this.state.pins.push(pin);
                this.state.my_pins.push(pin);
            }

            if (!dummy) {
                const filename = `${coordinate.latitude}_${coordinate.longitude}.jpeg`;
                this.uploadImageToS3(filename, image);
                const newPin = await DataStore.save(
                    new Pin({
                        "title": title,
                        "description": description,
                        "coordinates": [coordinate.latitude, coordinate.longitude],
                        "reputation": 0,
                        "image_uri": filename,
                        "username": this.state.username,
                    })
                );
                this.state.models.push(newPin);
            }
            this.forceUpdate();
        }
        return this.state.pins;
    }

    async uploadImageToS3(img_name, imageUri) {
        const key = img_name;
        const contentType = "image/jpeg";

        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            await Storage.put(key, blob, { contentType });
            console.log("Image uploaded successfully");
        } catch (error) {
            console.log("Error uploading image:", error);
        }
    }

    async loadAllPins() {

        DataStore.clear();
        await sleep(2500);
        DataStore.start();
        await sleep(2500);

        try {
            this.state.models = await DataStore.query(Pin);
        } catch (error) {
            console.log('Error retrieving pins', error);
        }

        for (var i = 0; i < this.state.models.length; i++) {
            var current_pin = this.state.models[i];
            var img_from_storage = await Storage.get(current_pin["image_uri"], {
                level: "public",
            });
            this.state.pins.push({
                coordinate: {
                    latitude: current_pin["coordinates"][0],
                    longitude: current_pin["coordinates"][1],
                },
                title: current_pin["title"],
                description: current_pin["description"],
                image: img_from_storage,
                username: current_pin["username"],
            });

            if (current_pin.username === this.state.username) {
                this.state.my_pins.push({
                    coordinate: {
                        latitude: current_pin["coordinates"][0],
                        longitude: current_pin["coordinates"][1],
                    },
                    title: current_pin["title"],
                    description: current_pin["description"],
                    image: img_from_storage,
                    username: current_pin["username"],
                });
            }
            console.log("Loaded pin: ", current_pin);
        }
        this.forceUpdate();
    }

    async deletePin(pin) {
        this.state.showPinModal = false;
        JSON.stringify(pin);

        let pin_ID = "";
        let index = 0;

        for (index = 0; index < this.state.models.length; index++) {
            if (this.state.models[index].coordinates[0] === pin.coordinate.latitude &&
                this.state.models[index].coordinates[1] === pin.coordinate.longitude) {
                pin_ID = this.state.models[index].id;
                break;
            }
        }

        //removed from local list
        const dead_pin = this.state.pins.splice(index, 1)[0];
        const filename = `${dead_pin.coordinate.latitude}_${dead_pin.coordinate.longitude}.jpeg`;

        // remove from my pins list
        for (index = 0; index < this.state.my_pins.length; index++) {
            if (this.state.my_pins[index].coordinate.longitude === dead_pin.coordinate.longitude &&
                this.state.my_pins[index].coordinate.latitude === dead_pin.coordinate.latitude) {
                this.state.my_pins.splice(index, 1);
                break;
            }
        }

        //remove from storage
        await Storage.remove(filename);

        // remove from server
        const pinToDelete = await DataStore.query(Pin, pin_ID);
        DataStore.delete(pinToDelete);
        this.forceUpdate();
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        this.loadAllPins();
        this._getLocationAsync();
    }

    _handleMapRegionChange = (mapRegion) => {
        this.setState({ mapRegion });
    };

    //here
    _getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            this.setState({
                locationResult: "Permission to access location was denied",
                location,
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location), location });
        this.forceUpdate();
    };

    localGetPinInfo = async () => {
        this._getLocationAsync();
        let camera = new Camera();
        await camera.takePhoto();
        this.setState({ photo: camera.state.photo });

        if (this.state.photo) {
            this.setState({ showAddPinDialog: true });
        }
    };

    handleDialogueInputs = (title, description) => {
        if (!title) {
            Alert.alert("Please enter a title");
            return;
        } else {
            this.dismissAddPinDialog();
        }
        this.setState({ tempTitle: title });
        this.setState({ tempTitle: description });
        this.setState({ showAddPinDialog: false });
        this.addPin(
            //test
            this.state.location.coords,
            this.state.tempTitle,
            this.state.tempDescription,
            this.state.photo,
            true
        );
        this.setState({
            tempTitle: null,
            tempDescription: null,
            tempCoordinate: null,
            photo: null,
        });
    };

    dismissAddPinDialog = () => {
        this.setState({ showAddPinDialog: false });
    };

    dismissConfirmPinDialog = () => {
        this.setState({ showConfirmPinDialog: false });
    };


    calculateDistance = (coordinate1, coordinate2) => {
        const earthRadius = 6378137; // in meters
        const dLat = this.toRadians(coordinate2.latitude - coordinate1.latitude);
        const dLon = this.toRadians(coordinate2.longitude - coordinate1.longitude);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(coordinate1.latitude)) *
            Math.cos(this.toRadians(coordinate2.latitude)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;
        return distance;
    };

    toRadians = (angle) => {
        return (angle * Math.PI) / 180;
    };

    deleteDummyPin = (coord) => {
        const dummyPinIndex = this.state.pins.findIndex((dummy) => {
            return (
                Math.abs(dummy.coordinate.latitude - coord.latitude) < 1e-9 &&
                Math.abs(dummy.coordinate.longitude - coord.longitude) < 1e-9
            );
        });
        if (dummyPinIndex > -1) {
            this.state.pins.splice(dummyPinIndex, 1);
        }
        this.forceUpdate();
    };

    confirmAddPin = (confirmed) => {
        if (confirmed) {
            this.addPin(
                this.state.tempCoordinate,
                this.state.tempTitle,
                this.state.tempDescription,
                this.state.tempImage,
                false
            );
            this.deleteDummyPin(this.state.tempPinCoordinate);
        }
        this.dismissConfirmPinDialog();
    };

    drawDummyPin = () => {
        let pin = this.state.dummyPin;
        return (
            <React.Fragment>
                <Marker
                    coordinate={pin.coordinate}
                    draggable={true}
                    onDragEnd={(e) => {
                        const distance = this.calculateDistance(pin.coordinate, e.nativeEvent.coordinate);
                        if (distance >= 100) {
                            alert("The pin must stay within the red circle.");
                        } else {
                            this.setState({
                                showConfirmPinDialog: true,
                                tempCoordinate: e.nativeEvent.coordinate,
                                tempTitle: pin.title,
                                tempDescription: pin.description,
                                tempImage: pin.image,
                                tempPinCoordinate: pin.coordinate,
                            });
                        }
                    }}></Marker>
                <Circle
                    center={pin.coordinate}
                    radius={100}
                    fillColor={"rgba(255, 0, 0, 0.2)"}
                    strokeColor={"rgba(255, 0, 0, 0.5)"}
                    strokeWidth={2}
                />
            </React.Fragment>
        );
    };

    showPinPopup = (pin) => {
        this.setState({ modalPin: pin });
        this.setState({ showPinModal: true });
    };

    animatetoCL() {
        let r = {
            latitude: this.state.location.coords.latitude,
            longitude: this.state.location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.005,
        };
        this.mapRef.current.animateToRegion(r);
    }

    onUserLocationChange = () => {
        this._getLocationAsync();
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    toolbarEnabled={false}
                    ref={this.mapRef}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={this.state.theme}
                    mapPadding={{ left: 0, right: 0, top: 0, bottom: 24 }}
                    region={{
                        latitude: this.state.location.coords.latitude,
                        longitude: this.state.location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.005,
                    }}
                    radius={Dimensions.get("window").width * 0.1}
                    onRegionChange={this._handleMapRegionChange}
                    onMarkerPress={() => this.setState({ showAddPinDialog: false })}>
                    {this.state.dummyPin ? this.drawDummyPin() : null}
                    {this.state.pins
                        ? this.state.pins.map((pin) => {
                            return (
                                <Marker
                                    coordinate={pin.coordinate}
                                    onPress={() => {
                                        this.showPinPopup(pin);
                                    }}></Marker>
                            );
                        })
                        : null}
                </MapView>

                <View style={[styles.navBar, styles.iconHeartParent, styles.parentFlexBox, styles.parentFlexBox1]}>
                    <TouchableOpacity // saved pins heart button
                        style={styles.iconHeart}
                        activeOpacity={0.2}
                        onPress={() => {
                            if (this.state.dummyPin) return;
                            this.props.navigation.navigate("SavedPinsScreen", { my_pins: this.state.my_pins });
                        }}>
                        <Image style={styles.icon} resizeMode="cover" source={require("../assets/-icon-heart-dark.png")} />
                    </TouchableOpacity>

                    <TouchableOpacity // add pin plus button
                        style={styles.iconCircleX}
                        activeOpacity={0.2}
                        onPress={() => {
                            if (this.state.dummyPin) return;
                            this.localGetPinInfo();
                        }}>
                        <Image style={styles.icon} resizeMode="cover" source={require("../assets/-icon-circle-dark.png")} />
                    </TouchableOpacity>

                    <TouchableOpacity // jump to current location button
                        style={styles.iconLocation}
                        activeOpacity={0.2}
                        onPress={() => {
                            if (this.state.dummyPin) return;
                            this.animatetoCL();
                        }}>
                        <Image style={styles.icon} resizeMode="cover" source={require("../assets/-icon-location-dark.png")} />
                    </TouchableOpacity>
                </View>

                {/* add pin dialog */}
                <DialogModal isVisible={this.state.showAddPinDialog}>
                    <DialogModal.Container style={styles.dialog}>
                        <View>
                            <DialogModal.Header title="Create a Pin" />
                            <DialogModal.Body>
                                <Text style={styles.dialogTitleText}>Title</Text>
                                <TextInput
                                    style={[styles.dialogTextInput, styles.dialogBodyText]}
                                    placeholder="Title"
                                    placeholderTextColor={Color.darkButtonText}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onChangeText={(title) => this.setState({ tempTitle: title })}
                                />
                            </DialogModal.Body>
                            <DialogModal.Body>
                                <Text style={styles.dialogTitleText}>Description</Text>
                                <TextInput
                                    style={[styles.dialogTextInput, styles.dialogBodyText]}
                                    placeholder="Description (optional)"
                                    placeholderTextColor={Color.darkButtonText}
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onChangeText={(description) => this.setState({ tempDescription: description })}
                                />
                            </DialogModal.Body>
                            <DialogModal.Footer>
                                <View style={styles.dialogButtonContainer}>
                                    <TouchableOpacity
                                        style={[styles.dialogButton, styles.dialogButtonCancel]}
                                        onPress={this.dismissAddPinDialog}>
                                        <Text style={styles.dialogButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.dialogButton, styles.dialogButtonConfirm]}
                                        onPress={this.handleDialogueInputs}>
                                        <Text style={styles.dialogButtonText}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </DialogModal.Footer>
                        </View>
                    </DialogModal.Container>
                </DialogModal>

                {/* confirm dialog */}
                <DialogModal isVisible={this.state.showConfirmPinDialog}>
                    <DialogModal.Container style={styles.dialog}>
                        <View>
                            <DialogModal.Header title="Confirm Location" />
                            <DialogModal.Footer>
                                <View style={styles.dialogButtonContainer}>
                                    <TouchableOpacity
                                        style={[styles.dialogButton, styles.dialogButtonCancel]}
                                        onPress={() => {
                                            this.confirmAddPin(false);
                                        }}>
                                        <Text style={styles.dialogButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.dialogButton, styles.dialogButtonConfirm]}
                                        onPress={() => {
                                            this.confirmAddPin(true);
                                        }}>
                                        <Text style={styles.dialogButtonText}>OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </DialogModal.Footer>
                        </View>
                    </DialogModal.Container>
                </DialogModal>

                {/* pin info dialog */}
                <DialogModal isVisible={this.state.showPinModal}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.setState({ showPinModal: false });
                        }}>
                        <View style={styles.modalOverlay} />
                    </TouchableWithoutFeedback>
                    <DialogModal.Container style={styles.dialog}>
                        {this.state.modalPin ? (
                            <View>
                                {this.state.modalPin.title ? <DialogModal.Header title={this.state.modalPin.title} /> : null}
                                {this.state.modalPin.description ? (
                                    <DialogModal.Body>
                                        <Text style={styles.dialogBodyText}>{this.state.modalPin.description}</Text>
                                    </DialogModal.Body>
                                ) : null}
                                {this.state.modalPin.image ? (
                                    <DialogModal.Body>
                                        <Svg width={"100%"} height={200}>
                                            <ImageSvg
                                                width={"100%"}
                                                height={"100%"}
                                                preserveAspectRatio="xMidYMid slice"
                                                href={{ uri: this.state.modalPin.image ? this.state.modalPin.image : null }}
                                            />
                                        </Svg>
                                    </DialogModal.Body>
                                ) : null}

                                {this.state.modalPin.username == this.state.username ? (
                                    <DialogModal.Footer>
                                        <View style={styles.dialogButtonContainer}>
                                            <TouchableOpacity
                                                style={[styles.dialogButton, styles.dialogButtonCancel]}
                                                onPress={() => {
                                                    this.deletePin(this.state.modalPin);
                                                }}>
                                                <Text style={styles.dialogButtonText}>Delete</Text>
                                            </TouchableOpacity>

                                        </View>
                                    </DialogModal.Footer>
                                ) : null}

                            </View>
                        ) : null}
                    </DialogModal.Container>
                </DialogModal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },

    titleBar: {
        position: "absolute",
        top: statusBarHeight,
        left: 0,
        right: 0,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        // paddingVertical: "5%",
    },

    navBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        paddingVertical: "5%",
    },
    ml16: {
        marginLeft: 16,
    },
    parentFlexBox1: {
        alignSelf: "stretch",
        flexDirection: "row",
    },
    parentFlexBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    expandedSearchBar: {
        borderRadius: 32,
        backgroundColor: "rgba(12, 12, 12, 0.5)",
        height: 42,
        paddingHorizontal: 13,
        paddingVertical: 5,
        flexDirection: "row",
        flex: 1,
    },
    icon: {
        height: "100%",
        width: "100%",
    },
    iconMenu: {
        height: 30,
        width: 30,
    },
    iconHeart: {
        height: 26,
        width: 30,
    },
    iconCircleX: {
        width: 65,
        height: 65,
    },
    iconLocation: {
        height: 30,
        width: 30,
    },
    iconHeartParent: {
        justifyContent: "space-between",
    },
    homePageOverlay: {
        backgroundColor: "transparent",
        height: 800,
        padding: 16,
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        flex: 1,
    },

    dialog: {
        width: "90%",
        height: "80%",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    dialogTitleText: {
        fontFamily: FontFamily.montserratSemibold,
        fontSize: 18,
        color: Color.darkText,
    },
    dialogBodyText: {
        fontFamily: FontFamily.montserratRegular,
        fontSize: 16,
        color: Color.darkText,
    },
    dialogTextInput: {
        paddingTop: 10,
        borderColor: Color.darkButtonText,
        borderBottomWidth: 2,
    },
    dialogButtonContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-around",
    },
    dialogButton: {
        paddingVertical: 10,
        borderRadius: 25,
        width: "35%",
        alignItems: "center",
    },
    dialogButtonConfirm: {
        backgroundColor: Color.teal,
    },
    dialogButtonCancel: {
        backgroundColor: Color.orange,
    },
    dialogButtonText: {
        color: Color.darkText,
        fontFamily: FontFamily.montserratSemibold,
        fontSize: 18,
    },
    modalOverlay: {
        position: "absolute",
        top: -50,
        bottom: -50,
        left: -50,
        right: -50,
    },
});
