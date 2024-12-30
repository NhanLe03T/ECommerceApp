// AppNavigation.js - Quản lý điều hướng của ứng dụng
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen'; // Màn hình đăng nhập
import RegisterScreen from './screens/RegisterScreen'; // Màn hình đăng ký
import MainScreen from './screens/MainScreen'; // Màn hình chính
import ProfileScreen from './screens/ProfileScreen'; // Màn hình hồ sơ
import NotificationsScreen from './screens/NotificationsScreen'; // Màn hình thông báo
import ShopSellerScreen from './screens/ShopSellerScreen'; // Màn hình cửa hàng người bán

// Khởi tạo Stack Navigator
const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login" // Màn hình đầu tiên khi mở app
        screenOptions={{
          headerShown: false, // Ẩn tiêu đề trên màn hình
        }}
      >
        {/* Định nghĩa các màn hình */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} /> 
        <Stack.Screen name="Shop" component={ShopSellerScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
