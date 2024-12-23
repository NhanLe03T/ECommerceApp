// AvatarPicker.js
import React from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Dùng thư viện expo-image-picker để chọn ảnh

const AvatarPicker = ({ avatar, setAvatar }) => {

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  };

  return (
    <View>
      <Button title="Chọn Avatar" onPress={pickImage} />
      {avatar && <Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius: 50 }} />}
    </View>
  );
};

export default AvatarPicker;
