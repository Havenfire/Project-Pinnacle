import React, { useState } from 'react';
import DefaultMap from './src/components/defaultMap';
import { View } from 'react-native';
import GoogleAuth from './src/components/googleAuth';
import Camera from './src/components/camera';



export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>      
      <GoogleAuth/>
      <DefaultMap/>
      <Camera/>

    </View>
  );
}
