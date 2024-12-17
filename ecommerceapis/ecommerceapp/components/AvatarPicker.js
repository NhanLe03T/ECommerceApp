// chọn avatar từ thư viện ảnh của thiết bị
import React from 'react';
import { View, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // Thư viện chọn ảnh

const AvatarPicker = ({ avatar, setAvatar }) => {
  // Xử lý chọn avatar
  const pickAvatar = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();  // Xin quyền truy cập vào thư viện ảnh
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,  // Chỉ chọn ảnh
        allowsEditing: true,  // Cho phép chỉnh sửa ảnh
        aspect: [1, 1],  // Cắt ảnh thành hình vuông
        quality: 1,  // Chất lượng ảnh cao
      });
      if (!result.cancelled) {
        setAvatar(result.uri);  // Lưu đường dẫn ảnh vào state
      }
    } else {
      Alert.alert('Lỗi');
    }
  };

  return (
    <View>
      {avatar ? (
        <Image source={{ uri: avatar }} style={{ width: 100, height: 100 }} />  // Hiển thị avatar đã chọn
      ) : (
        <Button title="Chọn ảnh" onPress={pickAvatar} />  // Nút chọn avatar
      )}
    </View>
  );
};

export default AvatarPicker;
