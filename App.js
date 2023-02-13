import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const TakePhoto = () => {
  const [photo, setPhoto] = useState(null);

  const takePhoto = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        setPhoto(result.uri);
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
      <Button title="Take Photo" onPress={takePhoto} />
    </View>
  );
};

export default TakePhoto;
