// Màn hình đăng ký người dùng
import React from 'react';
import { View, Button } from 'react-native';
import RegisterForm from '../forms/RegisterForm';  // Form đăng ký người dùng

const RegisterScreen = ({ navigation }) => {
  return (
    <View>
      <RegisterForm />  {/* Gọi form đăng ký */}
      <Button title="Đã có tài khoản?" onPress={() => navigation.navigate('Login')} />  {/* Chuyển sang màn hình đăng nhập */}
    </View>
  );
};

export default RegisterScreen;
