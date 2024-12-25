// Đường dẫn file: components/ProfileForm.js

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AvatarPicker from './AvatarPicker'; // Import AvatarPicker

// Component ProfileForm: Hiển thị giao diện và xử lý các tác vụ trong trang Profile
const ProfileForm = ({ avatar, setAvatar, username, setUsername, firstName, setFirstName, onSave }) => {
  return (
    <View style={styles.container}>
      {/* Phần đầu: Hiển thị và chọn avatar */}
      <View style={styles.avatarContainer}>
        <AvatarPicker avatar={avatar} setAvatar={setAvatar} />
      </View>

      {/* Phần giữa: Hiển thị thông tin cá nhân */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tên đăng nhập:</Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          editable={false} // Không cho phép chỉnh sửa username
        />
        <Text style={styles.label}>Họ và tên:</Text>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
      </View>

      {/* Phần cuối: Nút lưu thông tin */}
      <View style={styles.saveButton}>
        <Button title="Lưu Thông Tin" onPress={onSave} />
      </View>
    </View>
  );
};

// CSS-in-JS styles cho ProfileForm
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 20,
  },
});

export default ProfileForm; // Xuất ProfileForm để sử dụng trong các màn hình khác
