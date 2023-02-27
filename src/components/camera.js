import React, { Component } from "react";
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class Camera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photo: null
        }
    }
    
    takePhoto = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status === 'granted') {
                try {
                    const result = await ImagePicker.launchCameraAsync({
                        allowsEditing: true,
                        aspect: [4, 3],
                    });
                    if (!result.canceled) {
                        this.state.photo = result.assets.uri;
                    }   
                } catch (err) {
                    console.log(err);
                }
            }   
        } catch (error) {
            console.log(error);
        }
    };

    getPhoto() {
        return this.state.photo ? this.state.photo : null;
    }

    render() {
        return (
            <View>
                {this.state.photo && <Image source={{ uri: this.state.photo }} style={{ width: 200, height: 200, flex: 0 }} />}
                <Button title="Take Photo" onPress={this.takePhoto} />
            </View>
        );
    };
}