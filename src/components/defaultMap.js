import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default class DefaultMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            mapRegion: { latitude: 33.797187, longitude: -84.322187, latitudeDelta: 0.1, longitudeDelta: 0.05 },
            locationResult: null,
            location: { coords: { latitude: 33.797187, longitude: -84.322187, accuracy: 25 } },
        };
    }

    componentDidMount() {
        this._getLocationAsync();
    }

    _handleMapRegionChange = mapRegion => {
        this.setState({ mapRegion });
    };

    _getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
                location,
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ locationResult: JSON.stringify(location), location });
    };

    render() {
        return (
            <View style = { styles.container }>
                <MapView
                        style ={ styles.map }
                        region = {{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                            latitudeDelta: this.state.location.coords.accuracy * 0.001,
                            longitudeDelta: this.state.location.coords.accuracy * 0.0005
                        }}
                        onRegionChange = { this._handleMapRegionChange }
                    >
                    <Marker
                        coordinate = { this.state.location.coords }
                        title = "My Location"
                        description = "This is my current location"
                    />
                    <Text style = { styles.text }>
                        Location Response: {this.state.locationResult}
                    </Text>
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    text: {
        margin: 40,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'auto',
        color: '#34495e',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
