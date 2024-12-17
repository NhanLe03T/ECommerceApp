// LoginScreen.js - Màn hình đăng nhập
import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import LoginForm from '../forms/LoginForm';  // Form đăng nhập

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <LoginForm navigation={navigation} />  {/* Gọi form đăng nhập */}
      <Button title="Chưa có tài khoản?" onPress={() => navigation.navigate('Register')} />  {/* Chuyển sang màn hình đăng ký */}
    </View>
  );
};

export default LoginScreen;
