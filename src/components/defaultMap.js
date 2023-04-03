import React, { Component } from "react";
import { Text, View, StyleSheet, StatusBar, Button, SafeAreaView, Image, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import * as Location from "expo-location";
import { Callout, Marker, PROVIDER_GOOGLE, Circle, Polyline } from "react-native-maps";
import MapView from "react-native-map-clustering";
import Dialog from "react-native-dialog";
import Camera from "./camera";
import { Svg, Image as ImageSvg } from "react-native-svg";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import mapStyle from "../themes/mapStyle.json";
import mapStyleDark from "../themes/mapStyleDark.json";

import { DataStore } from '@aws-amplify/datastore';
import { Pin } from '../models';
import { Storage } from "@aws-amplify/storage"

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

    async addPin(coordinate, title, description, image, dummy) {
        if (coordinate && title && description) {
            if (dummy) {
                this.state.dummyPin = ({
                    coordinate: {
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                    },
                    title: title,
                    description: description,
                    image: image ? image : undefined,
                    // grid: this.getAbsolutePinGrid(coordinate),
                });
            } else {
                delete this.state.dummyPin;
                this.state.pins.push({
                    coordinate: {
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                    },
                    title: title,
                    description: description,
                    image: image ? image : undefined,
                    // grid: this.getAbsolutePinGrid(coordinate),
                });
            }
            if (!dummy) {
                const filename = `${coordinate.latitude}_${coordinate.longitude}.jpeg`;
                this.uploadImageToS3(filename, image);


                await DataStore.save(
                    new Pin({
                        "title": title,
                        "description": description,
                        "coordinates": [coordinate.latitude, coordinate.longitude],
                        "reputation": 0,
                        "image_uri": filename,
                    })
                );

            
    

                const models = await DataStore.query(Pin);
                console.log(models);

            }
            this.forceUpdate();
        }
        return this.state.pins;
    }

    async uploadImageToS3(img_name, imageUri) {
        const key = img_name;
        const contentType = 'image/jpeg';

        try {
            const response = await fetch(imageUri);
            const blob = await response.blob();
            await Storage.put(key, blob, { contentType });
            console.log('Image uploaded successfully');
        } catch (error) {
            console.log('Error uploading image:', error);
        }
    }



    componentDidMount() {
        StatusBar.setHidden(true);
        for (let i = 0; i < 50; i++) {
            this.state.pins.push({
                coordinate: {
                    latitude: Math.random() * (0.1) + 33.727187,
                    longitude: Math.random() * (0.1) + -84.372187,
                },
            })
        }
        this._getLocationAsync();
        // this.setLevel();
    }






    setLevel = () => {
        const region = this.state.mapRegion;
        const delta = Math.max(
            region.latitudeDelta,
            region.longitudeDelta
        );
        const levels = [30, 10, 1, 1 / 6, 1 / 60, 1 / 360, 1 / 3600];
        const multiplier = [1 / 30, 0.1, 1, 6, 60, 360, 3600];
        for (var i = levels.length - 1; i >= 0; i--) {
            if (delta / 10 < levels[i]) {
                const gridMin = {
                    latitude: Math.floor((region.latitude - region.latitudeDelta / 2) * multiplier[i]),
                    longitude: Math.floor((region.longitude - region.longitudeDelta / 2) * multiplier[i])
                };
                const gridMax = {
                    latitude: Math.floor((region.latitude + region.latitudeDelta / 2) * multiplier[i]),
                    longitude: Math.floor((region.longitude + region.longitudeDelta / 2) * multiplier[i])
                };
                this.state.grid = { level: i, gridMin: gridMin, gridMax: gridMax };
                break;
            }
        }
    }

    _handleMapRegionChange = (mapRegion) => {
        this.setState({ mapRegion });
        this.setLevel();
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
    };

    localGetPinInfo = async () => {
        this._getLocationAsync();
        let camera = new Camera();
        await camera.takePhoto();
        this.setState({ photo: camera.state.photo });

        if (this.state.photo) {
            this.setState({ showDialog: true });
        }
    };

    handleDialogueInputs = (title, description) => {
        this.setState({ tempTitle: title });
        this.setState({ tempTitle: description });
        this.setState({ showDialog: false });
        this.addPin(
            this.state.location.coords,
            this.state.tempTitle,
            this.state.tempDescription,
            this.state.photo, true
        );
        this.setState({
            tempTitle: null,
            tempDescription: null,
            tempCoordinate: null,
            photo: null,
        });
    };

    onPressShowDialog = () => {
        this.setState({ showDialog: true });
    };

    onPressDismissDialog = () => {
        this.setState({ showDialog: false });
    };

    getButtonColor = () => {
        if (this.state.theme == mapStyle) {
            return "#241C1CCC";
        } else {
            return "#F5F4F2CC";
        }
    };

    getAbsolutePinGrid = (coord) => {
        const lat = coord.latitude + 90;
        const long = coord.longitude + 180;
        const multiplier = [1 / 30, 0.1, 1, 6, 60, 360, 3600];
        var gridCoord = [];
        for (var i = 0; i < multiplier.length; i++) {
            gridCoord.push({
                latitude: Math.floor(lat * multiplier[i]),
                longitude: Math.floor(long * multiplier[i])
            });
        }
        return gridCoord;
    }

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

    drawDummyPin = () => {
        let pin = this.state.dummyPin;
        return (
            <React.Fragment>
                <Marker
                    coordinate={pin.coordinate}
                    title={pin.title}
                    description={pin.description}
                    draggable={true}
                    onDragEnd={(e) => {
                        const distance = this.calculateDistance(pin.coordinate, e.nativeEvent.coordinate);

                        if (distance >= 100) {
                            alert("The pin must stay within the red circle.");
                        } else {
                            const dummyPinIndex = this.state.pins.findIndex((dummy) => {
                                return (
                                    Math.abs(dummy.coordinate.latitude - pin.coordinate.latitude) < 1e-7 &&
                                    Math.abs(dummy.coordinate.longitude - pin.coordinate.longitude) < 1e-7
                                );
                            });
                            this.addPin(
                                e.nativeEvent.coordinate,
                                pin.title,
                                pin.description,
                                pin.image,
                                false
                            );
                            if (dummyPinIndex > -1) {
                                this.state.pins.splice(dummyPinIndex, 1);
                            }
                            this.forceUpdate();
                        }
                    }}>
                    <Callout>
                        <Text>{pin.title}</Text>
                        <Text>{pin.description}</Text>
                        <Svg width={240} height={180}>
                            <ImageSvg
                                width={"100%"}
                                height={"100%"}
                                preserveAspectRatio="xMidYMid slice"
                                href={{ uri: pin.image ? pin.image : null }}
                            />
                        </Svg>
                    </Callout>
                </Marker>
                <Circle
                    center={pin.coordinate}
                    radius={100}
                    fillColor={"rgba(255, 0, 0, 0.2)"}
                    strokeColor={"rgba(255, 0, 0, 0.5)"}
                    strokeWidth={2}
                />
            </React.Fragment>
        )
    }

    drawPins = () => {
        var pinList = [];
        for (var pin of this.state.pins) {
            pinList.push(
                <Marker
                    coordinate={pin.coordinate}
                    title={pin.title}
                    description={pin.description}
                >
                    {pin.title && pin.description ? (
                        <Callout>
                            <Text>{pin.title}</Text>
                            <Text>{pin.description}</Text>
                            {pin.image ? (<Svg width={240} height={180}>
                                <ImageSvg
                                    width={"100%"}
                                    height={"100%"}
                                    preserveAspectRatio="xMidYMid slice"
                                    href={{ uri: pin.image ? pin.image : null }}
                                />
                            </Svg>) : null}
                        </Callout>
                    ) : null}
                </Marker>

            )
        }
        return pinList;
    }

    drawGrid = () => {
        var lineList = [];
        // console.log(JSON.stringify(this.state.grid))
        const gridMin = this.state.grid.gridMin;
        const gridMax = this.state.grid.gridMax;
        const multiplier = [30, 10, 1, 1 / 6, 1 / 60, 1 / 360, 1 / 3600];
        for (var i = gridMin.latitude; i <= gridMax.latitude; i++) {
            const realLat = i * multiplier[this.state.grid.level];
            lineList.push(
                <Polyline
                    coordinates={[
                        {
                            latitude: realLat,
                            longitude: this.state.mapRegion.longitude - this.state.mapRegion.longitudeDelta / 2
                        },
                        {
                            latitude: realLat,
                            longitude: this.state.mapRegion.longitude + this.state.mapRegion.longitudeDelta / 2
                        },
                    ]}
                />
            );
        }
        for (var i = gridMin.longitude; i <= gridMax.longitude; i++) {
            const realLong = i * multiplier[this.state.grid.level];
            lineList.push(
                <Polyline
                    coordinates={[
                        {
                            latitude: this.state.mapRegion.latitude - this.state.mapRegion.latitudeDelta / 2,
                            longitude: realLong,
                        },
                        {
                            latitude: this.state.mapRegion.latitude + this.state.mapRegion.latitudeDelta / 2,
                            longitude: realLong,
                        },
                    ]}
                />
            );
        }
        return (
            <React.Fragment>
                {lineList}
            </React.Fragment>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={this.state.theme}
                    mapPadding={{ left: 0, right: 0, top: 0, bottom: 24 }}
                    region={{
                        latitude: this.state.location.coords.latitude,
                        longitude: this.state.location.coords.longitude,
                        latitudeDelta: this.state.location.coords.accuracy * 0.001,
                        longitudeDelta: this.state.location.coords.accuracy * 0.0005,
                    }}
                    radius={Dimensions.get('window').width * 0.1}
                    onRegionChange={this._handleMapRegionChange}
                    onMarkerPress={() => this.setState({ showDialog: false })}>
                    {this.state.dummyPin ? this.drawDummyPin() : null}
                    {this.state.pins ? this.drawPins() : null}
                    {/* {this.state.grid ? (this.drawGrid()) : null} */}
                </MapView>

                <View style={styles.titleBar}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("DefaultMap");
                        }}>
                        <Ionicons name="search" size={36} color={this.getButtonColor()} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("DefaultMap");
                        }}>
                        <Ionicons name="menu" size={36} color={this.getButtonColor()} />
                    </TouchableOpacity>
                </View>
                <View style={styles.navBar}>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.theme === mapStyle) {
                                this.setState({ theme: mapStyleDark });
                            } else {
                                this.setState({ theme: mapStyle });
                            }
                        }}>
                        <Ionicons
                            name={this.state.theme === mapStyle ? "sunny" : "moon"}
                            size={36}
                            color={this.getButtonColor()}
                            reflect-horizontal={false}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.localGetPinInfo();
                        }}>
                        <Ionicons name="add-circle" size={36} color={this.getButtonColor()} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("DefaultMap");
                        }}>
                        <Ionicons name="heart" size={36} color={this.getButtonColor()} />
                    </TouchableOpacity>
                </View>

                <Dialog.Container visible={this.state.showDialog}>
                    <Dialog.Title>Create a Pin</Dialog.Title>
                    <Dialog.Input label="Title" onChangeText={(title) => this.setState({ tempTitle: title })} />
                    <Dialog.Input
                        label="Description"
                        onChangeText={(description) => this.setState({ tempDescription: description })}
                    />
                    <Dialog.Button label="Cancel" onPress={this.onPressDismissDialog} />
                    <Dialog.Button label="OK" onPress={this.handleDialogueInputs} />
                </Dialog.Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
