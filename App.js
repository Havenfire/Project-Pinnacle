import React, { useState } from 'react';
import DefaultMap from './src/components/defaultMap';
import { View } from 'react-native';
import GoogleAuth from './src/components/googleAuth';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <GoogleAuth/>
      <DefaultMap/>
      
    </View>
  );
}