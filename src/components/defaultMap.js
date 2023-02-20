import React, { Component } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import * as Location from "expo-location";
import MapView, { Callout, Marker } from "react-native-maps";
import Dialog from "react-native-dialog";
import Camera from "./camera";
import { Svg, Image as ImageSvg } from 'react-native-svg';

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
                    region={{
                        latitude: this.state.location.coords.latitude,
                        longitude: this.state.location.coords.longitude,
                        latitudeDelta:
                            this.state.location.coords.accuracy * 0.001,
                        longitudeDelta:
                            this.state.location.coords.accuracy * 0.0005,
                    }}
                    onRegionChange={this._handleMapRegionChange}
                    onPress={(e) =>
                        this.setState({
                            showDialog: true,
                            tempCoordinate: e.nativeEvent.coordinate,
                        })
                    }
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
                    <Dialog.Button label="OK" onPress={this.onPressAddPin} />
                </Dialog.Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
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
});
