// Form đăng ký người dùng, bao gồm avatar, username, password và vai trò
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet, Picker } from 'react-native';
import AvatarPicker from '../components/AvatarPicker';  // Component chọn avatar
import { registerUser } from '../utils/api';  // API đăng ký người dùng

const RegisterForm = () => {
  const [username, setUsername] = useState('');  // State cho username
  const [password, setPassword] = useState('');  // State cho mật khẩu
  const [role, setRole] = useState('user');  // Vai trò mặc định là người dùng
  const [avatar, setAvatar] = useState(null);  // Avatar người dùng

  // Xử lý đăng ký người dùng
  const handleRegister = async () => {
    if (!username || !password || !avatar) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin, bao gồm cả avatar!');  // Kiểm tra thông tin nhập
      return;
    }

    try {
      // Gọi API đăng ký người dùng
      const response = await registerUser(username, password, avatar, role);
      if (response.status === 'success') {
        Alert.alert('Đăng ký thành công!');
      } else {
        Alert.alert('Đăng ký thất bại!');  // Thông báo lỗi khi đăng ký thất bại
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');  // Thông báo lỗi
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text> {/* Tiêu đề form */}
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
      {/* Component chọn avatar */}
      <AvatarPicker avatar={avatar} setAvatar={setAvatar} />
      <Text style={styles.label}>Vai Trò:</Text> {/* Nhãn cho picker */}
      {/* Picker chọn vai trò */}
      <Picker
        selectedValue={role}
        style={styles.picker}
        onValueChange={(itemValue) => setRole(itemValue)}
      >
        <Picker.Item label="Người Dùng" value="user" />
        <Picker.Item label="Người Bán" value="seller" />
      </Picker>
      {/* Button đăng ký */}
      <Button title="Đăng Ký" onPress={handleRegister} color="#28a745" />
    </View>
  );
};

// Style cho RegisterForm
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
  label: {
    alignSelf: 'flex-start',  // Canh lề trái
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
  },
});

export default RegisterForm;
