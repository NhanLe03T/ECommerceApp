import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../../util/api'; // Import hàm gọi API đăng nhập

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState(''); // State lưu tên người dùng
  const [password, setPassword] = useState(''); // State lưu mật khẩu

  const handleLogin = async () => {
    const response = await loginUser(username, password); // Gọi API đăng nhập
    if (response.status === 'success') {
      Alert.alert('Đăng nhập thành công', `Chào mừng ${response.role}`);
      onLogin(username, password); // Truyền dữ liệu lên màn hình cha
    } else {
      Alert.alert('Lỗi đăng nhập', response.message); 
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
      <Button title="Đăng nhập" onPress={handleLogin} />
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

export default LoginForm;
