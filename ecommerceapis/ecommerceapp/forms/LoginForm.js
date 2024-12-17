// Form đăng nhập, bao gồm username và password
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { loginUser } from '../utils/api';  // API đăng nhập

const LoginForm = ({ navigation }) => {
  const [username, setUsername] = useState('');  // State cho username
  const [password, setPassword] = useState('');  // State cho mật khẩu

  // Xử lý đăng nhập
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Lỗi', 'Hãy nhập đầy đủ thông tin!');  // Kiểm tra thông tin nhập
      return;
    }

    try {
      // Gọi API đăng nhập
      const response = await loginUser(username, password);
      if (response.status === 'success') {
        Alert.alert('Login thành công!');
        // Chuyển sang màn hình chính hoặc màn hình khác sau khi đăng nhập thành công
      } else {
        Alert.alert('Login thất bại!');  // Thông báo lỗi nếu đăng nhập thất bại
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');  // Thông báo lỗi
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text> {/* Tiêu đề form */}
      {/* Input cho username */}
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        placeholderTextColor="#aaa"
      />
      {/* Input cho password */}
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
      />
      {/* Button đăng nhập */}
      <Button title="Đăng Nhập" onPress={handleLogin} color="#007BFF" />
    </View>
  );
};

// Style cho LoginForm
const styles = StyleSheet.create({
  container: {
    flex: 1,  // Dùng toàn màn hình
    justifyContent: 'center',  // Canh giữa theo chiều dọc
    alignItems: 'center',  // Canh giữa theo chiều ngang
    padding: 20,
    backgroundColor: '#f5f5f5',  // Màu nền
  },
  title: {
    fontSize: 24,  // Kích thước chữ lớn
    fontWeight: 'bold',
    marginBottom: 20,  // Khoảng cách bên dưới tiêu đề
  },
  input: {
    width: '100%',
    height: 40,  // Chiều cao của input
    borderColor: '#ccc',  // Màu viền
    borderWidth: 1,  // Độ dày viền
    borderRadius: 5,  // Góc bo tròn
    paddingHorizontal: 10,  // Khoảng cách bên trong
    marginBottom: 15,  // Khoảng cách giữa các input
    backgroundColor: '#fff',  // Màu nền input
  },
});

export default LoginForm;
