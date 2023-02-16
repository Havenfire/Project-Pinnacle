import React, { useState } from 'react';
import DefaultMap from './src/components/defaultMap';
import Camera from './src/components/camera';
import { View } from 'react-native';

export default function App() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <DefaultMap />
            <Camera />
        </View>
    );
}
