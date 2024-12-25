// Đường dẫn file: screens/ProfileScreen.js

import React, { useEffect, useState } from 'react';
import { View, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchUserProfile } from '../utils/api'; // Hàm lấy dữ liệu từ backend
import ProfileForm from '../components/ProfileForm'; // Import ProfileForm từ components

// Màn hình ProfileScreen: Hiển thị giao diện thông tin người dùng
const ProfileScreen = () => {
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [user, setUser] = useState({}); // Dữ liệu người dùng
  const [username, setUsername] = useState(''); // Tên đăng nhập
  const [firstName, setFirstName] = useState(''); // Họ và tên
  const [avatar, setAvatar] = useState(''); // Đường dẫn avatar

  // Lấy dữ liệu người dùng từ backend khi màn hình được render
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await fetchUserProfile(); // Gọi API lấy dữ liệu
        setUser(data);
        setUsername(data.username); // Cập nhật username
        setFirstName(data.first_name); // Cập nhật họ và tên
        setAvatar(data.avatar); // Cập nhật avatar
      } catch (error) {
        Alert.alert('Lỗi', 'Không thể tải thông tin người dùng.'); // Thông báo lỗi
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    getUserProfile(); // Gọi hàm lấy dữ liệu
  }, []);

  // Hàm xử lý khi nhấn nút lưu thông tin
  const handleSave = () => {
    Alert.alert('Lưu thành công', 'Thông tin cá nhân đã được cập nhật!');
  };

  // Hiển thị trạng thái tải dữ liệu
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    // Sử dụng ProfileForm để hiển thị giao diện
    <ProfileForm
      avatar={avatar}
      setAvatar={setAvatar}
      username={username}
      setUsername={setUsername}
      firstName={firstName}
      setFirstName={setFirstName}
      onSave={handleSave}
    />
  );
};

// CSS-in-JS styles cho ProfileScreen
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen; // Xuất ProfileScreen để sử dụng trong navigator
