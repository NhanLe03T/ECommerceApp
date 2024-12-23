import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '../components/forms/LoginForm'; // Import form đăng nhập

const LoginScreen = ({ navigation }) => {
  // Hàm xử lý khi người dùng đăng nhập
  const handleLogin = (email, password) => {
    console.log('Email:', email);
    console.log('Password:', password);
    // Điều hướng sang màn hình khác sau khi đăng nhập thành công
    
  };

  return (
    <View style={styles.screen}>
      // Form đăng nhập
      <LoginForm onLogin={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1, // Chiều cao chiếm toàn bộ màn hình
    justifyContent: 'center', // Canh giữa theo chiều dọc
    alignItems: 'center', // Canh giữa theo chiều ngang
    padding: 16, // Khoảng cách bên trong
  },
});

export default LoginScreen;
