import React, { Component } from "react";
import { Text, View, StyleSheet, StatusBar, Button, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Dialog from "react-native-dialog";
import Camera from "./camera";
import { Svg, Image as ImageSvg } from 'react-native-svg';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import mapStyle from '../themes/mapStyle.json';
import mapStyleDark from '../themes/mapStyleDark.json';


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
            showDialog: false,
            tempTitle: null,
            tempDescription: null,
            tempCoordinate: null,
            photo: null,
            theme: mapStyle,
        };
    }
    addPin(coordinate, title, description, image) {
        if (coordinate && title && description) {
            this.state.pins = this.state.pins.concat({
                coordinate: {
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                },
                title: title,
                description: description,
                image: image ? image : undefined,
            });
        }
        return this.state.pins;
    }

    componentDidMount() {
        StatusBar.setHidden(true);
        this._getLocationAsync();
    }

    _handleMapRegionChange = (mapRegion) => {
        this.setState({ mapRegion });
    };

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
        // this.addPin(
        //     this.state.location.coords,
        //     "I am here",
        //     "This is my current location",
        //     null
        // );
    };

    onPressAddPin = async () => {
        let camera = new Camera();
        await camera.takePhoto();
        console.log(JSON.stringify(camera.getPhoto()));
        let photo = camera.getPhoto();
        this.onPressDismissDialog();
        if (this.state.tempTitle && this.state.tempDescription) {
            if (this.state.tempCoordinate) {
                this.addPin(
                    this.state.tempCoordinate,
                    this.state.tempTitle,
                    this.state.tempDescription,
                    photo ? photo : null
                );
            } else {
                await this._getLocationAsync();
                this.addPin(
                    this.state.location.coords,
                    this.state.tempTitle,
                    this.state.tempDescription,
                    photo ? photo : null
                );
            }
        }
        this.setState({
            tempTitle: null,
            tempDescription: null,
            tempCoordinate: null,
        });
    };

    localGetPinInfo = async () => {
        this._getLocationAsync();
        let camera = new Camera();
        await camera.takePhoto();
        console.log(JSON.stringify(camera.getPhoto()));
        this.state.photo = camera.getPhoto();
        if (this.state.photo) {
            this.setState({ showDialog: true });
        }

        console.log(this.state.tempTitle);
        console.log(this.state.description);

        this.addPin(
            this.state.location.coords,
            this.state.tempTitle,
            this.state.tempDescription,
            photo ? photo : null
        );
        console.log("Past addPin");

    };

    handleDialogueInputs = (title, description) => {
        this.setState({ tempTitle: title });
        this.setState({ tempTitle: description });
        this.setState({ showDialog: false });
        this.addPin(
            this.state.location.coords,
            this.state.tempTitle,
            this.state.tempDescription,
            this.state.photo,
        );

        this.setState({
            tempTitle: null,
            tempDescription: null,
            tempCoordinate: null,
            photo: null

        });
    };


    onPressShowDialog = () => {
        this.setState({ showDialog: true });
    };

    onPressDismissDialog = () => {
        this.setState({ showDialog: false });
    };

    render() {
        return (


            <View style={styles.container}>

                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={this.state.theme}

                    region={{
                        latitude: this.state.location.coords.latitude,
                        longitude: this.state.location.coords.longitude,
                        latitudeDelta:
                            this.state.location.coords.accuracy * 0.001,
                        longitudeDelta:
                            this.state.location.coords.accuracy * 0.0005,
                    }}
                    onRegionChange={this._handleMapRegionChange}

                    onMarkerPress={() => this.setState({ showDialog: false })}>
                    {this.state.pins
                        ? this.state.pins.map((pin) => (
                            <Marker
                                coordinate={pin.coordinate}
                                title={pin.title}
                                description={pin.description}
                            >
                                <Callout>
                                    <Text>
                                        {pin.title}
                                    </Text>
                                    <Text>
                                        {pin.description}
                                    </Text>
                                    <Svg width={240} height={180}>
                                        <ImageSvg
                                            width={'100%'}
                                            height={'100%'}
                                            preserveAspectRatio="xMidYMid slice"
                                            href={{ uri: (pin.image ? pin.image : null) }}
                                        />
                                    </Svg>
                                </Callout>
                            </Marker>
                        ))
                        : null}
                    {/* <Text style={styles.text}>
                        List of Pins on Map: {JSON.stringify(this.state.pins)}
                    </Text> */}
                    {/* <Button
                        onPress={this.onPressShowDialog}
                        title={"Add a Pin at current location"}
                    /> */}

                </MapView>


                <View style={styles.titleBar}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('DefaultMap')
                        }}
                    >
                        <Ionicons name="search-sharp" size={48} color="#52575D"></Ionicons>
                        {/* <Text> Search </Text> */}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('DefaultMap')

                        }}
                    >
                        <Ionicons name="menu-sharp" size={48} color="#52575D"></Ionicons>
                        {/* <Text> Menu </Text> */}
                    </TouchableOpacity>
                </View>
                <View style={styles.navBar}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('Profile')
                        }}
                    >
                        <Ionicons name="heart" size={48} color="#52575D"></Ionicons>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.localGetPinInfo()
                        }}
                    >
                        <Ionicons name="add-circle" size={48} color="#52575D"></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {

                            if (this.state.theme === mapStyle) {
                                this.setState({ theme: mapStyleDark });
                            }
                            else {
                                this.setState({ theme: mapStyle });
                            }
                        }}
                    >
                        <Ionicons name="sunny" size={48} color="#52575D"></Ionicons>
                    </TouchableOpacity>
                </View>

                <Dialog.Container visible={this.state.showDialog}>
                    <Dialog.Title>Create a Pin</Dialog.Title>
                    <Dialog.Input
                        label="Title"
                        onChangeText={(title) =>
                            this.setState({ tempTitle: title })
                        }
                    />
                    <Dialog.Input
                        label="Description"
                        onChangeText={(description) =>
                            this.setState({ tempDescription: description })
                        }
                    />
                    <Dialog.Button
                        label="Cancel"
                        onPress={this.onPressDismissDialog}
                    />
                    <Dialog.Button label="OK" onPress={this.handleDialogueInputs} />
                </Dialog.Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        margin: 40,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "auto",
        color: "#34495e",
    },
    map: {
        width: "100%",
        height: "100%",
    },

    titleBar: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "5%",
        paddingVertical: "5%",
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

});
