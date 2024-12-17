// App.js - Entry point của ứng dụng, xử lý navigation
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Thư viện điều hướng
import { createStackNavigator } from '@react-navigation/stack';  // Thư viện điều hướng
import LoginScreen from './screens/LoginScreen';  // Màn hình đăng nhập
import RegisterScreen from './screens/RegisterScreen';  // Màn hình đăng ký

// Khởi tạo Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    // Navigation Container để bao quanh ứng dụng và điều hướng giữa các màn hình
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"> {/* Màn hình đầu tiên khi mở app */}
        <Stack.Screen name="Login" component={LoginScreen} /> {/* Màn hình đăng nhập */}
        <Stack.Screen name="Register" component={RegisterScreen} /> {/* Màn hình đăng ký */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
