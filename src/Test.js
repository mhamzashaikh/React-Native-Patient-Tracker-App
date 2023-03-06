import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Test = () => {
  const [imageSource, setImageSource] = useState(null);

  const selectImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        alert('Permission to access camera is required!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageSource(result.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <Button title="Select Image" onPress={selectImage} />
      {imageSource && <Image source={{ uri: imageSource }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default Test;
