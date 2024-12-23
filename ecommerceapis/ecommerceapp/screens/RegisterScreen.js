// RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Picker, Alert, StyleSheet } from 'react-native';
import AvatarPicker from '../components/AvatarPicker'; // Import AvatarPicker 
import { registerUser } from '../utils/api'; // Hàm API đăng ký

const RegisterScreen = () => {
  const [username, setUsername] = useState(''); // Tên người dùng
  const [password, setPassword] = useState(''); // Mật khẩu
  const [role, setRole] = useState('user'); // Vai trò người dùng
  const [avatar, setAvatar] = useState(null); // Avatar

  // Hàm xử lý đăng ký
  const handleRegister = async () => {
    if (!username || !password || !avatar) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin, bao gồm cả avatar!');
      return;
    }

    try {
      const response = await registerUser(username, password, avatar, role);
      if (response.status === 'success') {
        if (role === 'seller') {
          Alert.alert(
            'Đăng ký thành công!',
            'Vui lòng chờ xác nhận từ hệ thống.'
          );
        } else {
          Alert.alert('Đăng ký thành công!');
        }
      } else {
        Alert.alert('Đăng ký thất bại!');
      }
    } catch (error) {
      Alert.alert('Lỗi hệ thống');
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />
      <AvatarPicker avatar={avatar} setAvatar={setAvatar} /> {/* Component chọn avatar */}
      <Picker selectedValue={role} onValueChange={setRole} style={styles.picker}>
        <Picker.Item label="Người dùng" value="user" />
        <Picker.Item label="Người bán (tiểu thương/doanh nghiệp)" value="seller" />
      </Picker>
      <Button title="Đăng Ký" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  picker: {
    height: 50,
    marginBottom: 16,
  },
});

export default RegisterScreen;
