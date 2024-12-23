import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AvatarPicker from './AvatarPicker'; // Import component chọn avatar
import { registerUser } from '../../util/api'; // Import hàm gọi API đăng ký

const RegisterForm = ({ onRegister }) => {
  const [username, setUsername] = useState(''); // State lưu tên người dùng
  const [password, setPassword] = useState(''); // State lưu mật khẩu
  const [avatar, setAvatar] = useState(null); // State lưu avatar
  const [role, setRole] = useState('user'); // State lưu vai trò (user hoặc seller)

  const handleRegister = async () => {
    const response = await registerUser(username, password, avatar, role); // Gọi API đăng ký
    if (response.status === 'success') {
      Alert.alert('Đăng ký thành công', `Chào mừng ${response.username}`);
      onRegister(response); // Truyền dữ liệu lên màn hình cha
    } else {
      Alert.alert('Lỗi đăng ký', response.message); 
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <AvatarPicker onAvatarSelected={setAvatar} />
      <Button title="Đăng ký" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
});

export default RegisterForm;
